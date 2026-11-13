import { Maybe } from '@ashetm/types';
import { Observable, OperatorFunction, map } from "rxjs";

export function countFromArray<T>(fn: (item: T, index: number) => boolean): OperatorFunction<Maybe<T[]>, number> {
  return (source$: Observable<Maybe<T[]>>) => source$.pipe(map((list: Maybe<T[]>) => (list ?? []).filter((item: T, index: number) => fn(item, index)).length));
}
