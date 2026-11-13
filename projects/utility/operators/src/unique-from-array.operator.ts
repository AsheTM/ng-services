import { Maybe } from '@ashetm/types';
import { Observable, OperatorFunction, map } from "rxjs";

import { ArrayUnique } from '@ashetm/ng-utility/pipes';

const arrayUnique: ArrayUnique = new ArrayUnique();

export function uniqueFromArray<T>(key?: keyof T): OperatorFunction<Maybe<T[]>, T[]> {
  return (source$: Observable<Maybe<T[]>>) => source$.pipe(map((list: Maybe<T[]>) => key === undefined ? arrayUnique.transform(list) : arrayUnique.transform(list, key)));
}
