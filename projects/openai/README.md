# @ashetm/ng-openai

[![npm version](https://img.shields.io/npm/v/@ashetm/ng-openai.svg)](https://www.npmjs.com/package/@ashetm/ng-openai)
[![npm downloads](https://img.shields.io/npm/dm/@ashetm/ng-openai.svg)](https://www.npmjs.com/package/@ashetm/ng-openai)

``@ashetm/ng-openai`` brings the official [``openai``](https://www.npmjs.com/package/openai) SDK to Angular: providers, signals for streamed replies, and a server proxy, so that **the OpenAI API key never reaches the browser**.

## Compatibility Table

| Angular Version     | @ashetm/ng-openai Version | openai Version | Support |
|---------------------|---------------------------|----------------|---------|
| Angular 20.x and +  | @ashetm/ng-openai 20.x    | 7.x            | ✅      |
| Angular 15.x        | @ashetm/ng-openai 15.x    | 3.x            | ❌      |
| Angular 14.x        | @ashetm/ng-openai 14.x    | 3.x            | ❌      |

The version follows the Angular version it starts from: **20.x** supports Angular 20 and above (there are no 16.x to 19.x versions).

14.x and 15.x are deprecated: they put the API key in the browser and use ``openai`` 3.x, which is no longer maintained. See [Upgrading from 15.x](#upgrading-from-15x).

## How it works

```text
Browser                                   Your server                         OpenAI
provideOpenAI({ baseURL: '/api/openai' }) createOpenAIProxy({ apiKey, ... })
injectOpenAI() / openaiStream()  ───────► /api/openai/responses  ───────────► api.openai.com/v1/responses
  (placeholder key)                         (real key, allowed models only)
```

The browser uses the official client, pointed at your own server. The proxy replaces the placeholder key with the real one, and only lets through the endpoints and models you allow.

## Install

```bash
npm install @ashetm/ng-openai openai
```

``openai`` (7.x) is a peer dependency: you get its full API and types.

## Entry points

| Import                           | Content                                       | Runs in            |
|----------------------------------|-----------------------------------------------|--------------------|
| ``@ashetm/ng-openai``            | ``provideOpenAI``, ``injectOpenAI``, tokens   | browser, SSR       |
| ``@ashetm/ng-openai/signals``    | ``openaiStream``, ``openaiResource``          | browser, SSR       |
| ``@ashetm/ng-openai/server``     | ``createOpenAIProxy``                         | server only        |

## Setup

### 1. The server proxy

In the ``server.ts`` of an Angular SSR application (Express), before the Angular handler:

```ts
import { createWebRequestFromNodeRequest, writeResponseToNodeResponse } from '@angular/ssr/node';
import { createOpenAIProxy } from '@ashetm/ng-openai/server';

const openaiProxy = createOpenAIProxy({
  apiKey: process.env['OPENAI_API_KEY']!,
  models: ['gpt-5-mini'],
  maxOutputTokens: 1000,
});

app.use(async (req, res, next) => {
  const response = await openaiProxy(createWebRequestFromNodeRequest(req));

  if (response) {
    await writeResponseToNodeResponse(response, res);
  } else {
    next();
  }
});
```

The proxy reads its own prefix (``/api/openai`` by default) and returns ``null`` for any other URL, so it can be registered for every request. Don't parse the body before it (no ``express.json()`` for these URLs).

``createOpenAIProxy`` only uses the standard ``Request`` / ``Response``: it also works in other servers and edge runtimes that have them.

### 2. The browser client

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideOpenAI } from '@ashetm/ng-openai';

bootstrapApplication(AppComponent, {
  providers: [provideOpenAI({ baseURL: '/api/openai' })]
});
```

### 3. Use it

```ts
import { Component, inject } from '@angular/core';
import { openaiStream } from '@ashetm/ng-openai/signals';

@Component({
  selector: 'app-chat',
  template: `
    <button (click)="ask()" [disabled]="reply.status() === 'streaming'">Ask</button>
    <p>{{ reply.text() }}</p>
    @if (reply.status() === 'error') { <p>Something went wrong.</p> }
  `
})
export class ChatComponent {

  readonly reply = openaiStream();

  ask(): void {
    this.reply.send({ model: 'gpt-5-mini', input: 'Write a haiku about Angular' });
  }

}
```

## API

### Core: @ashetm/ng-openai

#### provideOpenAI

```ts
provideOpenAI(config: OpenAIConfig): EnvironmentProviders

interface OpenAIConfig {
  baseURL: string;                   // your proxy, e.g. '/api/openai'
  headers?: Record<string, string>;  // sent with every request (e.g. your app's auth for the proxy)
  options?: OpenAIClientOptions;     // other client options: timeout, maxRetries, fetch...
}
```

Provides the official ``OpenAI`` client, created the first time it's injected:

* A relative ``baseURL`` is resolved against ``document.baseURI`` in the browser, and against the request URL during server-side rendering (the SDK needs an absolute URL).
* It sends a placeholder key (``OPENAI_PROXY_API_KEY``) that the proxy replaces. There is no ``apiKey`` option, on purpose; ``OpenAIClientOptions`` leaves out all the credential options.
* Organization and project IDs are not read from the server's environment variables during SSR; pass them in ``options`` if your proxy needs them.

#### injectOpenAI

```ts
injectOpenAI(options?: { injector?: Injector }): OpenAI
```

The client from ``provideOpenAI()``, with the whole official API:

```ts
const openai = injectOpenAI();
const response = await openai.responses.create({ model: 'gpt-5-mini', input: 'Hello' });
console.log(response.output_text);
```

Must be called in an injection context, unless an ``injector`` is given.

#### Tokens

* ``OPENAI``: the client (throws a clear error when ``provideOpenAI()`` is missing)
* ``OPENAI_CONFIG``: the config given to ``provideOpenAI()``
* ``OPENAI_PROXY_API_KEY``: the placeholder key sent by the browser

### Signals: @ashetm/ng-openai/signals

#### openaiStream

```ts
openaiStream(options?: { injector?: Injector }): OpenAIStream

interface OpenAIStream {
  text: Signal<string>;                          // the reply text, growing as it streams in
  status: Signal<'idle' | 'streaming' | 'done' | 'error' | 'aborted'>;
  error: Signal<unknown>;
  response: Signal<Response | undefined>;        // the full reply (Responses API), once done
  send(params: OpenAIStreamParams): void;        // Responses API params, without "stream"
  abort(): void;
}
```

Streams replies of the Responses API into signals:

* ``send()`` starts a reply; a reply still streaming is aborted first.
* The reply is aborted when the component (or the given injector) is destroyed.
* A failed reply (``response.failed``, an HTTP error, a network error) sets ``status`` to ``'error'`` and ``error`` to the error.

#### openaiResource

```ts
openaiResource(params: () => OpenAIResourceParams | undefined, options?: { injector?: Injector }): ResourceRef<string | undefined>
```

The reply text as an Angular ``resource()``: it runs again when the signals read in ``params`` change, the previous call being aborted. Returning ``undefined`` skips the call.

```ts
readonly text = input.required<string>();
readonly summary = openaiResource(() => this.text()
  ? { model: 'gpt-5-mini', input: `Summarize: ${this.text()}` }
  : undefined);
```

```html
@if (summary.isLoading()) { <p>Summarizing…</p> }
<p>{{ summary.value() }}</p>
```

``resource()`` is experimental in Angular 20: ``openaiResource`` follows its changes.

### Server: @ashetm/ng-openai/server

#### createOpenAIProxy

```ts
createOpenAIProxy(options: OpenAIProxyOptions): (request: Request) => Promise<Response | null>

interface OpenAIProxyOptions {
  apiKey: string;                     // the real key, e.g. process.env['OPENAI_API_KEY']
  models: string[];                   // models allowed in request bodies
  allow?: string[];                   // endpoints allowed, default ['responses'] ('responses' also allows 'responses/{id}')
  maxOutputTokens?: number;           // caps max_output_tokens (Responses) / max_completion_tokens (Chat Completions)
  authorize?: (request: Request) => boolean | Promise<boolean>; // your app's own check
  prefix?: string;                    // default '/api/openai'
  maxBodySize?: number;               // bytes, default 1 MB
  upstream?: string;                  // default 'https://api.openai.com/v1'
  fetch?: typeof fetch;               // default the global fetch
}
```

For each request under the prefix, it:

* refuses other endpoints (403), methods other than ``GET`` / ``POST`` (405), requests ``authorize`` rejects (401), other or missing models (400), bodies that aren't JSON objects (415 / 400) or are too large (413)
* replaces the key, forwards only the ``accept``, ``content-type``, ``idempotency-key`` and ``openai-beta`` headers (no cookies), and caps the output tokens
* passes the reply through, streamed replies included, with only the ``cache-control``, ``content-type`` and ``x-request-id`` headers (no ``set-cookie``)

Its errors use the OpenAI error format (``{ error: { message } }``), so the SDK shows their message.

## Security

* Never put an OpenAI API key in the browser: anyone can read it from the bundle and use it at your expense. ``provideOpenAI()`` has no ``apiKey`` option for that reason.
* The proxy is open to everyone who can reach your site: use ``authorize`` to check your users, keep ``models`` and ``allow`` short, and set ``maxOutputTokens``.
* Add rate limiting in front of the proxy (e.g. ``express-rate-limit``) for a public site.
* Set usage limits in the OpenAI dashboard as well.

## Server-side rendering

* ``provideOpenAI()`` works during SSR: a relative ``baseURL`` is resolved against the request URL.
* ``openaiStream`` and ``openaiResource`` never call OpenAI during SSR: ``send()`` does nothing and the resource stays idle, until the page runs in the browser.

## Upgrading from 15.x

20.0.0 is a rewrite for Angular 20 and ``openai`` 7.x:

* ``OpenaiModule.forRoot({ apiKey })`` is replaced by ``provideOpenAI({ baseURL })`` plus ``createOpenAIProxy({ apiKey })`` on your server: the key moves out of the browser.
* ``OpenaiService`` (``openai`` 3.x ``OpenAIApi``) is replaced by ``injectOpenAI()``, the ``openai`` 7.x client: see the [``openai`` migration guide](https://github.com/openai/openai-node/blob/master/MIGRATION.md) for its API (``createChatCompletion()`` became ``chat.completions.create()``, or the newer ``responses.create()``).
* ``OPENAI_TOKEN_CONFIGURATION``, ``AOpenaiConfiguration``, ``TOpenaiConfiguration`` and ``OpenairootModule`` are removed.

## Issue

LOOKING FOR MAINTAINER OR IF THERE IS AN ISSUE OR ANY IDEA TO ADD. PLEASE CREATE ISSUE IN GITHUB REPOSITORY.
