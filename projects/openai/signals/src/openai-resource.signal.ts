import { Injector, ResourceRef, assertInInjectionContext, inject, resource } from '@angular/core';
import { injectOpenAI } from '@ashetm/ng-openai';
import { isBrowser } from '@ashetm/platform';
import OpenAI from 'openai';
import { ResponseCreateParamsNonStreaming } from 'openai/resources/responses/responses';

import { OpenAISignalOptions } from './openai-signal.type';


/**
 * Responses API params, without `stream`
 */
export type OpenAIResourceParams = Omit<ResponseCreateParamsNonStreaming, 'stream'>;

/**
 * The reply text of the Responses API, as an Angular `resource()` (experimental in Angular 20):
 * it runs again when the params change, the previous call being aborted.
 * Returning `undefined` from `params` skips the call. Nothing is called during server-side rendering.
 * Must be called in an injection context, unless an `injector` is given.
 */
export function openaiResource(params: () => OpenAIResourceParams | undefined, options?: OpenAISignalOptions): ResourceRef<string | undefined> {
  if (!options?.injector) {
    assertInInjectionContext(openaiResource);
  }

  const injector: Injector = options?.injector ?? inject(Injector);
  const client: OpenAI = injectOpenAI({ injector });
  const browser: boolean = isBrowser();

  return resource({
    params: () => browser ? params() : undefined,
    loader: async ({ params: body, abortSignal }: { params: OpenAIResourceParams, abortSignal: AbortSignal }) =>
      (await client.responses.create({ ...body, stream: false }, { signal: abortSignal })).output_text,
    injector
  });
}
