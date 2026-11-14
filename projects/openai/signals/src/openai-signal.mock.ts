import { EnvironmentProviders } from '@angular/core';
import { provideOpenAI } from '@ashetm/ng-openai';


export interface FetchMock {
  fetch: jasmine.Spy;
  providers: EnvironmentProviders;
  /** Sends one server-sent event of the last request */
  push(event: object): void;
  /** Ends the last request's stream */
  end(): void;
  /** Body (JSON) of the last request */
  body(): Record<string, unknown>;
  signal(): AbortSignal;
}

/**
 * A `fetch` answering every request with a stream of server-sent events, or with `json` when given
 */
export function createFetchMock(json?: object): FetchMock {
  let controller: ReadableStreamDefaultController<Uint8Array> | undefined;
  const encoder: TextEncoder = new TextEncoder();
  const fetch: jasmine.Spy = jasmine.createSpy('fetch').and.callFake((_url: string, init: RequestInit) => {
    if (json) {
      return Promise.resolve(new Response(JSON.stringify(json), { status: 200, headers: { 'Content-Type': 'application/json' } }));
    }

    const body: ReadableStream<Uint8Array> = new ReadableStream<Uint8Array>({
      start: (streamController: ReadableStreamDefaultController<Uint8Array>) => {
        controller = streamController;
        init.signal?.addEventListener('abort', () => streamController.error(new DOMException('Aborted', 'AbortError')));
      }
    });

    return Promise.resolve(new Response(body, { status: 200, headers: { 'Content-Type': 'text/event-stream' } }));
  });

  const lastInit = (): RequestInit => fetch.calls.mostRecent().args[1] as RequestInit;

  return {
    fetch,
    providers: provideOpenAI({ baseURL: 'https://example.com/api/openai', options: { fetch, maxRetries: 0 } }),
    push: (event: object) => controller?.enqueue(encoder.encode(`event: ${(event as { type: string }).type}\ndata: ${JSON.stringify(event)}\n\n`)),
    end: () => controller?.close(),
    body: () => JSON.parse(lastInit().body as string),
    signal: () => lastInit().signal as AbortSignal
  };
}

/**
 * Waits until `condition` is true (or fails after 1 second)
 */
export async function waitFor(condition: () => boolean): Promise<void> {
  const end: number = Date.now() + 1000;

  while (!condition()) {
    if (Date.now() > end) {
      throw new Error('waitFor: timed out');
    }

    await new Promise((resolve: (value: unknown) => void) => setTimeout(resolve, 5));
  }
}

export function createResponseMock(text: string): object {
  return {
    id: 'resp_1',
    object: 'response',
    status: 'completed',
    error: null,
    output: [{ type: 'message', id: 'msg_1', role: 'assistant', status: 'completed', content: [{ type: 'output_text', text, annotations: [] }] }]
  };
}
