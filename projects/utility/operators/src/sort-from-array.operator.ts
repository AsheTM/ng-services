import { Observable, OperatorFunction, map } from "rxjs";

import { ArraySort } from '@ashetm/ng-utility/pipes';

const arraySort: ArraySort = new ArraySort();

/**
 * Sorts a copy of each list (the emitted list itself is left untouched)
 */
export function sortFromArray<T>(direction: 'asc' | 'desc' = 'asc', key?: keyof T): OperatorFunction<T[] | null | undefined, T[]> {
  return (source$: Observable<T[] | null | undefined>) => source$.pipe(map((list: T[] | null | undefined) => arraySort.transform(list ?? [], direction, key)));
}
