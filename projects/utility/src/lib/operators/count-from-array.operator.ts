import { Observable, OperatorFunction } from "rxjs";
import { map } from "rxjs/operators";

export function countFromArray<T>(fn: (item: T, index: number) => boolean): OperatorFunction<T[] | null | undefined, number> {
  return (source$: Observable<T[] | null | undefined>) => source$.pipe(map((list: T[] | null | undefined) => (list ?? []).filter((item: T, index: number) => fn(item, index)).length));
}
