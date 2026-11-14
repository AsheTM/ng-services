import { ClientOptions } from 'openai';


/**
 * Client options `provideOpenAI()` passes on, without the credential ones (the API key stays on the server) and `defaultHeaders` (use `headers`)
 */
export type OpenAIClientOptions = Omit<
  ClientOptions,
  'apiKey' | 'adminAPIKey' | 'workloadIdentity' | 'x509Transport' | 'credential' | 'provider' | 'dataResidency' | 'baseURL' | 'defaultHeaders' | 'dangerouslyAllowBrowser'
>;

export interface OpenAIConfig {

  /**
   * URL of the app's proxy to OpenAI (e.g. `'/api/openai'`). A relative URL is resolved against
   * `document.baseURI` in the browser, and against the request URL during server-side rendering.
   */
  baseURL: string;

  /**
   * Headers sent with every request (e.g. the app's own authentication for the proxy)
   */
  headers?: Record<string, string>;

  /**
   * Other client options (`timeout`, `maxRetries`, `fetch`...)
   */
  options?: OpenAIClientOptions;

}
