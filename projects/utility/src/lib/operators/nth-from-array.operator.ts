import { Observable, OperatorFunction, map } from "rxjs";

export function nthFromArray<T>(index: number): OperatorFunction<T[], T | undefined> {
  return (source$: Observable<T[]>) => source$.pipe(map((list: T[]) => list[index]));
}
