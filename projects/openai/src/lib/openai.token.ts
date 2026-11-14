import { InjectionToken } from '@angular/core';
import OpenAI from 'openai';

import { OpenAIConfig } from './openai.type';


/**
 * The API key sent by the browser: the proxy replaces it with the real one
 */
export const OPENAI_PROXY_API_KEY: string = 'ashetm-ng-openai-proxy';

export const OPENAI_CONFIG: InjectionToken<OpenAIConfig> = new InjectionToken<OpenAIConfig>('OPENAI_CONFIG');

export const OPENAI: InjectionToken<OpenAI> = new InjectionToken<OpenAI>('OPENAI', {
  providedIn: 'root',
  factory: () => {
    throw new Error('OPENAI is not provided: add provideOpenAI({ baseURL }) to the application providers.');
  }
});
