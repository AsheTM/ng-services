import { ResourceRef, WritableSignal, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { OpenAIResourceParams, openaiResource } from './openai-resource.signal';
import { FetchMock, createFetchMock, createResponseMock, waitFor } from './openai-signal.mock';


describe('openaiResource', () => {
  let mock: FetchMock;

  function setup(params: () => OpenAIResourceParams | undefined): ResourceRef<string | undefined> {
    mock = createFetchMock(createResponseMock('A summary'));
    TestBed.configureTestingModule({ providers: [mock.providers] });

    return TestBed.runInInjectionContext(() => openaiResource(params));
  }

  it('should load the reply text', async () => {
    // GIVEN
    const summary: ResourceRef<string | undefined> = setup(() => ({ model: 'gpt-test', input: 'Summarize' }));

    // WHEN
    TestBed.tick();
    await waitFor(() => summary.hasValue());

    // THEN
    expect(summary.value()).toBe('A summary');
    expect(mock.body()).toEqual({ model: 'gpt-test', input: 'Summarize', stream: false });
  });

  it('should not call OpenAI while the params are undefined', async () => {
    // GIVEN
    const input: WritableSignal<string | undefined> = signal<string | undefined>(undefined);
    const summary: ResourceRef<string | undefined> = setup(() => input() === undefined ? undefined : { model: 'gpt-test', input: input() });

    // WHEN
    TestBed.tick();

    // THEN
    expect(summary.status()).toBe('idle');
    expect(mock.fetch).not.toHaveBeenCalled();
  });

  it('should run again when the params change', async () => {
    // GIVEN
    const input: WritableSignal<string> = signal<string>('First');
    const summary: ResourceRef<string | undefined> = setup(() => ({ model: 'gpt-test', input: input() }));

    TestBed.tick();
    await waitFor(() => summary.hasValue());

    // WHEN
    input.set('Second');
    TestBed.tick();
    await waitFor(() => mock.fetch.calls.count() === 2);

    // THEN
    expect(mock.body()).toEqual(jasmine.objectContaining({ input: 'Second' }));
  });

  it('should throw outside an injection context without injector', () => {
    // GIVEN
    // WHEN
    // THEN
    expect(() => openaiResource(() => undefined)).toThrowError(/injection context/);
  });

});
