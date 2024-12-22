import { Observable, OperatorFunction } from "rxjs";
import { map } from "rxjs/operators";

export function lastFromArray<T>(): OperatorFunction<T[], T | undefined> {
  return (source$: Observable<T[]>) => source$.pipe(map((list: T[]) => list[list.length - 1]));
}
