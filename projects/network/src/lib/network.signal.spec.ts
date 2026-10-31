import {
  EnvironmentInjector,
  Injector,
  Signal,
  createEnvironmentInjector,
  runInInjectionContext
} from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { injectNetwork } from './network.signal';

describe('injectNetwork', () => {
  it('should be true when online', () => {
    // GIVEN
    spyOnProperty(navigator, 'onLine').and.returnValue(true);

    // WHEN
    const network: Signal<boolean> = TestBed.runInInjectionContext(() => injectNetwork());

    // THEN
    expect(network()).toBeTrue();
  });

  it('should be false when offline', () => {
    // GIVEN
    spyOnProperty(navigator, 'onLine').and.returnValue(false);

    // WHEN
    const network: Signal<boolean> = TestBed.runInInjectionContext(() => injectNetwork());

    // THEN
    expect(network()).toBeFalse();
  });

  it('should follow network changes', () => {
    // GIVEN
    spyOnProperty(navigator, 'onLine').and.returnValue(true);
    const network: Signal<boolean> = TestBed.runInInjectionContext(() => injectNetwork());

    // WHEN
    window.dispatchEvent(new Event('offline'));

    // THEN
    expect(network()).toBeFalse();

    // WHEN
    window.dispatchEvent(new Event('online'));

    // THEN
    expect(network()).toBeTrue();
  });

  it('should accept an injector outside an injection context', () => {
    // GIVEN
    spyOnProperty(navigator, 'onLine').and.returnValue(true);
    const injector: Injector = TestBed.inject(Injector);

    // WHEN
    const network: Signal<boolean> = injectNetwork({ injector });

    // THEN
    expect(network()).toBeTrue();
  });

  it('should throw outside an injection context without an injector', () => {
    // WHEN / THEN
    expect(() => injectNetwork()).toThrowError();
  });

  it('should stop listening when its injector is destroyed', () => {
    // GIVEN
    spyOnProperty(navigator, 'onLine').and.returnValue(true);
    const injector: EnvironmentInjector = createEnvironmentInjector([], TestBed.inject(EnvironmentInjector));
    runInInjectionContext(injector, () => injectNetwork());
    const removeEventListener = spyOn(window, 'removeEventListener').and.callThrough();

    // WHEN
    injector.destroy();

    // THEN
    expect(removeEventListener).toHaveBeenCalledWith('online', jasmine.any(Function), undefined);
    expect(removeEventListener).toHaveBeenCalledWith('offline', jasmine.any(Function), undefined);
  });
});
