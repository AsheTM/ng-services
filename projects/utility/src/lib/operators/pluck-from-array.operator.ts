import { Observable, OperatorFunction } from "rxjs";
import { map } from "rxjs/operators";

export function pluckFromArray<T, U extends keyof T>(key: U): OperatorFunction<T[], T[U][]> {
  return (source$: Observable<T[]>) => source$.pipe(map((list: T[]) => list.map((item: T) => item[key])));
}
