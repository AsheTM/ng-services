import { Observable, OperatorFunction, Subscriber } from "rxjs";

/**
 * The state of a request: pending, done with data, or failed
 */
export type LoadingState<T> =
  | { loading: true, data?: T }
  | { loading: false, data: T }
  | { loading: false, data?: T, error: unknown };

/**
 * Turns a source into loading states:
 * `{ loading: true }` on subscribe, `{ loading: false, data }` for each value,
 * `{ loading: false, error }` on error (then completes instead of erroring).
 *
 * With `keepData`, the last data is kept in the following states (`{ loading: true, data }` during a reload).
 * It's remembered by the operator instance: create it once and reuse it for each request.
 */
export function withLoading<T>(options: { keepData?: boolean } = {}): OperatorFunction<T, LoadingState<T>> {
  let lastData: { value: T } | undefined;

  return (source$: Observable<T>) => new Observable<LoadingState<T>>((subscriber: Subscriber<LoadingState<T>>) => {
    const keptData: { data?: T } = options.keepData && lastData ? { data: lastData.value } : {};

    subscriber.next({ loading: true, ...keptData });

    return source$.subscribe({
      next: (data: T) => {
        lastData = { value: data };
        subscriber.next({ loading: false, data });
      },
      error: (error: unknown) => {
        const errorData: { data?: T } = options.keepData && lastData ? { data: lastData.value } : {};

        subscriber.next({ loading: false, ...errorData, error });
        subscriber.complete();
      },
      complete: () => subscriber.complete()
    });
  });
}
