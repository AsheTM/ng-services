import { Observable, OperatorFunction } from "rxjs";
import { map } from "rxjs/operators";

export function containsItem<T>(fn: (item: T) => boolean): OperatorFunction<T[], boolean> {
  return (source$: Observable<T[]>) => source$.pipe(map((list: T[]) => list.some((item: T) => fn(item))));
}
