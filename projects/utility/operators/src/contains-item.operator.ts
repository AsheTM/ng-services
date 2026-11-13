import { Observable, OperatorFunction, map } from "rxjs";

export function containsItem<T>(fn: (item: T) => boolean): OperatorFunction<T[], boolean> {
  return (source$: Observable<T[]>) => source$.pipe(map((list: T[]) => list.some((item: T) => fn(item))));
}
