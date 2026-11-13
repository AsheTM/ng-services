import { isDevMode } from "@angular/core";
import { Observable, Subscriber } from "rxjs";

export type DebugEvent = 'subscribe' | 'next' | 'error' | 'complete' | 'unsubscribe';

export interface DebugOptions {
  /** Console method used, except for errors which always use `console.error` (default `'log'`) */
  level?: 'log' | 'info' | 'warn' | 'error' | 'debug';
  /** Events to log (default all) */
  events?: DebugEvent[];
  /** Whether to log at all (default `isDevMode()`, so it's silent in production) */
  enabled?: boolean;
}

/**
 * Logs the events of a stream with a label, without changing it:
 * `[label] subscribe`, `[label] next: <value>`, `[label] error: <error>`, `[label] complete`, `[label] unsubscribe`.
 * `unsubscribe` is only logged when the stream is stopped before it completes or errors.
 */
export function debug<T>(label: string, options: DebugOptions = {}): (source$: Observable<T>) => Observable<T> {
  return (source$: Observable<T>) => {
    if (!(options.enabled ?? isDevMode())) {
      return source$;
    }

    const events: DebugEvent[] = options.events ?? ['subscribe', 'next', 'error', 'complete', 'unsubscribe'];
    const level: NonNullable<DebugOptions['level']> = options.level ?? 'log';
    const prefix: string = `[${label}]`;
    const log = (event: DebugEvent, ...values: unknown[]) => {
      if (events.includes(event)) {
        console[event === 'error' ? 'error' : level](`${prefix} ${event}${values.length ? ':' : ''}`, ...values);
      }
    };

    return new Observable<T>((subscriber: Subscriber<T>) => {
      let finished: boolean = false;

      log('subscribe');

      const subscription = source$.subscribe({
        next: (value: T) => {
          log('next', value);
          subscriber.next(value);
        },
        error: (error: unknown) => {
          finished = true;
          log('error', error);
          subscriber.error(error);
        },
        complete: () => {
          finished = true;
          log('complete');
          subscriber.complete();
        }
      });

      return () => {
        if (!finished) {
          log('unsubscribe');
        }

        subscription.unsubscribe();
      };
    });
  };
}
