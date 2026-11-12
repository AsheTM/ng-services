/*
 * Public API Surface of ng-utility
 */

export { UtilityModule } from './lib/utility.module';
export { UtilityPipesModule } from './lib/utility-pipes.module';

export {
  containsItem,
  filterFromArray,
  firstFromArray,
  lastFromArray,
  mapFromArray,
  nthFromArray,
  pluckFromArray
} from './lib/operators';
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
  DateMax,
  DateMin,
  DefaultValue,
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
  ObjectKeys,
  ObjectPick,
  ObjectValues,
  Slugify,
  Truncate
} from './lib/pipes';
