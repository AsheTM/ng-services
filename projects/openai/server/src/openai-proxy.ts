export interface OpenAIProxyOptions {

  /**
   * The real OpenAI API key, e.g. `process.env['OPENAI_API_KEY']`
   */
  apiKey: string;

  /**
   * Models allowed in request bodies: other models are refused (400)
   */
  models: string[];

  /**
   * Endpoints allowed, as paths after the prefix (`'responses'` also allows `'responses/{id}'`). Default `['responses']`
   */
  allow?: string[];

  /**
   * Caps `max_output_tokens` (Responses API) and `max_completion_tokens` (Chat Completions)
   */
  maxOutputTokens?: number;

  /**
   * The app's own check (session, token...): `false` refuses the request (401)
   */
  authorize?: (request: Request) => boolean | Promise<boolean>;

  /**
   * Path the browser client calls (the `baseURL` of `provideOpenAI()`). Default `'/api/openai'`
   */
  prefix?: string;

  /**
   * Largest request body, in bytes. Default 1 MB
   */
  maxBodySize?: number;

  /**
   * Default `'https://api.openai.com/v1'`
   */
  upstream?: string;

  /**
   * Default the global `fetch`
   */
  fetch?: typeof fetch;

}

/**
 * Handles a request under the prefix, or returns `null` for any other URL
 */
export type OpenAIProxy = (request: Request) => Promise<Response | null>;

const REQUEST_HEADERS: string[] = ['accept', 'content-type', 'idempotency-key', 'openai-beta'];
const RESPONSE_HEADERS: string[] = ['cache-control', 'content-type', 'x-request-id'];
const SEGMENT: RegExp = /^[\w-]+(\.[\w-]+)*$/;

/**
 * A proxy to OpenAI for the browser client of `provideOpenAI()`: it adds the real API key on the server,
 * and only lets through the allowed endpoints and models. Runs wherever `Request` / `Response` exist
 * (Node 18+, Angular SSR, edge runtimes).
 */
export function createOpenAIProxy(options: OpenAIProxyOptions): OpenAIProxy {
  const prefix: string = (options.prefix ?? '/api/openai').replace(/\/+$/, '');
  const allow: string[] = options.allow ?? ['responses'];
  const upstream: string = (options.upstream ?? 'https://api.openai.com/v1').replace(/\/+$/, '');
  const maxBodySize: number = options.maxBodySize ?? 1_000_000;

  if (!options.apiKey) {
    throw new Error('createOpenAIProxy: apiKey is missing.');
  }

  return async (request: Request): Promise<Response | null> => {
    const url: URL = new URL(request.url);

    if (!url.pathname.startsWith(prefix + '/')) {
      return null;
    }

    const path: string = url.pathname.slice(prefix.length + 1);

    if (!path.split('/').every((segment: string) => SEGMENT.test(segment))
      || !allow.some((endpoint: string) => path === endpoint || path.startsWith(endpoint + '/'))) {
      return failure(403, `Endpoint '${path}' is not allowed.`);
    }

    if (request.method !== 'GET' && request.method !== 'POST') {
      return failure(405, `Method ${request.method} is not allowed.`);
    }

    if (options.authorize && !(await options.authorize(request))) {
      return failure(401, 'Unauthorized.');
    }

    let body: string | undefined;

    if (request.method === 'POST') {
      const parsed: Record<string, unknown> | Response = await readBody(request, maxBodySize);

      if (parsed instanceof Response) {
        return parsed;
      }

      if (typeof parsed['model'] !== 'string' || !options.models.includes(parsed['model'])) {
        return failure(400, `Model '${String(parsed['model'])}' is not allowed.`);
      }

      if (options.maxOutputTokens !== undefined) {
        capTokens(parsed, path.startsWith('chat/') ? 'max_completion_tokens' : 'max_output_tokens', options.maxOutputTokens);
      }

      body = JSON.stringify(parsed);
    }

    const headers: Headers = new Headers({ Authorization: `Bearer ${options.apiKey}` });

    REQUEST_HEADERS.forEach((name: string) => {
      const value: string | null = request.headers.get(name);

      if (value !== null) {
        headers.set(name, value);
      }
    });

    let response: Response;

    try {
      response = await (options.fetch ?? fetch)(`${upstream}/${path}${url.search}`, { method: request.method, headers, body, signal: request.signal });
    } catch {
      return failure(502, 'OpenAI could not be reached.');
    }

    const responseHeaders: Headers = new Headers();

    RESPONSE_HEADERS.forEach((name: string) => {
      const value: string | null = response.headers.get(name);

      if (value !== null) {
        responseHeaders.set(name, value);
      }
    });

    return new Response(response.body, { status: response.status, headers: responseHeaders });
  };
}

async function readBody(request: Request, maxBodySize: number): Promise<Record<string, unknown> | Response> {
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return failure(415, 'Only JSON bodies are allowed.');
  }

  if (Number(request.headers.get('content-length') ?? 0) > maxBodySize) {
    return failure(413, 'Request body too large.');
  }

  const chunks: Uint8Array[] = [];
  let size: number = 0;

  if (request.body) {
    const reader: ReadableStreamDefaultReader<Uint8Array> = request.body.getReader();

    for (let chunk = await reader.read(); !chunk.done; chunk = await reader.read()) {
      size += chunk.value.byteLength;

      if (size > maxBodySize) {
        await reader.cancel();

        return failure(413, 'Request body too large.');
      }

      chunks.push(chunk.value);
    }
  }

  const bytes: Uint8Array = new Uint8Array(size);

  chunks.reduce((offset: number, chunk: Uint8Array) => (bytes.set(chunk, offset), offset + chunk.byteLength), 0);

  try {
    const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes));

    return typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)
      ? parsed as Record<string, unknown>
      : failure(400, 'The body must be a JSON object.');
  } catch {
    return failure(400, 'The body is not valid JSON.');
  }
}

function capTokens(body: Record<string, unknown>, key: string, max: number): void {
  const requested: unknown = body[key] ?? body['max_tokens'];

  body[key] = typeof requested === 'number' ? Math.min(requested, max) : max;
  delete body['max_tokens'];
}

/**
 * An error in the OpenAI format, so the SDK shows its message
 */
function failure(status: number, message: string): Response {
  return new Response(JSON.stringify({ error: { message, type: 'proxy_error' } }), { status, headers: { 'Content-Type': 'application/json' } });
}
