import { DOCUMENT, Injector, REQUEST } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import OpenAI from 'openai';

import { injectOpenAI, provideOpenAI } from './openai.provider';
import { OPENAI, OPENAI_PROXY_API_KEY } from './openai.token';
import { OpenAIConfig } from './openai.type';


describe('provideOpenAI', () => {

  function setup(config: OpenAIConfig, request?: Request): OpenAI {
    TestBed.configureTestingModule({
      providers: [
        provideOpenAI(config),
        ...(request ? [{ provide: REQUEST, useValue: request }] : [])
      ]
    });

    return TestBed.inject(OPENAI);
  }

  function fetchSpy(): jasmine.Spy {
    return jasmine.createSpy('fetch').and.callFake(() => Promise.resolve(new Response(
      JSON.stringify({ object: 'list', data: [] }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )));
  }

  it('should provide the official client', () => {
    // GIVEN
    // WHEN
    const client: OpenAI = setup({ baseURL: 'https://example.com/api/openai' });

    // THEN
    expect(client).toBeInstanceOf(OpenAI);
  });

  it('should keep an absolute baseURL', () => {
    // GIVEN
    // WHEN
    const client: OpenAI = setup({ baseURL: 'https://example.com/api/openai' });

    // THEN
    expect(client.baseURL).toBe('https://example.com/api/openai');
  });

  it('should resolve a relative baseURL against document.baseURI', () => {
    // GIVEN
    // WHEN
    const client: OpenAI = setup({ baseURL: '/api/openai' });

    // THEN
    expect(client.baseURL).toBe(new URL('/api/openai', TestBed.inject(DOCUMENT).baseURI).toString());
  });

  it('should resolve a relative baseURL against the request URL during server-side rendering', () => {
    // GIVEN
    const request: Request = new Request('https://app.example.com/products/1');

    // WHEN
    const client: OpenAI = setup({ baseURL: '/api/openai' }, request);

    // THEN
    expect(client.baseURL).toBe('https://app.example.com/api/openai');
  });

  it('should never hold a real API key', () => {
    // GIVEN
    // WHEN
    const client: OpenAI = setup({ baseURL: '/api/openai' });

    // THEN
    expect(client.apiKey).toBe(OPENAI_PROXY_API_KEY);
    expect(client.adminAPIKey).toBeNull();
  });

  it('should call the proxy with the placeholder key and the given headers', async () => {
    // GIVEN
    const fetch: jasmine.Spy = fetchSpy();
    const client: OpenAI = setup({ baseURL: 'https://example.com/api/openai', headers: { 'X-App-Token': 'token' }, options: { fetch, maxRetries: 0 } });

    // WHEN
    await client.models.list();

    // THEN
    const [url, init]: [string, RequestInit] = fetch.calls.mostRecent().args as [string, RequestInit];
    const headers: Headers = new Headers(init.headers);

    expect(url).toBe('https://example.com/api/openai/models');
    expect(headers.get('Authorization')).toBe(`Bearer ${OPENAI_PROXY_API_KEY}`);
    expect(headers.get('X-App-Token')).toBe('token');
  });

  it('should create the client only once, when first injected', () => {
    // GIVEN
    // WHEN
    const client: OpenAI = setup({ baseURL: '/api/openai' });

    // THEN
    expect(TestBed.inject(OPENAI)).toBe(client);
  });

});

describe('injectOpenAI', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideOpenAI({ baseURL: 'https://example.com/api/openai' })]
    });
  });

  it('should return the provided client in an injection context', () => {
    // GIVEN
    // WHEN
    const client: OpenAI = TestBed.runInInjectionContext(() => injectOpenAI());

    // THEN
    expect(client).toBe(TestBed.inject(OPENAI));
  });

  it('should use the given injector outside an injection context', () => {
    // GIVEN
    const injector: Injector = TestBed.inject(Injector);

    // WHEN
    const client: OpenAI = injectOpenAI({ injector });

    // THEN
    expect(client).toBe(TestBed.inject(OPENAI));
  });

  it('should throw outside an injection context without injector', () => {
    // GIVEN
    // WHEN
    // THEN
    expect(() => injectOpenAI()).toThrowError(/injection context/);
  });

});

describe('OPENAI', () => {

  it('should explain how to provide it when provideOpenAI() is missing', () => {
    // GIVEN
    TestBed.configureTestingModule({});

    // WHEN
    // THEN
    expect(() => TestBed.inject(OPENAI)).toThrowError(/provideOpenAI/);
  });

});
