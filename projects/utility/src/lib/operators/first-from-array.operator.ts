import { OperatorFunction } from "rxjs";

import { nthFromArray } from "./nth-from-array.operator";

export function firstFromArray<T>(): OperatorFunction<T[], T | undefined> {
  return nthFromArray(0);
}
