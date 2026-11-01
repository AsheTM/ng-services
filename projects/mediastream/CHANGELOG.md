# 3.1.0

- [x] Browser detection comes from [``@ashetm/platform``](https://www.npmjs.com/package/@ashetm/platform), a new dependency; no API or behavior change ([#58](https://github.com/AsheTM/ng-services/issues/58))
- [x] Organize sources into folders, and add unit tests for the base classes ([#52](https://github.com/AsheTM/ng-services/issues/52))
- [x] Update CHANGELOG

# 3.0.0

- [x] **Breaking**: requires Angular 20+ (``@angular/common`` and ``@angular/core`` ``>=20.0.0``) and RxJS 7.4+ (``rxjs`` ``>=7.4.0``); Angular 16–19 users stay on 2.x
- [x] **Breaking**: ``currentMediaDevice$``, ``currentCameraMediaDevice$`` and ``currentMicrophoneMediaDevice$`` are ``Observable<MediaDeviceInfo | null>``, they emit ``null`` until a device is chosen
- [x] Include the 2.0.1 fixes
- [x] Use ``inject()`` instead of constructor injection
- [x] Set up ESLint
- [x] Update CHANGELOG
- [x] Update README

# 2.0.1

- [x] Fix ``disableCamera()``, ``enableCamera()`` and ``toggleCamera()`` doing nothing: they now switch the video tracks ([#30](https://github.com/AsheTM/ng-services/issues/30))
- [x] Release the camera and microphone: stop the permission stream of ``request…()``, the previous stream when the device changes, and the tracks when the last subscriber unsubscribes ([#31](https://github.com/AsheTM/ng-services/issues/31))
- [x] Share one stream between the subscribers of ``mediastream$`` ([#32](https://github.com/AsheTM/ng-services/issues/32))
- [x] Support server-side rendering, and pages without media devices: ``NotSupportedError`` instead of a crash ([#33](https://github.com/AsheTM/ng-services/issues/33))
- [x] Type the constraints as ``boolean | MediaTrackConstraints`` ([#34](https://github.com/AsheTM/ng-services/issues/34))
- [x] Run all unit tests, and fix their providers
- [x] Update peer deps: Angular ``>=16.0.0 <20.0.0``
- [x] Update CHANGELOG
- [x] Update README

# 2.0.0

- [x] Move to function instead of module
- [x] Update CHANGELOG
- [x] Update README
- [x] Update peer deps

# 1.0.1

- [x] Update README
- [x] Update peer deps

# 1.0.0

* Write unit tests
* Implement MediastreamMicrophoneService
* Implement MediastreamCameraMicrophoneService
* Implement MediastreamCameraService
* Implement MediastreamService
* Create MediastreamModule
