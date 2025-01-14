# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-14

### Added

- **Directive**
  - `NetworkDirective`: Allows templates to reactively bind to network state (`online`/`offline`) and the last time the device was connected.

- **RxJS Observables**
  - `fromOfflineEvent`: Emits when the device goes offline.
  - `fromOnlineEvent`: Emits when the device comes online.
  - `fromNetworkEvents`: Emits 2 values: `true` for online, `false` for offline.
  - `fromNetworkLastTimeConnected`: Emits the elapsed time in milliseconds since the device was last connected to the network.

- **RxJS Operator**
  - `retryUntilOnline`: Retries a source observable when the network is offline. Supports customizable retry intervals and incremental backoff.

- **New Type: NetworkStatus**
  - Introduced the `NetworkStatus` TypeScript interface to represent detailed network status information.

### Notes

- The `NetworkDirective` is a standalone directive.
- `retryUntilOnline` is currently marked as an **experimental feature**.

---

## [Unreleased]

### Planned Features

- Provide testing utilities.
