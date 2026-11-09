
# 20.0.0

- [x] **Breaking**: requires Angular 20+ (``@angular/common`` and ``@angular/core`` ``>=20.0.0``) and RxJS 7.4+ (``rxjs`` ``>=7.4.0``); Angular 16–19 users stay on 16.x
- [x] The version follows the Angular version it starts from: 16.x for Angular 16–19, 20.x for Angular 20+ (no 17.x, 18.x or 19.x)
- [x] Include the 16.0.2 fixes ([#79](https://github.com/AsheTM/ng-services/issues/79))
- [x] Use ``inject()`` instead of constructor injection, set up ESLint ([#80](https://github.com/AsheTM/ng-services/issues/80))
- [x] Update CHANGELOG
- [x] Update README

# 16.0.2

- [x] Support Angular 16 to 19 (peer dependencies ``>=16.0.0 <20.0.0``), drop the ``zone.js`` peer, declare ``rxjs`` ([#74](https://github.com/AsheTM/ng-services/issues/74))
- [x] Every ``data$`` subscriber receives messages, and unsubscribing removes its listener ([#63](https://github.com/AsheTM/ng-services/issues/63))
- [x] A message that can't be read is skipped with a warning instead of erroring ``data$`` ([#64](https://github.com/AsheTM/ng-services/issues/64))
- [x] ``close()`` completes ``data$``, and the service forgets closed channels ([#65](https://github.com/AsheTM/ng-services/issues/65))
- [x] ``get()`` returns ``null`` for unknown channels ([#66](https://github.com/AsheTM/ng-services/issues/66))
- [x] Server-side rendering: no channel opened on the server; ``NotSupportedError`` in browsers without ``BroadcastChannel`` ([#67](https://github.com/AsheTM/ng-services/issues/67))
- [x] Repair the unit tests ([#62](https://github.com/AsheTM/ng-services/issues/62))
- [x] Build in partial compilation mode
- [x] Update CHANGELOG
- [x] Update README

# 16.0.0

- [x] Make it compatible from 16 and above
- [x] Update CHANGELOG
- [x] Update README

# 15.0.1

# 15.0.0

# 14.0.1

# 14.0.0

# 13.0.1

# 13.0.0

# 12.0.1

# 12.0.0

# 1.0.4

# 1.0.3

# 1.0.2

# 1.0.1

* Change CHANGELOG.md
* Fix issue of not detecting it inside ngZone

# 1.0.0

* Create CHANGELOG.md
* Implement BroadcastChannel library
* Write doc in README.md
* Add informations in package.json
* Add .npmrc asset in ng-packagr.json
