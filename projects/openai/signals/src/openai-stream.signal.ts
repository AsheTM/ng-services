import { DestroyRef, Injector, Signal, WritableSignal, assertInInjectionContext, inject, signal } from '@angular/core';
import { injectOpenAI } from '@ashetm/ng-openai';
import { isBrowser } from '@ashetm/platform';
import OpenAI from 'openai';
import { Response as OpenAIResponse, ResponseCreateParamsStreaming, ResponseStreamEvent } from 'openai/resources/responses/responses';

import { OpenAISignalOptions } from './openai-signal.type';


/**
 * Responses API params, without `stream`
 */
export type OpenAIStreamParams = Omit<ResponseCreateParamsStreaming, 'stream'>;

export type OpenAIStreamStatus = 'idle' | 'streaming' | 'done' | 'error' | 'aborted';

export interface OpenAIStream {

  /**
   * The reply text, growing as it streams in
   */
  readonly text: Signal<string>;

  readonly status: Signal<OpenAIStreamStatus>;

  readonly error: Signal<unknown>;

  /**
   * The full reply, once done
   */
  readonly response: Signal<OpenAIResponse | undefined>;

  /**
   * Starts a streamed reply; a reply still streaming is aborted first
   */
  send(params: OpenAIStreamParams): void;

  abort(): void;

}

/**
 * Streams replies of the Responses API into signals. Aborted when its injector (e.g. the component) is destroyed.
 * During server-side rendering, `send()` does nothing: the status stays `idle`.
 * Must be called in an injection context, unless an `injector` is given.
 */
export function openaiStream(options?: OpenAISignalOptions): OpenAIStream {
  if (!options?.injector) {
    assertInInjectionContext(openaiStream);
  }

  const injector: Injector = options?.injector ?? inject(Injector);
  const client: OpenAI = injectOpenAI({ injector });
  const browser: boolean = isBrowser();
  const text: WritableSignal<string> = signal<string>('');
  const status: WritableSignal<OpenAIStreamStatus> = signal<OpenAIStreamStatus>('idle');
  const error: WritableSignal<unknown> = signal<unknown>(undefined);
  const response: WritableSignal<OpenAIResponse | undefined> = signal<OpenAIResponse | undefined>(undefined);
  let current: AbortController | undefined;

  const abort = (): void => {
    if (current) {
      current.abort();
      current = undefined;
      status.set('aborted');
    }
  };

  const finish = (controller: AbortController, failure?: unknown): void => {
    if (current !== controller) {
      return;
    }

    current = undefined;
    error.set(failure);
    status.set(failure === undefined ? 'done' : 'error');
  };

  const run = async (params: OpenAIStreamParams, controller: AbortController): Promise<void> => {
    let failure: unknown;

    try {
      const events: AsyncIterable<ResponseStreamEvent> = await client.responses.create({ ...params, stream: true }, { signal: controller.signal });

      for await (const event of events) {
        if (current !== controller) {
          return;
        }

        switch (event.type) {
          case 'response.output_text.delta':
            text.update((value: string) => value + event.delta);
            break;
          case 'response.completed':
          case 'response.incomplete':
            response.set(event.response);
            break;
          case 'response.failed':
            response.set(event.response);
            failure = event.response.error ?? event;
            break;
          case 'error':
            failure = event;
            break;
        }
      }
    } catch (e: unknown) {
      failure = e;
    }

    finish(controller, failure);
  };

  injector.get(DestroyRef).onDestroy(abort);

  return {
    text: text.asReadonly(),
    status: status.asReadonly(),
    error: error.asReadonly(),
    response: response.asReadonly(),
    send: (params: OpenAIStreamParams): void => {
      abort();
      text.set('');
      error.set(undefined);
      response.set(undefined);

      if (!browser) {
        status.set('idle');

        return;
      }

      current = new AbortController();
      status.set('streaming');
      void run(params, current);
    },
    abort
  };
}
