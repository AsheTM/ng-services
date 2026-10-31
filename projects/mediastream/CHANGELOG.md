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
