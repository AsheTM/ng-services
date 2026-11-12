
# @ashetm/ng-broadcast-channel

``@ashetm/ng-broadcast-channel`` is a library that simplify manipulation of ``BroadcastChannel`` API.

## Compatibility Table

| Angular Version    | @ashetm/ng-broadcast-channel Version     | Zone     | Support |
|--------------------|------------------------------------------|----------|---------|
| Angular 16.x – 19.x | @ashetm/ng-broadcast-channel 16.x        | Zonefull | ✅      |
| Angular 15.x       | @ashetm/ng-broadcast-channel 15.x        | Zonefull | ❌      |
| Angular 14.x       | @ashetm/ng-broadcast-channel 14.x        | Zonefull | ❌      |
| Angular 13.x       | @ashetm/ng-broadcast-channel 13.x        | Zonefull | ❌      |
| Angular 12.x       | @ashetm/ng-broadcast-channel 12.x        | Zonefull | ❌      |
| Angular 11.x       | @ashetm/ng-broadcast-channel 11.x        | Zonefull | ❌      |

### Demo

Link to an [sample app](https://npm-ashetm-ng-broadcast-channel.netlify.app) to see how it works
<!-- [![build status](http://img.shields.io/travis/likeastore/ngDialog.svg)](https://travis-ci.org/likeastore/ngDialog) -->
<!-- [![npm version](http://badge.fury.io/js/ng-dialog.svg)](http://badge.fury.io/js/ng-dialog) -->
<!-- [![github tag](https://img.shields.io/github/tag/likeastore/ngDialog.svg)](https://github.com/likeastore/ngDialog/tags) -->
<!-- [![Download Count](https://img.shields.io/npm/dm/ng-dialog.svg)](http://www.npmjs.com/package/ng-dialog) -->
<!-- [![Code Climate](https://codeclimate.com/github/likeastore/ngDialog/badges/gpa.svg)](https://codeclimate.com/github/likeastore/ngDialog) -->

<!-- ### [Demo](http://likeastore.github.io/ngDialog) -->

## Install

You can install it with npm:

```bash
npm install @ashetm/ng-broadcast-channel
```

On **Angular 16–19**, install the 16.x version:

```bash
npm install @ashetm/ng-broadcast-channel@16
```

## Import

You only need to provide ``provideBroadcastChannel()``.

With a standalone application:

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideBroadcastChannel } from '@ashetm/ng-broadcast-channel';

bootstrapApplication(AppComponent, {
  providers: [provideBroadcastChannel()]
});
```

Or with an ``NgModule``:

```ts
...
import { provideBroadcastChannel } from '@ashetm/ng-broadcast-channel';
...
@NgModule({
  ...
  providers: [
    ...
    provideBroadcastChannel(),
    ...
  ]
  ...
})
export class AppModule { }
```

## API

``@ashetm/ng-broadcast-channel`` exposes the following: 

### Providers

* ``provideBroadcastChannel``, that needs to import in order to use the library

### Services

#### BroadcastChannelService

``BroadcastChannelService`` is a service concern all about ``BroadcastChannel`` API.

And for methods, there is the following: 

* ``create<T>(name: string)`` returns ``BroadcastChannelRef<T>``, the open channel with that name if it exists, otherwise a new one. Use the same type ``T`` for a given channel name: TypeScript can't check it between two ``create()`` calls.

* ``get<T>(name: string)`` returns ``BroadcastChannelRef<T> | null``, the open channel with that name, otherwise ``null`` (also once the channel is closed).

All channels are closed when the service is destroyed.

``BroadcastChannelRef<T>`` is wrapper class to manipulate ``BroadcastChannel`` API, it exposes the following: 

* ``name: string``, the channel name.

* ``closed: boolean``, ``true`` once the channel is closed.

* ``data$: Observable<T>`` emits the data sent on that channel by **other** tabs, windows or workers. Every subscriber receives every message. It completes when the channel is closed.

* ``close()`` returns ``void``, closes the channel and completes ``data$``. The service forgets it, so a later ``create()`` with the same name opens a new channel.

* ``send(data: T)`` returns ``void``, sends data to the other tabs, windows or workers listening on that channel.

## Good to know

* A tab doesn't receive its own messages: that's how the browser's ``BroadcastChannel`` works.
* A message that can't be read (e.g. it can't be deserialized) is skipped with a ``console.warn``; ``data$`` keeps going.

## Server-side rendering

The library is safe to use with server-side rendering. On the server, no channel is opened: ``data$`` emits nothing and ``send()`` does nothing.

In a browser without ``BroadcastChannel`` (e.g. Safari before 15.4), ``create()`` throws a ``NotSupportedError``.

## Issue

LOOKING FOR MAINTAINER OR IF THERE IS AN ISSUE OR ANY IDEA TO ADD. PLEASE CREATE ISSUE IN GITHUB REPOSITORY.
