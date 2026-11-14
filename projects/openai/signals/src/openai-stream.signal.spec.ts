import { EnvironmentInjector, Injector, createEnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { FetchMock, createFetchMock, createResponseMock, waitFor } from './openai-signal.mock';
import { OpenAIStream, openaiStream } from './openai-stream.signal';


describe('openaiStream', () => {
  let mock: FetchMock;

  function setup(): OpenAIStream {
    mock = createFetchMock();
    TestBed.configureTestingModule({ providers: [mock.providers] });

    return TestBed.runInInjectionContext(() => openaiStream());
  }

  it('should start idle', () => {
    // GIVEN
    // WHEN
    const stream: OpenAIStream = setup();

    // THEN
    expect(stream.status()).toBe('idle');
    expect(stream.text()).toBe('');
    expect(stream.response()).toBeUndefined();
  });

  it('should send the params with stream: true', async () => {
    // GIVEN
    const stream: OpenAIStream = setup();

    // WHEN
    stream.send({ model: 'gpt-test', input: 'Hello' });
    await waitFor(() => mock.fetch.calls.count() === 1);

    // THEN
    expect(mock.body()).toEqual({ model: 'gpt-test', input: 'Hello', stream: true });
    expect(stream.status()).toBe('streaming');
  });

  it('should stream the text, then set the response', async () => {
    // GIVEN
    const stream: OpenAIStream = setup();
    const response: object = createResponseMock('Hello world');

    stream.send({ model: 'gpt-test', input: 'Hello' });
    await waitFor(() => mock.fetch.calls.count() === 1);

    // WHEN
    mock.push({ type: 'response.output_text.delta', delta: 'Hello', sequence_number: 1 });
    await waitFor(() => stream.text() === 'Hello');
    mock.push({ type: 'response.output_text.delta', delta: ' world', sequence_number: 2 });
    mock.push({ type: 'response.completed', response, sequence_number: 3 });
    mock.end();
    await waitFor(() => stream.status() === 'done');

    // THEN
    expect(stream.text()).toBe('Hello world');
    expect(stream.response()).toEqual(jasmine.objectContaining({ id: 'resp_1' }));
    expect(stream.error()).toBeUndefined();
  });

  it('should set the error when the response fails', async () => {
    // GIVEN
    const stream: OpenAIStream = setup();
    const error: object = { code: 'server_error', message: 'Failed' };

    stream.send({ model: 'gpt-test', input: 'Hello' });
    await waitFor(() => mock.fetch.calls.count() === 1);

    // WHEN
    mock.push({ type: 'response.failed', response: { ...createResponseMock(''), status: 'failed', error }, sequence_number: 1 });
    mock.end();
    await waitFor(() => stream.status() === 'error');

    // THEN
    expect(stream.error()).toEqual(error);
  });

  it('should set the error when the request fails', async () => {
    // GIVEN
    const stream: OpenAIStream = setup();

    mock.fetch.and.callFake(() => Promise.resolve(new Response(JSON.stringify({ error: { message: 'Nope' } }), { status: 401, headers: { 'Content-Type': 'application/json' } })));

    // WHEN
    stream.send({ model: 'gpt-test', input: 'Hello' });
    await waitFor(() => stream.status() === 'error');

    // THEN
    expect(stream.error()).toBeInstanceOf(Error);
  });

  it('should abort the request', async () => {
    // GIVEN
    const stream: OpenAIStream = setup();

    stream.send({ model: 'gpt-test', input: 'Hello' });
    await waitFor(() => mock.fetch.calls.count() === 1);

    // WHEN
    stream.abort();
    await waitFor(() => mock.signal().aborted);

    // THEN
    expect(stream.status()).toBe('aborted');
  });

  it('should abort the previous reply on a new send()', async () => {
    // GIVEN
    const stream: OpenAIStream = setup();

    stream.send({ model: 'gpt-test', input: 'First' });
    await waitFor(() => mock.fetch.calls.count() === 1);
    const first: AbortSignal = mock.signal();

    // WHEN
    stream.send({ model: 'gpt-test', input: 'Second' });
    await waitFor(() => mock.fetch.calls.count() === 2);

    // THEN
    expect(first.aborted).toBeTrue();
    expect(mock.body()).toEqual(jasmine.objectContaining({ input: 'Second' }));
    expect(stream.status()).toBe('streaming');
  });

  it('should abort when its injector is destroyed', async () => {
    // GIVEN
    mock = createFetchMock();
    TestBed.configureTestingModule({ providers: [mock.providers] });
    const injector: EnvironmentInjector = createEnvironmentInjector([], TestBed.inject(EnvironmentInjector));
    const stream: OpenAIStream = openaiStream({ injector });

    stream.send({ model: 'gpt-test', input: 'Hello' });
    await waitFor(() => mock.fetch.calls.count() === 1);

    // WHEN
    injector.destroy();
    await waitFor(() => mock.signal().aborted);

    // THEN
    expect(stream.status()).toBe('aborted');
  });

  it('should throw outside an injection context without injector', () => {
    // GIVEN
    // WHEN
    // THEN
    expect(() => openaiStream()).toThrowError(/injection context/);
  });

  it('should use the given injector', () => {
    // GIVEN
    mock = createFetchMock();
    TestBed.configureTestingModule({ providers: [mock.providers] });

    // WHEN
    const stream: OpenAIStream = openaiStream({ injector: TestBed.inject(Injector) });

    // THEN
    expect(stream.status()).toBe('idle');
  });

});
