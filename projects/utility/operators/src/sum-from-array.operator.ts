import { Maybe } from '@ashetm/types';
import { Observable, OperatorFunction, map } from "rxjs";

import { ArraySum } from '@ashetm/ng-utility/pipes';

const arraySum: ArraySum = new ArraySum();

export function sumFromArray<T>(key?: keyof T): OperatorFunction<Maybe<T[]>, number> {
  return (source$: Observable<Maybe<T[]>>) => source$.pipe(map((list: Maybe<T[]>) => key === undefined ? arraySum.transform(list as unknown as number[]) : arraySum.transform(list, key)));
}
