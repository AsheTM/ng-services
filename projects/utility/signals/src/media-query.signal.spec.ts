import { EnvironmentInjector, Signal, createEnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { mediaQuerySignal } from './media-query.signal';


describe('mediaQuerySignal', () => {
  it('should tell if the media query matches', () => {
    // GIVEN
    // WHEN
    const [always, never]: Signal<boolean>[] = TestBed.runInInjectionContext(() => [
      mediaQuerySignal('(min-width: 0px)'),
      mediaQuerySignal('(max-width: 0px)')
    ]);

    // THEN
    expect(always()).toBeTrue();
    expect(never()).toBeFalse();
  });

  it('should follow the changes of the media query, until its injector is destroyed', () => {
    // GIVEN
    const mediaQueryList: EventTarget & { matches: boolean } = Object.assign(new EventTarget(), { matches: false });
    spyOn(window, 'matchMedia').and.returnValue(mediaQueryList as unknown as MediaQueryList);
    const injector: EnvironmentInjector = createEnvironmentInjector([], TestBed.inject(EnvironmentInjector));
    const matches: Signal<boolean> = mediaQuerySignal('(max-width: 600px)', { injector });

    // WHEN
    mediaQueryList.dispatchEvent(Object.assign(new Event('change'), { matches: true }));
    const changed: boolean = matches();
    injector.destroy();
    mediaQueryList.dispatchEvent(Object.assign(new Event('change'), { matches: false }));

    // THEN
    expect(changed).toBeTrue();
    expect(matches()).toBeTrue();
  });
});
