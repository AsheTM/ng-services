/*
 * Public API Surface of ng-utility
 */

export { UtilityDirectivesModule } from './lib/utility-directives.module';
export { UtilityModule } from './lib/utility.module';
export { UtilityPipesModule } from './lib/utility-pipes.module';

export {
  catchAndReturn,
  containsItem,
  countFromArray,
  debug,
  filterFromArray,
  filterNullish,
  firstFromArray,
  groupByFromArray,
  isEmptyArray,
  lastFromArray,
  mapFromArray,
  nthFromArray,
  pick,
  pluckFromArray,
  sortFromArray,
  sumFromArray,
  uniqueFromArray,
  withLoading
} from './lib/operators';
export type { DebugEvent, DebugOptions, LoadingState } from './lib/operators';
export {
  ArrayAverage,
  ArrayChunk,
  ArrayFill,
  ArrayFilter,
  ArrayFirst,
  ArrayFrom,
  ArrayGroupBy,
  ArrayIncludes,
  ArrayIsEmpty,
  ArrayLast,
  ArrayPluck,
  ArrayPop,
  ArrayReverse,
  ArrayShuffle,
  ArraySort,
  ArraySortAsc,
  ArraySortDesc,
  ArraySum,
  ArrayUnique,
  CapitalCase,
  CoerciveBoolean,
  ControlErrors,
  ControlValue,
  DateDiff,
  DateMax,
  DateMin,
  DefaultValue,
  FileSize,
  Format,
  Initial,
  IsArray,
  IsDate,
  IsDateAfter,
  IsDateBefore,
  IsDateBetween,
  IsDateFuture,
  IsDatePast,
  Log,
  ObjectEntries,
  ObjectFilter,
  ObjectGet,
  ObjectHas,
  ObjectInvert,
  ObjectIsEmpty,
  ObjectKeys,
  ObjectOmit,
  ObjectPick,
  ObjectSize,
  ObjectValues,
  Slugify,
  TimeAgo,
  Truncate
} from './lib/pipes';
export type { DateDiffUnit } from './lib/pipes';
export {
  AutofocusDirective,
  ClickOutsideDirective,
  CopyToClipboardDirective,
  DebounceClickDirective,
  ImageFallbackDirective,
  InViewportDirective,
  TrimOnBlurDirective
} from './lib/directives';
