import { Observable, OperatorFunction } from "rxjs";
import { map } from "rxjs/operators";

import { ArrayGroupBy } from "../pipes/array-group-by.pipe";

const arrayGroupBy: ArrayGroupBy = new ArrayGroupBy();

export function groupByFromArray<T>(key: keyof T): OperatorFunction<T[] | null | undefined, Record<string, T[]>> {
  return (source$: Observable<T[] | null | undefined>) => source$.pipe(map((list: T[] | null | undefined) => arrayGroupBy.transform(list, key)));
}
