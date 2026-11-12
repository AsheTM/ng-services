import { Observable, OperatorFunction } from "rxjs";
import { map } from "rxjs/operators";

import { ArrayIsEmpty } from "../pipes/array-is-empty.pipe";

const arrayIsEmpty: ArrayIsEmpty = new ArrayIsEmpty();

export function isEmptyArray<T>(): OperatorFunction<T[] | null | undefined, boolean> {
  return (source$: Observable<T[] | null | undefined>) => source$.pipe(map((list: T[] | null | undefined) => arrayIsEmpty.transform(list)));
}
