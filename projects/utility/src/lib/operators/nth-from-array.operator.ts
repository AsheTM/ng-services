import { Observable, OperatorFunction } from "rxjs";
import { map } from "rxjs/operators";

export function nthFromArray<T>(index: number): OperatorFunction<T[], T | undefined> {
  return (source$: Observable<T[]>) => source$.pipe(map((list: T[]) => list[index]));
}
