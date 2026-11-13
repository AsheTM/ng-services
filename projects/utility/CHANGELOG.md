# 20.2.0

- [x] Use [``@ashetm/types``](https://www.npmjs.com/package/@ashetm/types), a new types-only dependency: ``Maybe`` / ``Nullable`` / ``ValueOf`` in the public types, same types as before ([#167](https://github.com/AsheTM/ng-services/issues/167))
- [x] ``objectEntries`` returns typed pairs (``Entries<T>``) ([#167](https://github.com/AsheTM/ng-services/issues/167))
- [x] ``objectGet`` infers the return type when the object type is known and the path is one of its paths ([#168](https://github.com/AsheTM/ng-services/issues/168))
- [x] Update CHANGELOG
- [x] Update README

# 20.1.0

- [x] New entry point ``@ashetm/ng-utility/router`` with functional guards: ``unsavedChangesGuard`` (``provideUnsavedChanges()``), ``allowIf`` / ``redirectIf``, ``allGuards`` / ``anyGuard``, ``paramGuard`` / ``queryParamGuard`` ([#161](https://github.com/AsheTM/ng-services/issues/161))
- [x] ``@angular/router`` is an optional peer dependency; ``@ashetm/ng-utility`` doesn't re-export the guards, so it doesn't need it
- [x] Update CHANGELOG
- [x] Update README

# 20.0.0

- [x] **Breaking**: requires Angular 20+ (``@angular/common``, ``@angular/core`` and ``@angular/forms`` ``>=20.0.0``) and RxJS 7.4+ (``rxjs`` ``>=7.4.0``); Angular 16–19 users stay on 16.x
- [x] The version follows the Angular version it starts from: 16.x for Angular 16–19, 20.x for Angular 20+ (no 17.x, 18.x or 19.x)
- [x] Include everything from 16.0.1 to 16.7.0 ([#145](https://github.com/AsheTM/ng-services/issues/145))
- [x] **Breaking**: ``ControlErrors`` and ``ControlValue`` are pure again and return an Observable, used with ``| async`` ([#147](https://github.com/AsheTM/ng-services/issues/147))
- [x] Drop the ``@angular/cdk`` peer dependency, same ``coerciveBoolean`` results ([#149](https://github.com/AsheTM/ng-services/issues/149))
- [x] **Breaking**: use ``inject()`` instead of constructor injection (``new ControlErrors()``, ``new TimeAgo()``, ``new FileSize()`` need an injection context), set up ESLint ([#151](https://github.com/AsheTM/ng-services/issues/151))
- [x] Create the ``controlValueSignal``, ``controlErrorsSignal``, ``debouncedSignal``, ``previousSignal``, ``nowSignal``, ``toggleSignal``, ``loadingSignal``, ``storageSignal`` and ``mediaQuerySignal`` signal helpers; export the ``SignalOptions`` and ``ToggleSignal`` types ([#153](https://github.com/AsheTM/ng-services/issues/153))
- [x] Secondary entry points ``@ashetm/ng-utility/pipes``, ``/operators``, ``/directives``, ``/signals`` and ``/forms``; ``@ashetm/ng-utility`` still exports everything; ``@angular/forms`` is an optional peer dependency ([#155](https://github.com/AsheTM/ng-services/issues/155))
- [x] Update CHANGELOG
- [x] Update README


# 16.7.0

- [x] Configurable ``ControlErrors`` messages: ``provideControlErrorsMessages()`` with English defaults for the built-in validators, custom / translated messages (text or function); unchanged behavior without it ([#140](https://github.com/AsheTM/ng-services/issues/140))
- [x] Export ``CONTROL_ERRORS_MESSAGES``, ``DEFAULT_CONTROL_ERRORS_MESSAGES`` and the ``ControlErrorMessage`` / ``ControlErrorsMessages`` types
- [x] Update CHANGELOG
- [x] Update README

# 16.6.0

- [x] Create ``dateDiff``, ``fileSize`` and ``timeAgo`` pipes ([#138](https://github.com/AsheTM/ng-services/issues/138))
- [x] Export the ``DateDiffUnit`` type
- [x] Update CHANGELOG
- [x] Update README

# 16.5.0

- [x] Create ``AutofocusDirective``, ``ClickOutsideDirective``, ``CopyToClipboardDirective``, ``DebounceClickDirective``, ``ImageFallbackDirective``, ``InViewportDirective`` and ``TrimOnBlurDirective`` ([#136](https://github.com/AsheTM/ng-services/issues/136))
- [x] Create ``UtilityDirectivesModule``, exported by ``UtilityModule``
- [x] Depend on ``@ashetm/platform``
- [x] Update CHANGELOG
- [x] Update README

# 16.4.0

- [x] Create ``catchAndReturn``, ``countFromArray``, ``debug``, ``filterNullish``, ``groupByFromArray``, ``isEmptyArray``, ``pick``, ``sortFromArray``, ``sumFromArray``, ``uniqueFromArray`` and ``withLoading`` RxJS operators ([#134](https://github.com/AsheTM/ng-services/issues/134))
- [x] Export the ``LoadingState``, ``DebugOptions`` and ``DebugEvent`` types
- [x] Update CHANGELOG
- [x] Update README

# 16.3.0

- [x] Create ``objectFilter``, ``objectGet``, ``objectHas``, ``objectInvert``, ``objectIsEmpty``, ``objectOmit``, ``objectPick`` and ``objectSize`` pipes ([#132](https://github.com/AsheTM/ng-services/issues/132))
- [x] Update CHANGELOG
- [x] Update README

# 16.2.0

- [x] Create ``defaultValue``, ``slugify`` and ``truncate`` pipes ([#130](https://github.com/AsheTM/ng-services/issues/130))
- [x] Document the existing ``format`` pipe
- [x] Update CHANGELOG
- [x] Update README

# 16.1.0

- [x] Create ``arrayAverage``, ``arrayChunk``, ``arrayFirst``, ``arrayGroupBy``, ``arrayIsEmpty``, ``arrayLast``, ``arrayReverse``, ``arraySum`` and ``arrayUnique`` pipes ([#128](https://github.com/AsheTM/ng-services/issues/128))
- [x] Add ``DateMax``, ``DateMin`` and ``IsArray`` to ``UtilityPipesModule`` ([#127](https://github.com/AsheTM/ng-services/issues/127))
- [x] Update CHANGELOG
- [x] Update README

# 16.0.1

- [x] Support Angular 16 to 19 (peer dependencies ``>=16.0.0 <20.0.0``), build in partial compilation mode ([#108](https://github.com/AsheTM/ng-services/issues/108))
- [x] ``ArrayPop`` returns the last item, without removing it ([#95](https://github.com/AsheTM/ng-services/issues/95))
- [x] ``ArraySort`` / ``ArraySortAsc`` / ``ArraySortDesc`` sort in the right direction, equal items keep their order ([#96](https://github.com/AsheTM/ng-services/issues/96))
- [x] ``DateMin`` returns the earliest date ([#97](https://github.com/AsheTM/ng-services/issues/97))
- [x] ``IsDateBetween`` accepts valid dates ([#98](https://github.com/AsheTM/ng-services/issues/98))
- [x] ``ArraySort``, ``ArrayShuffle`` and ``ArrayFill`` return a new array, the input is not modified ([#99](https://github.com/AsheTM/ng-services/issues/99))
- [x] ``CapitalCase`` returns ``''`` for an empty string ([#100](https://github.com/AsheTM/ng-services/issues/100))
- [x] ``Initial`` ignores repeated spaces ([#101](https://github.com/AsheTM/ng-services/issues/101))
- [x] ``DateMin`` / ``DateMax`` return ``null`` for an empty list (return type ``Date | null``) ([#102](https://github.com/AsheTM/ng-services/issues/102))
- [x] ``IsDate`` accepts ``0`` and always returns a boolean (also ``IsDateAfter``, ``IsDateBefore``, ``IsDateBetween``, ``IsDateFuture``, ``IsDatePast``) ([#103](https://github.com/AsheTM/ng-services/issues/103))
- [x] ``ArrayPluck`` keeps ``0``, ``''`` and ``false`` ([#104](https://github.com/AsheTM/ng-services/issues/104))
- [x] ``ArrayFilter`` handles ``null`` items ([#105](https://github.com/AsheTM/ng-services/issues/105))
- [x] ``ControlErrors`` / ``ControlValue`` are impure, so they follow the control (results cached until it changes) ([#106](https://github.com/AsheTM/ng-services/issues/106))
- [x] Unit tests run again, wrong ``ArrayIncludes`` test fixed ([#110](https://github.com/AsheTM/ng-services/issues/110), [#107](https://github.com/AsheTM/ng-services/issues/107))
- [x] Update CHANGELOG
- [x] Update README

# 16.0.0

- [x] Create array-fill pipe
- [x] Create array-includes pipe
- [x] Create array-pop pipe
- [x] Create array-shuffle pipe
- [x] Create array-sort-asc pipe
- [x] Create array-sort-desc pipe
- [x] Create array-sort pipe
- [x] Create date-max pipe
- [x] Create date-min pipe
- [x] Create format pipe
- [x] Create is-array pipe
- [x] Create is-date-after pipe
- [x] Create is-date-before pipe
- [x] Create is-date-between pipe
- [x] Create is-date-future pipe
- [x] Create is-date-past pipe
- [x] Create is-date-between pipe
- [x] Create log pipe
- [x] Create `containsItem` RxJS operator to check if any item in the array satisfies a given condition
- [x] Create `filterFromArray` RxJS operator to filter items in an array based on a provided condition
- [x] Create `firstFromArray` RxJS operator to extract the last item from an array
- [x] Create `lastFromArray` RxJS operator to extract the last item from an array
- [x] Create `mapFromArray` RxJS operator to map each item in an array to a new value
- [x] Create `nthFromArray` RxJS operator to extract the item at a specified index from an array
- [x] Create `pluckFromArray` RxJS operator to extract a specific key from each object in an array
- [x] Update README.md

# xx.0.1

- [x] Write README.md
- [x] Make second argument of ArrayFilter optional
- [x] Refactor code
- [x] Fix issue of ArrayFilter that could not filter properly

# xx.0.0

- [x] Create array-filter pipe
- [x] Create array-from pipe
- [x] Create array-pluck pipe
- [x] Create capital-case pipe
- [x] Create coercive-boolean pipe
- [x] Create control-errors pipe
- [x] Create control-value pipe
- [x] Create initial pipe
- [x] Create is-date pipe
- [x] Create object-entries pipe
- [x] Create object-keys pipe
- [x] Create object-values pipe
