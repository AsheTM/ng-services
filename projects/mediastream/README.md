
# @ashetm/ng-mediastream

``@ashetm/ng-mediastream`` is a library that simplify manipulation of API ``MediaStream``.


<!-- [![build status](http://img.shields.io/travis/likeastore/ngDialog.svg)](https://travis-ci.org/likeastore/ngDialog) -->
<!-- [![npm version](http://badge.fury.io/js/ng-dialog.svg)](http://badge.fury.io/js/ng-dialog) -->
<!-- [![github tag](https://img.shields.io/github/tag/likeastore/ngDialog.svg)](https://github.com/likeastore/ngDialog/tags) -->
<!-- [![Download Count](https://img.shields.io/npm/dm/ng-dialog.svg)](http://www.npmjs.com/package/ng-dialog) -->
<!-- [![Code Climate](https://codeclimate.com/github/likeastore/ngDialog/badges/gpa.svg)](https://codeclimate.com/github/likeastore/ngDialog) -->

<!-- ### [Demo](http://likeastore.github.io/ngDialog) -->

## Compatibility Table

| Angular Version                | @ashetm/ng-mediastream Version | Support |
|--------------------------------|--------------------------------|---------|
| Angular 20.x and +             | @ashetm/ng-mediastream 3.x     | ✅      |
| Angular 16.x – 19.x            | @ashetm/ng-mediastream 2.x     | ❌      |
| Angular >= 11.0.0 and < 16.0.0 | @ashetm/ng-mediastream 1.0.1   | ❌      |
| Angular ~ 11.2.14              | @ashetm/ng-mediastream 1.0.0   | ❌      |

## Install

You can install it with npm:

```bash
npm install @ashetm/ng-mediastream
```

This installs the latest version, for Angular 20+. On **Angular 16–19**, install the 2.x version instead (see [Compatibility Table](#compatibility-table)):

```bash
npm install @ashetm/ng-mediastream@2
# or, with the npm tag
npm install @ashetm/ng-mediastream@angular-16-19
```

## Import

You only need to import ``provideMediaStream``.

```ts
...
import { provideMediaStream } from '@ashetm/ng-mediastream';
...
@NgModule({
  ...
  providers: [
    ...
    provideMediaStream(), 
    ...
  ]
  ...
})
export class AppModule { }
```

## API

``@ashetm/ng-mediastream`` exposes the following: 

### Providers

* ``provideMediaStream``, that needs to import in order to use the library

### Services

#### MediastreamService

``MediastreamService`` is a service concern all about ``MediaStream`` API.

And for methods, there is the following: 

* ``getCameraDevices()`` returns ``Promise<MediaDeviceInfo[]>`` with camera device list of type ``MediaDeviceInfo[]``.

* ``getDevices()`` returns ``Promise<MediaDeviceInfo[]>`` with all device list of type ``MediaDeviceInfo[]``.

* ``getMicrophoneDevices()`` returns ``Promise<MediaDeviceInfo[]>`` with microphone device list of type ``MediaDeviceInfo[]``.

* ``hasCameraDevices()`` returns ``Promise<boolean>`` ``boolean`` value if has at least 1 camera device.

* ``hasMicrophoneDevices()`` returns ``Promise<boolean>`` ``boolean`` value if has at least 1 microphone device.

* ``requestCamera(constraints?: MediaTrackConstraints)`` returns ``Promise<MediastreamCameraService>`` that contain instance of ``MediastreamCameraService`` (See below), it has 1 optional argument: 

1. ``constraints`` of type ``MediaTrackConstraints`` a configuration for camera.

* ``requestCameraAndMicrophone(constraints?: Partial<Record<'audio' | 'video', MediaTrackConstraints>>)`` returns ``Promise<MediastreamCameraMicrophoneService>`` that contain instance of ``MediastreamCameraMicrophoneService`` (See below), it has 1 optional argument: 

1. ``constraints`` of type ``Partial<Record<'audio' | 'video', MediaTrackConstraints>>`` a configuration for both camera and microphone.

* ``requestMicrophone(constraints?: MediaTrackConstraints)`` returns ``Promise<MediastreamMicrophoneService>`` that contain instance of ``MediastreamMicrophoneService`` (See below), it has 1 optional argument: 

1. ``constraints`` of type ``MediaTrackConstraints`` a configuration for microphone.

The ``request…()`` methods ask the user for permission, then stop the stream used for it: the camera/microphone only turns on when you subscribe to ``mediastream$``.

#### MediastreamCameraService

``MediastreamCameraService`` is a service concern all about ``MediaStream`` API of camera.

* ``currentMediaDevice$`` is ``Observable<MediaDeviceInfo | null>``, it emits the ``MediaDeviceInfo`` of the current camera device, or ``null`` until a device is chosen.

* ``mediastream$`` is ``Observable<MediaStream>``, it emits ``MediaStream`` value of media stream information.

* ``mediastreamConstraints`` is ``boolean | MediaTrackConstraints`` concerning camera configuration value.

For methods, there is the following: 

* ``disableCamera()`` returns ``void``, it disables the current camera device.

* ``enableCamera()`` returns ``void``, it enables the current camera device.

* ``toggleCamera()`` returns ``void``, it disables/enables the current camera device.

* ``updateCameraDevice(device: MediaDeviceInfo & Record<'kind', 'videoinput'>)`` returns ``void``, it updates the current camera device with the first argument ``device: MediaDeviceInfo & Record<'kind', 'videoinput'>``.

#### MediastreamCameraMicrophoneService

``MediastreamCameraMicrophoneService`` is a service concern all about ``MediaStream`` API of both camera and microphone at the same time.

* ``currentCameraMediaDevice$`` is ``Observable<MediaDeviceInfo | null>``, it emits the ``MediaDeviceInfo`` of the current camera device, or ``null`` until a device is chosen.

* ``currentMicrophoneMediaDevice$`` is ``Observable<MediaDeviceInfo | null>``, it emits the ``MediaDeviceInfo`` of the current microphone device, or ``null`` until a device is chosen.

* ``mediastream$`` is ``Observable<MediaStream>``, it emits ``MediaStream`` value of media stream information.

* ``mediastreamCameraConstraints`` is ``boolean | MediaTrackConstraints`` concerning camera configuration value.

* ``mediastreamMicrophoneConstraints`` is ``boolean | MediaTrackConstraints`` concerning microphone configuration value.

For methods, there is the following: 

* ``disableCamera()`` returns ``void``, it disables the current camera device.

* ``disableMicrophone()`` returns ``void``, it disables the current microphone device.

* ``enableCamera()`` returns ``void``, it enables the current camera device.

* ``enableMicrophone()`` returns ``void``, it enables the current microphone device.

* ``toggleCamera()`` returns ``void``, it disables/enables the current camera device.

* ``toggleMicrophone()`` returns ``void``, it disables/enables the current microphone device.

* ``updateCameraDevice(device: MediaDeviceInfo & Record<'kind', 'videoinput'>)`` returns ``void``, it updates the current camera device with the first argument ``device: MediaDeviceInfo & Record<'kind', 'videoinput'>``.

* ``updateMicrophoneDevice(device: MediaDeviceInfo & Record<'kind', 'audioinput'>)`` returns ``void``, it updates the current microphone device with the first argument ``device: MediaDeviceInfo & Record<'kind', 'audioinput'>``.

#### MediastreamMicrophoneService

``MediastreamMicrophoneService`` is a service concern all about ``MediaStream`` API of microphone.

* ``currentMediaDevice$`` is ``Observable<MediaDeviceInfo | null>``, it emits the ``MediaDeviceInfo`` of the current microphone device, or ``null`` until a device is chosen.

* ``mediastream$`` is ``Observable<MediaStream>``, it emits ``MediaStream`` value of media stream information.

* ``mediastreamConstraints`` is ``boolean | MediaTrackConstraints`` concerning microphone configuration value.

For methods, there is the following: 

* ``disableMicrophone()`` returns ``void``, it disables the current microphone device.

* ``enableMicrophone()`` returns ``void``, it enables the current microphone device.

* ``toggleMicrophone()`` returns ``void``, it disables/enables the current microphone device.

* ``updateMicrophoneDevice(device: MediaDeviceInfo & Record<'kind', 'audioinput'>)`` returns ``void``, it updates the current microphone device with the first argument ``device: MediaDeviceInfo & Record<'kind', 'audioinput'>``.

## Migrating from 2.x

* Requires Angular 20+ and RxJS 7.4+. Angular 16–19 users stay on 2.x.
* ``currentMediaDevice$``, ``currentCameraMediaDevice$`` and ``currentMicrophoneMediaDevice$`` are now ``Observable<MediaDeviceInfo | null>``: handle ``null`` (no device chosen yet), e.g. ``device?.label``.

## Media stream lifecycle

* ``mediastream$`` opens the camera/microphone on the first subscription, and **shares one stream** between all subscribers: a late subscriber gets the current stream.
* When the **last subscriber unsubscribes**, the tracks are stopped and the camera/microphone turns off. The next subscription opens a new stream.
* Changing device with ``updateCameraDevice()`` / ``updateMicrophoneDevice()`` stops the previous stream.

```html
<video autoplay [srcObject]="cameraService.mediastream$ | async"></video>
```

## Server-side rendering

The library is safe to use with server-side rendering, and when media devices aren't available (e.g. a page not served over HTTPS):

* ``getDevices()`` (and the related ``get…Devices()`` / ``has…Devices()``) return ``[]`` / ``false``.
* ``requestCamera()``, ``requestMicrophone()`` and ``requestCameraAndMicrophone()`` reject with a ``NotSupportedError``.
* On the server, ``mediastream$`` emits nothing.

## Issue

LOOKING FOR MAINTAINER OR IF THERE IS AN ISSUE OR ANY IDEA TO ADD. PLEASE CREATE ISSUE IN GITHUB REPOSITORY.
