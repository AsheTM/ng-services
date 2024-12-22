import { Observable, OperatorFunction } from "rxjs";
import { map } from "rxjs/operators";

export function mapFromArray<T, U = T>(fn: (item: T) => U): OperatorFunction<T[], U[]> {
  return (source$: Observable<T[]>) => source$.pipe(map((list: T[]) => list.map((item: T) => fn(item))));
}
