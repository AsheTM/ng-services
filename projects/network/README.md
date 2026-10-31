
# @ashetm/ng-network

``@ashetm/ng-network`` is a library that provides a directive, RxJS observables and an RxJS operator to follow the network state of the device (online/offline, connection quality).

<!-- [![build status](http://img.shields.io/travis/likeastore/ngDialog.svg)](https://travis-ci.org/likeastore/ngDialog) -->
<!-- [![npm version](http://badge.fury.io/js/ng-dialog.svg)](http://badge.fury.io/js/ng-dialog) -->
<!-- [![github tag](https://img.shields.io/github/tag/likeastore/ngDialog.svg)](https://github.com/likeastore/ngDialog/tags) -->
<!-- [![Download Count](https://img.shields.io/npm/dm/ng-dialog.svg)](http://www.npmjs.com/package/ng-dialog) -->
<!-- [![Code Climate](https://codeclimate.com/github/likeastore/ngDialog/badges/gpa.svg)](https://codeclimate.com/github/likeastore/ngDialog) -->

<!-- ### [Demo](http://likeastore.github.io/ngDialog) -->

## Compatibility Table

| Angular Version     | @ashetm/ng-network Version | RxJS Version | Support |
|---------------------|----------------------------|--------------|---------|
| Angular 16.x – 19.x | @ashetm/ng-network 1.x     | 6.6.x and +  | ✅      |

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

This Angular **standalone** **structural** directive listens for changes in the network connection status and provides observable data about the network's current state and the time elapsed since the connection was lost. It uses `fromNetworkEvents` to detect online/offline status and `fromNetworkLastTimeConnected` to track the time elapsed since the device was last connected.

**Usage Example:**

Import the standalone ``NetworkDirective`` in your component (or NgModule) `imports`:

```ts
@Component({
  standalone: true,
  imports: [AsyncPipe, NgIf, NetworkDirective],
  // ...
})
```

```html
<ng-template ashetmNetwork let-network let-lastTimeConnected$="lastTimeConnected$">
  <div *ngIf="network | async">You are online</div>
  <div *ngIf="!(network | async)">You are offline</div>
  <div *ngIf="lastTimeConnected$ | async as lastConnected">Last connected: {{ lastConnected }} ms ago</div>
</ng-template>
```

Or with the structural shorthand:

```html
<div *ashetmNetwork="let network; lastTimeConnected$ as lastTimeConnected$">
  {{ (network | async) ? 'You are online' : 'You are offline' }}
</div>
```

**Explanation:**

* _network_: This observable emits the current state first, then `true` when the device goes online and `false` when it goes offline.
* _lastTimeConnected$_: This observable emits, every 100 ms while the device is offline, the time elapsed in milliseconds since the connection was lost. It emits `undefined` while the device is online.

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
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, tap } from 'rxjs/operators';

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
* `fromNetworkEvents()` emits `true` (assumes online).
* `fromNetworkLastTimeConnected()` and `fromNetworkStatus()` emit `undefined`.
* `retryUntilOnline` passes errors through.

## Issue

LOOKING FOR MAINTAINER OR IF THERE IS AN ISSUE OR ANY IDEA TO ADD. PLEASE CREATE ISSUE IN GITHUB REPOSITORY.
