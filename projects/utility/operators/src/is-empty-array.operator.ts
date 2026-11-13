import { Maybe } from '@ashetm/types';
import { Observable, OperatorFunction, map } from "rxjs";

import { ArrayIsEmpty } from '@ashetm/ng-utility/pipes';

const arrayIsEmpty: ArrayIsEmpty = new ArrayIsEmpty();

export function isEmptyArray<T>(): OperatorFunction<Maybe<T[]>, boolean> {
  return (source$: Observable<Maybe<T[]>>) => source$.pipe(map((list: Maybe<T[]>) => arrayIsEmpty.transform(list)));
}
