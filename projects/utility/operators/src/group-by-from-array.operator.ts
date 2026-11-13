import { Maybe } from '@ashetm/types';
import { Observable, OperatorFunction, map } from "rxjs";

import { ArrayGroupBy } from '@ashetm/ng-utility/pipes';

const arrayGroupBy: ArrayGroupBy = new ArrayGroupBy();

export function groupByFromArray<T>(key: keyof T): OperatorFunction<Maybe<T[]>, Record<string, T[]>> {
  return (source$: Observable<Maybe<T[]>>) => source$.pipe(map((list: Maybe<T[]>) => arrayGroupBy.transform(list, key)));
}
