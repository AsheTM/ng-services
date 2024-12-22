import { Observable, MonoTypeOperatorFunction } from "rxjs";
import { map } from "rxjs/operators";

export function filterFromArray<T>(fn: (value: T, index: number) => boolean): MonoTypeOperatorFunction<T[]> {
  return (source$: Observable<T[]>) => source$.pipe(map((list: T[]) => list.filter((item: T, index: number) => fn(item, index))));
}
