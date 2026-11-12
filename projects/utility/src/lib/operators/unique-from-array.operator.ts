import { Observable, OperatorFunction } from "rxjs";
import { map } from "rxjs/operators";

import { ArrayUnique } from "../pipes/array-unique.pipe";

const arrayUnique: ArrayUnique = new ArrayUnique();

export function uniqueFromArray<T>(key?: keyof T): OperatorFunction<T[] | null | undefined, T[]> {
  return (source$: Observable<T[] | null | undefined>) => source$.pipe(map((list: T[] | null | undefined) => key === undefined ? arrayUnique.transform(list) : arrayUnique.transform(list, key)));
}
