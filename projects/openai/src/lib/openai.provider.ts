import { DOCUMENT, EnvironmentProviders, Injector, REQUEST, assertInInjectionContext, inject, makeEnvironmentProviders } from '@angular/core';
import OpenAI from 'openai';

import { OPENAI, OPENAI_CONFIG, OPENAI_PROXY_API_KEY } from './openai.token';
import { OpenAIConfig } from './openai.type';


/**
 * Provides the official `openai` client, pointed at the app's proxy and without API key.
 * The client is created the first time it's injected.
 */
export function provideOpenAI(config: OpenAIConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: OPENAI_CONFIG, useValue: config },
    { provide: OPENAI, useFactory: createOpenAI }
  ]);
}

/**
 * The client from `provideOpenAI()`. Must be called in an injection context, unless an `injector` is given.
 */
export function injectOpenAI(options?: { injector?: Injector }): OpenAI {
  if (options?.injector) {
    return options.injector.get(OPENAI);
  }

  assertInInjectionContext(injectOpenAI);

  return inject(OPENAI);
}

function createOpenAI(): OpenAI {
  const config: OpenAIConfig = inject(OPENAI_CONFIG);

  return new OpenAI({
    // Credentials and IDs are never read from the server's environment variables
    organization: null,
    project: null,
    webhookSecret: null,
    ...config.options,
    adminAPIKey: null,
    apiKey: OPENAI_PROXY_API_KEY,
    baseURL: resolveBaseURL(config.baseURL),
    defaultHeaders: config.headers,
    dangerouslyAllowBrowser: true
  });
}

function resolveBaseURL(baseURL: string): string {
  if (/^[a-z][a-z\d+.-]*:\/\//i.test(baseURL)) {
    return baseURL;
  }

  const base: string = inject(REQUEST, { optional: true })?.url ?? inject(DOCUMENT).baseURI;

  try {
    return new URL(baseURL, base).toString();
  } catch {
    throw new Error(`provideOpenAI: can't resolve the relative baseURL '${baseURL}' here: use an absolute URL.`);
  }
}
