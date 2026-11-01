# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2026-11-01

### Changed

- Browser detection comes from [`@ashetm/platform`](https://www.npmjs.com/package/@ashetm/platform), a new dependency; no API or behavior change ([#55](https://github.com/AsheTM/ng-services/issues/55)).

---

## [2.0.0] - 2026-10-31

### Breaking changes

- Requires Angular 20+ (`@angular/common` and `@angular/core` `>=20.0.0`) and RxJS 7.4+ (`rxjs` `>=7.4.0`). Angular 16–19 users stay on 1.x.
- `NetworkDirective`: the template context now holds signals ([#22](https://github.com/AsheTM/ng-services/issues/22)).
  - `$implicit` is `Signal<boolean>` instead of `Observable<boolean>`: use `network()` instead of `network | async`.
  - `lastTimeConnected$` is renamed `lastTimeConnected` and is `Signal<number | undefined>`.

See [Migrating from 1.x](README.md#migrating-from-1x).

### Added

- `injectNetwork()`: a `Signal<boolean>` with the current online state ([#23](https://github.com/AsheTM/ng-services/issues/23)).
- `NetworkDirectiveContext`: typed template context of `NetworkDirective`.
- Zoneless support: the directives and `injectNetwork()` work with `provideZonelessChangeDetection()`.

### Changed

- `retryUntilOnline`: uses `retry({ delay })` instead of the deprecated `retryWhen`; behavior is unchanged ([#24](https://github.com/AsheTM/ng-services/issues/24)).
- Directives no longer set `standalone: true` explicitly (standalone is the default since Angular 19).

---

## [1.1.0] - 2026-10-31

### Added

- **Directives**
  - `NetworkOnlineDirective` (`*ashetmNetworkOnline`): renders its content only while the device is online.
  - `NetworkOfflineDirective` (`*ashetmNetworkOffline`): renders its content only while the device is offline.

---

## [1.0.1] - 2026-10-31

### Fixed

- `NetworkDirective`: is now actually standalone, with the attribute selector `[ashetmNetwork]` ([#9](https://github.com/AsheTM/ng-services/issues/9)).
- `fromNetworkEvents`: emits the current network state on subscribe, and skips repeated values ([#10](https://github.com/AsheTM/ng-services/issues/10)).
- `fromNetworkLastTimeConnected`: starts counting right away when the device starts offline ([#10](https://github.com/AsheTM/ng-services/issues/10)).
- `retryUntilOnline`: no longer hangs or runs the source twice; it retries only errors that happen while offline, once back online ([#11](https://github.com/AsheTM/ng-services/issues/11)).
- Server-side rendering: no more `window is not defined` errors ([#12](https://github.com/AsheTM/ng-services/issues/12)).
- README and CHANGELOG updated to match the code ([#13](https://github.com/AsheTM/ng-services/issues/13)).

### Changed

- Peer dependencies: `@angular/common` and `@angular/core` `>=16.0.0 <20.0.0`.

---

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
