
# @ashetm/ng-network

``@ashetm/ng-network`` is a library that provide some utilities classes, like pipes.

<!-- [![build status](http://img.shields.io/travis/likeastore/ngDialog.svg)](https://travis-ci.org/likeastore/ngDialog) -->
<!-- [![npm version](http://badge.fury.io/js/ng-dialog.svg)](http://badge.fury.io/js/ng-dialog) -->
<!-- [![github tag](https://img.shields.io/github/tag/likeastore/ngDialog.svg)](https://github.com/likeastore/ngDialog/tags) -->
<!-- [![Download Count](https://img.shields.io/npm/dm/ng-dialog.svg)](http://www.npmjs.com/package/ng-dialog) -->
<!-- [![Code Climate](https://codeclimate.com/github/likeastore/ngDialog/badges/gpa.svg)](https://codeclimate.com/github/likeastore/ngDialog) -->

<!-- ### [Demo](http://likeastore.github.io/ngDialog) -->

## Compatibility Table

| Angular Version    | @ashetm/ng-network Version     | RxJS Version   | Support |
|--------------------|--------------------------------|----------------|---------|
| Angular 16.x and + | @ashetm/ng-network 16.x and +  | 6.x.x and +    | ✅      |

## Install

You can install it with npm:

```bash
npm install @ashetm/ng-network
```

## API

``@ashetm/ng-network`` exposes the following: 

### Directives

#### NetworkDirective

* _Selector_: `ashetmNetwork`

This Angular **standalone** **structural** directive listens for changes in the network connection status and provides observable data about the network's current state and the last time it was connected. It uses fromNetworkEvents to detect online/offline status and fromNetworkLastTimeConnected to track the last time the device was connected.

**Usage Example:**

Importing the specific standalone ``NetworkDirective`` step is required.

```html
<ng-template ashetmNetwork let-network let-lastTimeConnected$="lastTimeConnected$">
  <div *ngIf="network | async">You are online</div>
  <div *ngIf="!(network | async)">You are offline</div>
  <div *ngIf="lastTimeConnected$ | async as lastConnected">Last connected: {{ lastConnected }} ms ago</div>
</ng-template>
```

**Explanation:**

* _network_: This observable emits a boolean value, `true` if the device is online and `false` if the device is offline.
* _lastTimeConnected$_: This observable emits the last time the device was connected in milliseconds. It emits undefined when the device is online.

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

Emits true when the device is online and false when the device is offline.

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

Emits the last time the device was connected (in milliseconds) or undefined if the device is currently online.

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

This observable provides detailed network status information, including the connection type, downlink speed, round-trip time, and whether data saver mode is enabled. The observable emits updates whenever the network conditions change.

**Parameters:**

* _online_: Indicates whether the device is online (true or false).
* _type_: The type of network connection (e.g., wifi, cellular).
* _downlink_: The estimated downlink speed in Mbps.
* _rtt_: The estimated round-trip time in milliseconds.
* _saveData_: Indicates whether the user has enabled data saver mode.

**Example:**

```tsx
fromNetworkStatus().subscribe((status: NetworkStatus) => {
  console.log(`Online: ${status.online}`);
  console.log(`Connection Type: ${status.type}`);
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

The ``retryUntilOnline`` operator is **an experimental feature** that automatically retries an observable operation whenever it fails. If the network is offline, it retries the operation with an increasing delay until the network becomes online again. Once the network is online, the operation retries immediately.

**Parameters:**

* `durationStep`: The base delay time in milliseconds (default is `1000 ms`).
* `timeIncreasing`: A boolean that determines whether the retry delay should increase with each attempt (default is `false`).

**Example:**

```tsx
import { ajax } from 'rxjs/ajax';
import { catchError, tap, of } from 'rxjs';

import { retryUntilOnline } from '@ashetm//ng-network';

// Mock API endpoint
const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts/1';

// Simulated HTTP request
const httpRequest$ = ajax.getJSON(apiEndpoint).pipe(
  tap((response) => console.log('Request successful:', response)),
  catchError((error) => {
    console.error('Request failed:', error);
    return of(null); // Handle the error and emit a fallback value
  }),
  retryUntilOnline(1000) // Retry every 1 second until the network is online
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

## Issue

LOOKING FOR MAINTAINER OR IF THERE IS AN ISSUE OR ANY IDEA TO ADD. PLEASE CREATE ISSUE IN GITHUB REPOSITORY.
