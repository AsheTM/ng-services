
# @ashetm/ng-mediastream

``@ashetm/ng-mediastream`` is a library that simplify manipulation of API ``MediaStream``.

*It works with Angular 11 and above*

<!-- [![build status](http://img.shields.io/travis/likeastore/ngDialog.svg)](https://travis-ci.org/likeastore/ngDialog) -->
<!-- [![npm version](http://badge.fury.io/js/ng-dialog.svg)](http://badge.fury.io/js/ng-dialog) -->
<!-- [![github tag](https://img.shields.io/github/tag/likeastore/ngDialog.svg)](https://github.com/likeastore/ngDialog/tags) -->
<!-- [![Download Count](https://img.shields.io/npm/dm/ng-dialog.svg)](http://www.npmjs.com/package/ng-dialog) -->
<!-- [![Code Climate](https://codeclimate.com/github/likeastore/ngDialog/badges/gpa.svg)](https://codeclimate.com/github/likeastore/ngDialog) -->


<!-- ### [Demo](http://likeastore.github.io/ngDialog) -->

## Install

You can install it with npm:

```bash
npm install @ashetm/ng-mediastream
```

## Import

You only need to import ``MediastreamModule``.

```ts
...
import { MediastreamModule } from '@ashetm/ng-mediastream';
...
@NgModule({
  ...
  imports: [
    ...
    MediastreamModule, 
    ...
  ]
  ...
})
export class AppModule { }
```

## API

``@ashetm/ng-mediastream`` exposes the following: 

### Modules

* ``MediastreamModule``, that needs to import in order to use the library

### Services

#### MediastreamService

``MediastreamService`` is a service concern all about ``MediaStream`` API.

And for methods, there is the following: 

* ``getCameraDevices()`` returns ``Promise<MediaDeviceInfo[]>`` with camera device list of type ``MediaDeviceInfo[]``.

* ``getDevices()`` returns ``Promise<MediaDeviceInfo[]>`` with all device list of type ``MediaDeviceInfo[]``.

* ``getMicrophoneDevices()`` returns ``Promise<MediaDeviceInfo[]>`` with microphone device list of type ``MediaDeviceInfo[]``.

* ``hasCameraDevices()`` returns ``Promise<boolean>`` ``boolean`` value if has at least 1 camera devise.

* ``hasMicrophoneDevices()`` returns ``Promise<boolean>`` ``boolean`` value if has at least 1 microphone devise.

* ``requestCamera(constraints?: MediaTrackConstraints)`` returns ``Promise<MediastreamCameraService>`` that contain instance of ``MediastreamCameraService`` (See below), it has 1 optional argument: 

1. ``constraints`` of type ``MediaTrackConstraints`` a configuration for camera.

* ``requestCameraAndMicrophone(constraints?: Partial<Record<'audio' | 'video', MediaTrackConstraints>>)`` returns ``Promise<MediastreamCameraService>`` that contain instance of ``MediastreamCameraService`` (See below), it has 1 optional argument: 

1. ``constraints`` of type ``Partial<Record<'audio' | 'video', MediaTrackConstraints>>`` a configuration for bot camera and microphone.

* ``requestMicrophone(constraints?: MediaTrackConstraints)`` returns ``Promise<MediastreamMicrophoneService>`` that contain instance of ``MediastreamMicrophoneService`` (See below), it has 1 optional argument: 

1. ``constraints`` of type ``MediaTrackConstraints`` a configuration for microphone.

#### MediastreamCameraService

``MediastreamCameraService`` is a service concern all about ``MediaStream`` API of camera.

* ``currentMediaDevice$`` is ``Observable<MediaDeviceInfo>``, it emits ``MediaDeviceInfo`` value of current media camera device information.

* ``mediastream$`` is ``Observable<MediaStream>``, it emits ``MediaStream`` value of media stream information.

* ``mediastreamConstraints`` is ``boolean | MediaTrackConstraints`` concerning camera configuration value.

For methods, there is the following: 

* ``disableCamera()`` returns ``void``, it disables the current camera device.

* ``enableCamera()`` returns ``void``, it enables the current camera device.

* ``toggleCamera()`` returns ``void``, it disables/enables the current camera device.

* ``updateCameraDevice(device: MediaDeviceInfo & Record<'kind', 'videoinput'>)`` returns ``void``, it updates the current camera device with the first argument ``device: MediaDeviceInfo & Record<'kind', 'videoinput'>``.

#### MediastreamCameraMicrophoneService

``MediastreamCameraMicrophoneService`` is a service concern all about ``MediaStream`` API of both camera and microphone at the same time.

* ``currentCameraMediaDevice$`` is ``Observable<MediaDeviceInfo>``, it emits ``MediaDeviceInfo`` value of current media camera device information.

* ``currentMicrophoneMediaDevice$`` is ``Observable<MediaDeviceInfo>``, it emits ``MediaDeviceInfo`` value of current media microphone device information.

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

* ``currentMediaDevice$`` is ``Observable<MediaDeviceInfo>``, it emits ``MediaDeviceInfo`` value of current media microphone device information.

* ``mediastream$`` is ``Observable<MediaStream>``, it emits ``MediaStream`` value of media stream information.

* ``mediastreamConstraints`` is ``boolean | MediaTrackConstraints`` concerning microphone configuration value.

For methods, there is the following: 

* ``disableMicrophone()`` returns ``void``, it disables the current microphone device.

* ``enableMicrophone()`` returns ``void``, it enables the current microphone device.

* ``toggleMicrophone()`` returns ``void``, it disables/enables the current microphone device.

* ``updateMicrophoneDevice(device: MediaDeviceInfo & Record<'kind', 'audioinput'>)`` returns ``void``, it updates the current microphone device with the first argument ``device: MediaDeviceInfo & Record<'kind', 'audioinput'>``.

## Issue

LOOKING FOR MAINTAINER OR IF THERE IS AN ISSUE OR ANY IDEA TO ADD. PLEASE CREATE ISSUE IN GITHUB REPOSITORY.
