import { Observable, OperatorFunction, map } from "rxjs";

export function lastFromArray<T>(): OperatorFunction<T[], T | undefined> {
  return (source$: Observable<T[]>) => source$.pipe(map((list: T[]) => list[list.length - 1]));
}
