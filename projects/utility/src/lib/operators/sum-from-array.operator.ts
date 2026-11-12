import { Observable, OperatorFunction, map } from "rxjs";

import { ArraySum } from "../pipes/array-sum.pipe";

const arraySum: ArraySum = new ArraySum();

export function sumFromArray<T>(key?: keyof T): OperatorFunction<T[] | null | undefined, number> {
  return (source$: Observable<T[] | null | undefined>) => source$.pipe(map((list: T[] | null | undefined) => key === undefined ? arraySum.transform(list as unknown as number[]) : arraySum.transform(list, key)));
}
