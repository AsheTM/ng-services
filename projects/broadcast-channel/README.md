
# @ashetm/ng-broadcast-channel

``@ashetm/ng-broadcast-channel`` is a library that simplify manipulation of ``BroadcastChannel`` API.

## Compatibility Table

| Angular Version    | @ashetm/ng-broadcast-channel Version     | Zone     | Support |
|--------------------|------------------------------------------|----------|---------|
| Angular 16.x and + | @ashetm/ng-broadcast-channel 16.x and +  | Zonefull | ✅      |
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

## Import

You only need to import ``BroadcastChannelModule``.

```ts
...
import { BroadcastChannelModule } from '@ashetm/ng-broadcast-channel';
...
@NgModule({
  ...
  imports: [
    ...
    BroadcastChannelModule, 
    ...
  ]
  ...
})
export class AppModule { }
```

## API

``@ashetm/ng-broadcast-channel`` exposes the following: 

### Modules

* ``BroadcastChannelModule``, that needs to import in order to use the library

### Services

#### BroadcastChannelService

``BroadcastChannelService`` is a service concern all about ``BroadcastChannel`` API.

And for methods, there is the following: 

* ``create<T>(name: string)`` returns ``BroadcastChannelRef<T>`` a reference of BroadcastChannel with that name provided in the first argument, if exists otherwise returns create a new one.

* ``get<T>(name: string)`` returns ``BroadcastChannelRef<T> | null`` a reference of BroadcastChannel with that name provided in the first argument, otherwise null.

``BroadcastChannelRef<T>`` is wrapper class to manipulate ``BroadcastChannel`` API, it exposes the following: 

* ``data$: Observable<T>`` is an observable of stream data that listen to data sent through that broadcast channel.

* ``close()`` returns ``void``, closes the broadcast channel.

* ``send(data: T)`` returns ``void``, send data through the broadcast channel.

## Issue

LOOKING FOR MAINTAINER OR IF THERE IS AN ISSUE OR ANY IDEA TO ADD. PLEASE CREATE ISSUE IN GITHUB REPOSITORY.
