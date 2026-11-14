import { OpenAIProxy, OpenAIProxyOptions, createOpenAIProxy } from './openai-proxy';


describe('createOpenAIProxy', () => {
  let upstream: jasmine.Spy;

  function setup(options?: Partial<OpenAIProxyOptions>): OpenAIProxy {
    upstream = jasmine.createSpy('fetch').and.callFake(() => Promise.resolve(new Response(
      JSON.stringify({ id: 'resp_1' }),
      { status: 200, headers: { 'Content-Type': 'application/json', 'Set-Cookie': 'tracking=1', 'X-Request-Id': 'req_1' } }
    )));

    return createOpenAIProxy({ apiKey: 'sk-real', models: ['gpt-test'], fetch: upstream, ...options });
  }

  function post(path: string, body: unknown, headers: Record<string, string> = {}): Request {
    return new Request(`https://app.example.com/api/openai/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ashetm-ng-openai-proxy', Cookie: 'session=1', ...headers },
      body: typeof body === 'string' ? body : JSON.stringify(body)
    });
  }

  function upstreamCall(): { url: string, init: RequestInit, headers: Headers, body: Record<string, unknown> } {
    const [url, init]: [string, RequestInit] = upstream.calls.mostRecent().args as [string, RequestInit];

    return { url, init, headers: new Headers(init.headers), body: init.body ? JSON.parse(init.body as string) : undefined };
  }

  async function message(response: Response | null): Promise<string> {
    return (await response!.json()).error.message;
  }

  it('should throw without API key', () => {
    // GIVEN
    // WHEN
    // THEN
    expect(() => createOpenAIProxy({ apiKey: '', models: [] })).toThrowError(/apiKey/);
  });

  it('should return null outside the prefix', async () => {
    // GIVEN
    const proxy: OpenAIProxy = setup();

    // WHEN
    const response: Response | null = await proxy(new Request('https://app.example.com/products'));

    // THEN
    expect(response).toBeNull();
    expect(upstream).not.toHaveBeenCalled();
  });

  it('should forward an allowed request with the real key and safe headers only', async () => {
    // GIVEN
    const proxy: OpenAIProxy = setup();

    // WHEN
    const response: Response | null = await proxy(post('responses', { model: 'gpt-test', input: 'Hello' }, { Accept: 'text/event-stream' }));

    // THEN
    const { url, init, headers, body } = upstreamCall();

    expect(url).toBe('https://api.openai.com/v1/responses');
    expect(init.method).toBe('POST');
    expect(headers.get('Authorization')).toBe('Bearer sk-real');
    expect(headers.get('Accept')).toBe('text/event-stream');
    expect(headers.get('Cookie')).toBeNull();
    expect(body).toEqual({ model: 'gpt-test', input: 'Hello' });
    expect(response!.status).toBe(200);
    expect(await response!.json()).toEqual({ id: 'resp_1' });
  });

  it('should only pass safe response headers back', async () => {
    // GIVEN
    const proxy: OpenAIProxy = setup();

    // WHEN
    const response: Response | null = await proxy(post('responses', { model: 'gpt-test' }));

    // THEN
    expect(response!.headers.get('Set-Cookie')).toBeNull();
    expect(response!.headers.get('X-Request-Id')).toBe('req_1');
  });

  it('should allow sub-paths of an allowed endpoint and keep the query', async () => {
    // GIVEN
    const proxy: OpenAIProxy = setup();

    // WHEN
    await proxy(new Request('https://app.example.com/api/openai/responses/resp_1?stream=true'));

    // THEN
    expect(upstreamCall().url).toBe('https://api.openai.com/v1/responses/resp_1?stream=true');
    expect(upstreamCall().init.method).toBe('GET');
  });

  it('should refuse other endpoints', async () => {
    // GIVEN
    const proxy: OpenAIProxy = setup();

    // WHEN
    const responses: (Response | null)[] = await Promise.all([
      proxy(post('files', { model: 'gpt-test' })),
      proxy(post('responsesX', { model: 'gpt-test' })),
      proxy(new Request('https://app.example.com/api/openai/responses/%2e%2e/files'))
    ]);

    // THEN
    expect(responses.map((response: Response | null) => response!.status)).toEqual([403, 403, 403]);
    expect(upstream).not.toHaveBeenCalled();
  });

  it('should use the given endpoints, prefix and upstream', async () => {
    // GIVEN
    const proxy: OpenAIProxy = setup({ allow: ['chat/completions'], prefix: '/ai/', upstream: 'https://proxy.example.com/v1/' });

    // WHEN
    await proxy(new Request('https://app.example.com/ai/chat/completions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'gpt-test' }) }));

    // THEN
    expect(upstreamCall().url).toBe('https://proxy.example.com/v1/chat/completions');
  });

  it('should refuse other methods', async () => {
    // GIVEN
    const proxy: OpenAIProxy = setup();

    // WHEN
    const response: Response | null = await proxy(new Request('https://app.example.com/api/openai/responses/resp_1', { method: 'DELETE' }));

    // THEN
    expect(response!.status).toBe(405);
  });

  it('should refuse other models', async () => {
    // GIVEN
    const proxy: OpenAIProxy = setup();

    // WHEN
    const responses: (Response | null)[] = await Promise.all([
      proxy(post('responses', { model: 'gpt-expensive' })),
      proxy(post('responses', { input: 'No model' }))
    ]);

    // THEN
    expect(responses.map((response: Response | null) => response!.status)).toEqual([400, 400]);
    expect(await message(responses[0])).toContain('gpt-expensive');
    expect(upstream).not.toHaveBeenCalled();
  });

  it('should refuse bodies that are not JSON objects', async () => {
    // GIVEN
    const proxy: OpenAIProxy = setup();

    // WHEN
    const responses: (Response | null)[] = await Promise.all([
      proxy(post('responses', '{ not json')),
      proxy(post('responses', [1, 2])),
      proxy(post('responses', { model: 'gpt-test' }, { 'Content-Type': 'text/plain' }))
    ]);

    // THEN
    expect(responses.map((response: Response | null) => response!.status)).toEqual([400, 400, 415]);
  });

  it('should refuse bodies larger than maxBodySize', async () => {
    // GIVEN
    const proxy: OpenAIProxy = setup({ maxBodySize: 50 });

    // WHEN
    const response: Response | null = await proxy(post('responses', { model: 'gpt-test', input: 'x'.repeat(100) }));

    // THEN
    expect(response!.status).toBe(413);
    expect(upstream).not.toHaveBeenCalled();
  });

  it('should cap the output tokens', async () => {
    // GIVEN
    const proxy: OpenAIProxy = setup({ maxOutputTokens: 100, allow: ['responses', 'chat/completions'] });

    // WHEN
    await proxy(post('responses', { model: 'gpt-test', max_output_tokens: 5000 }));
    const responses: Record<string, unknown> = upstreamCall().body;
    await proxy(post('responses', { model: 'gpt-test', max_output_tokens: 20 }));
    const lower: Record<string, unknown> = upstreamCall().body;
    await proxy(post('chat/completions', { model: 'gpt-test', max_tokens: 5000 }));
    const chat: Record<string, unknown> = upstreamCall().body;

    // THEN
    expect(responses['max_output_tokens']).toBe(100);
    expect(lower['max_output_tokens']).toBe(20);
    expect(chat['max_completion_tokens']).toBe(100);
    expect(chat['max_tokens']).toBeUndefined();
  });

  it('should set the cap when no limit is asked', async () => {
    // GIVEN
    const proxy: OpenAIProxy = setup({ maxOutputTokens: 100 });

    // WHEN
    await proxy(post('responses', { model: 'gpt-test' }));

    // THEN
    expect(upstreamCall().body['max_output_tokens']).toBe(100);
  });

  it('should refuse unauthorized requests', async () => {
    // GIVEN
    const authorize: jasmine.Spy = jasmine.createSpy('authorize').and.returnValue(Promise.resolve(false));
    const proxy: OpenAIProxy = setup({ authorize });

    // WHEN
    const response: Response | null = await proxy(post('responses', { model: 'gpt-test' }));

    // THEN
    expect(response!.status).toBe(401);
    expect(authorize).toHaveBeenCalledWith(jasmine.any(Request));
    expect(upstream).not.toHaveBeenCalled();
  });

  it('should answer 502 when OpenAI cannot be reached', async () => {
    // GIVEN
    const proxy: OpenAIProxy = setup();

    upstream.and.callFake(() => Promise.reject(new TypeError('network')));

    // WHEN
    const response: Response | null = await proxy(post('responses', { model: 'gpt-test' }));

    // THEN
    expect(response!.status).toBe(502);
  });

  it('should pass OpenAI errors and streamed bodies through', async () => {
    // GIVEN
    const proxy: OpenAIProxy = setup();
    const stream: ReadableStream<Uint8Array> = new ReadableStream<Uint8Array>({
      start: (controller: ReadableStreamDefaultController<Uint8Array>) => {
        controller.enqueue(new TextEncoder().encode('data: {"type":"response.output_text.delta"}\n\n'));
        controller.close();
      }
    });

    upstream.and.callFake(() => Promise.resolve(new Response(stream, { status: 429, headers: { 'Content-Type': 'text/event-stream' } })));

    // WHEN
    const response: Response | null = await proxy(post('responses', { model: 'gpt-test', stream: true }));

    // THEN
    expect(response!.status).toBe(429);
    expect(response!.headers.get('Content-Type')).toBe('text/event-stream');
    expect(await response!.text()).toContain('response.output_text.delta');
  });

});
