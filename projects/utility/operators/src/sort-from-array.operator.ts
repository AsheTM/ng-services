import { Maybe } from '@ashetm/types';
import { Observable, OperatorFunction, map } from "rxjs";

import { ArraySort } from '@ashetm/ng-utility/pipes';

const arraySort: ArraySort = new ArraySort();

/**
 * Sorts a copy of each list (the emitted list itself is left untouched)
 */
export function sortFromArray<T>(direction: 'asc' | 'desc' = 'asc', key?: keyof T): OperatorFunction<Maybe<T[]>, T[]> {
  return (source$: Observable<Maybe<T[]>>) => source$.pipe(map((list: Maybe<T[]>) => arraySort.transform(list ?? [], direction, key)));
}
