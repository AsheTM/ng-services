
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
