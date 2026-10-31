
# @ashetm/ng-network

``@ashetm/ng-network`` is a library that provides directives, a signal, RxJS observables and an RxJS operator to follow the network state of the device (online/offline, connection quality).

<!-- [![build status](http://img.shields.io/travis/likeastore/ngDialog.svg)](https://travis-ci.org/likeastore/ngDialog) -->
<!-- [![npm version](http://badge.fury.io/js/ng-dialog.svg)](http://badge.fury.io/js/ng-dialog) -->
<!-- [![github tag](https://img.shields.io/github/tag/likeastore/ngDialog.svg)](https://github.com/likeastore/ngDialog/tags) -->
<!-- [![Download Count](https://img.shields.io/npm/dm/ng-dialog.svg)](http://www.npmjs.com/package/ng-dialog) -->
<!-- [![Code Climate](https://codeclimate.com/github/likeastore/ngDialog/badges/gpa.svg)](https://codeclimate.com/github/likeastore/ngDialog) -->

<!-- ### [Demo](http://likeastore.github.io/ngDialog) -->

## Compatibility Table

| Angular Version     | @ashetm/ng-network Version | RxJS Version | Support |
|---------------------|----------------------------|--------------|---------|
| Angular 20.x and +  | @ashetm/ng-network 2.x     | 7.4.x and +  | ✅      |
| Angular 16.x – 19.x | @ashetm/ng-network 1.x     | 6.6.x and +  | ✅      |

Upgrading from 1.x? See [Migrating from 1.x](#migrating-from-1x).

## Install

You can install it with npm:

```bash
npm install @ashetm/ng-network
```

## API

``@ashetm/ng-network`` exposes the following: 

### Directives

#### NetworkDirective

* _Selector_: `[ashetmNetwork]`

This Angular **standalone** **structural** directive listens for changes in the network connection status and provides signals with the network's current state and the time elapsed since the connection was lost. It uses [`injectNetwork()`](#injectnetwork) to follow the online/offline status and `fromNetworkLastTimeConnected` to track the time elapsed since the device was last connected.

**Usage Example:**

Import ``NetworkDirective`` in your component `imports`:

```ts
@Component({
  imports: [NetworkDirective],
  // ...
})
```

```html
<ng-template ashetmNetwork let-network let-lastTimeConnected="lastTimeConnected">
  @if (network()) {
    <div>You are online</div>
  } @else {
    <div>You are offline</div>
  }
  @if (lastTimeConnected(); as lastConnected) {
    <div>Last connected: {{ lastConnected }} ms ago</div>
  }
</ng-template>
```

Or with the structural shorthand:

```html
<div *ashetmNetwork="let network; lastTimeConnected as lastTimeConnected">
  {{ network() ? 'You are online' : 'You are offline' }}
</div>
```

**Explanation:**

* _network_: A `Signal<boolean>`: `true` while the device is online, `false` while it is offline.
* _lastTimeConnected_: A `Signal<number | undefined>`: while the device is offline, the time elapsed in milliseconds since the connection was lost (updated every 100 ms); `undefined` while the device is online.

The template context is typed (`NetworkDirectiveContext`), so `network` and `lastTimeConnected` are type-checked in your templates.

#### NetworkOnlineDirective

* _Selector_: `[ashetmNetworkOnline]`

This Angular **standalone** **structural** directive renders its content only while the device is online, and removes it when the device goes offline.

#### NetworkOfflineDirective

* _Selector_: `[ashetmNetworkOffline]`

This Angular **standalone** **structural** directive renders its content only while the device is offline, and removes it when the device goes back online.

**Usage Example:**

Import ``NetworkOnlineDirective`` and/or ``NetworkOfflineDirective`` in your component `imports`:

```ts
@Component({
  imports: [NetworkOfflineDirective, NetworkOnlineDirective],
  // ...
})
```

```html
<div *ashetmNetworkOnline>You are online</div>
<div *ashetmNetworkOffline>You are offline</div>
```

Both directives follow the current state from the start (see [`fromNetworkEvents()`](#fromnetworkevents)), and stop listening to network events when they are destroyed.

### Signals

#### `injectNetwork()`

```ts
function injectNetwork(options?: { injector?: Injector }): Signal<boolean> { ... }
```

Returns a signal that is `true` while the device is online and `false` while it is offline. It holds the current state right away.

It must be called in an injection context (a constructor, a field initializer, or `runInInjectionContext`), unless an `injector` is given. It stops listening to network events when that context is destroyed.

**Example:**

```ts
@Component({
  template: `
    @if (!network()) {
      <div class="banner">You are offline</div>
    }
  `
})
export class AppComponent {
  readonly network: Signal<boolean> = injectNetwork();
}
```

### Custom RXJS Observables

#### `fromOfflineEvent()`

```ts
function fromOfflineEvent(): Observable<void> { ... }
```

Emits a notification when the device goes offline.

Returns:

An observable emitting a void.

Example: 

```tsx
fromOfflineEvent().subscribe(() => {
  console.log('Device is offline');
});
```

#### `fromOnlineEvent()`

```ts
function fromOnlineEvent(): Observable<void> { ... }
```

Emits a notification when the device goes online.

**Example:**

```tsx
fromOnlineEvent().subscribe(() => {
  console.log('Device is online');
});
```

#### `fromNetworkEvents()`

```ts
function fromNetworkEvents(): Observable<boolean> { ... }
```

Emits the current state on subscribe (`navigator.onLine`), then `true` when the device goes online and `false` when it goes offline. Repeated values are skipped.

**Example:**

```tsx
fromNetworkEvents().subscribe((isOnline: boolean) => {
  console.log(`Network status: ${isOnline ? 'Online' : 'Offline'}`);
});
```

#### `fromNetworkLastTimeConnected()`

```ts
function fromNetworkLastTimeConnected(): Observable<number | undefined> { ... }
```

While the device is offline, emits every 100 ms the time elapsed (in milliseconds) since the connection was lost. Emits `undefined` while the device is online.

**Example:**

```tsx
fromNetworkLastTimeConnected().subscribe((lastConnected: number | undefined) => {
  if(typeof lastConnected === 'number')
    console.log(`Last connected: ${lastConnected} ms ago`);
  else
    console.log(`Last connected: is currently connected`);
});
```

#### `fromNetworkStatus()`

```ts
function fromNetworkStatus(): Observable<NetworkStatus | undefined> { ... }
```

This observable provides detailed network status information (see [`NetworkStatus`](#networkstatus)), based on the [Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API). It emits the current status on subscribe, then whenever the network conditions change.

It emits `undefined` when the browser doesn't support the Network Information API.

**Example:**

```tsx
fromNetworkStatus().subscribe((status: NetworkStatus | undefined) => {
  if (!status) {
    console.log('Network Information API not supported');
    return;
  }

  console.log(`Effective type: ${status.effectiveType}`);
  console.log(`Downlink: ${status.downlink} Mbps`);
  console.log(`RTT: ${status.rtt} ms`);
  console.log(`Data Saver Enabled: ${status.saveData}`);
});
```

### Custom RXJS Operators

#### `retryUntilOnline()`

```ts
function retryUntilOnline<T>(durationStep: number = 1000, timeIncreasing: boolean = false): MonoTypeOperatorFunction<T>  { ... }
```

The ``retryUntilOnline`` operator is **an experimental feature** that retries an observable operation when it fails because the device is offline:

* If the source fails while the device is **offline**, it waits until the device is back online, then retries after `durationStep`.
* If the source fails while the device is **online**, the error is passed through (it isn't a network problem).

**Parameters:**

* `durationStep`: The delay in milliseconds before retrying, once the device is back online (default is `1000 ms`).
* `timeIncreasing`: When `true`, the delay is multiplied by the attempt number (1×, 2×, 3×…) (default is `false`).

**Example:**

```tsx
import { catchError, of, tap } from 'rxjs';
import { ajax } from 'rxjs/ajax';

import { retryUntilOnline } from '@ashetm/ng-network';

// Mock API endpoint
const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts/1';

// Simulated HTTP request
const httpRequest$ = ajax.getJSON(apiEndpoint).pipe(
  tap((response) => console.log('Request successful:', response)),
  retryUntilOnline(1000), // If offline, wait for the network, then retry 1 second later
  catchError((error) => {
    console.error('Request failed:', error);
    return of(null); // Handle the error and emit a fallback value
  })
);

// Subscribe to the observable
httpRequest$.subscribe({
  next: (data) => console.log('Final data:', data),
  error: (err) => console.error('Subscription error:', err),
  complete: () => console.log('Request completed'),
});

```

### Types

#### `NetworkDirectiveContext`

The template context of `NetworkDirective`:

* `$implicit`: `Signal<boolean>`, the online state.
* `lastTimeConnected`: `Signal<number | undefined>`, the time elapsed since the connection was lost.

#### `NetworkStatus`

The `NetworkStatus` interface defines the structure of the network status object emitted by the `fromNetworkStatus()` observable.

**Parameters:**

* `effectiveType`: A string representing the effective network connection type (e.g., 4g, 3g, 2g, or slow-2g).
* `downlink`: The approximate bandwidth of the connection in megabits per second.
* `rtt`: The estimated round-trip time for requests in milliseconds.
* `saveData`: A boolean indicating whether the user has enabled the browser's data-saver mode.

## Server-side rendering

The library is safe to use with server-side rendering. On the server, where there is no browser:

* `fromOnlineEvent()` and `fromOfflineEvent()` emit nothing.
* `fromNetworkEvents()` emits `true` (assumes online), and `injectNetwork()` is `true`.
* `fromNetworkLastTimeConnected()` and `fromNetworkStatus()` emit `undefined`.
* `retryUntilOnline` passes errors through.

## Zoneless

The directives and `injectNetwork()` are signal-based, so they work in zoneless applications (`provideZonelessChangeDetection()`) without any extra setup.

## Migrating from 1.x

2.0.0 requires Angular 20+ and RxJS 7.4+. The only breaking change is in the `NetworkDirective` template context, which now holds signals:

| 1.x                                  | 2.x                                |
|--------------------------------------|------------------------------------|
| `network \| async`                   | `network()`                        |
| `lastTimeConnected$` (Observable)    | `lastTimeConnected` (Signal)       |
| `lastTimeConnected$ \| async`        | `lastTimeConnected()`              |

```html
<!-- 1.x -->
<div *ashetmNetwork="let network; lastTimeConnected$ as last">
  <span *ngIf="network | async">Online</span>
  <span *ngIf="last | async as ms">Offline for {{ ms }} ms</span>
</div>

<!-- 2.x -->
<div *ashetmNetwork="let network; lastTimeConnected as last">
  @if (network()) { <span>Online</span> }
  @if (last(); as ms) { <span>Offline for {{ ms }} ms</span> }
</div>
```

Everything else (`*ashetmNetworkOnline`, `*ashetmNetworkOffline`, the `from…` observables, `retryUntilOnline` and `NetworkStatus`) works the same.

## Issue

LOOKING FOR MAINTAINER OR IF THERE IS AN ISSUE OR ANY IDEA TO ADD. PLEASE CREATE ISSUE IN GITHUB REPOSITORY.
