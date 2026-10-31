import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkDirective } from './network.directive';

@Component({
  imports: [NetworkDirective],
  template: `
    <ng-template ashetmNetwork let-network>
      <span id="template">{{ network() ? 'online' : 'offline' }}</span>
    </ng-template>
    <div *ashetmNetwork="let network; lastTimeConnected as lastTimeConnected">
      <span id="shorthand">{{ network() ? 'online' : 'offline' }}</span>
      <span id="last-time-connected">{{ lastTimeConnected() }}</span>
    </div>
  `
})
class HostComponent { }

describe('NetworkDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let element: HTMLElement;

  function render(): void {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    element = fixture.nativeElement;
  }

  afterEach(() => fixture.destroy());

  describe('with zone.js', () => {
    beforeEach(() => TestBed.configureTestingModule({ imports: [HostComponent] }));

    it('should render the current state when online', () => {
      // GIVEN
      spyOnProperty(navigator, 'onLine').and.returnValue(true);

      // WHEN
      render();

      // THEN
      expect(element.querySelector('#template')?.textContent).toBe('online');
      expect(element.querySelector('#shorthand')?.textContent).toBe('online');
      expect(element.querySelector('#last-time-connected')?.textContent).toBe('');
    });

    it('should render the current state when offline', () => {
      // GIVEN
      spyOnProperty(navigator, 'onLine').and.returnValue(false);

      // WHEN
      render();

      // THEN
      expect(element.querySelector('#template')?.textContent).toBe('offline');
      expect(element.querySelector('#shorthand')?.textContent).toBe('offline');
    });

    it('should update when the network changes', () => {
      // GIVEN
      spyOnProperty(navigator, 'onLine').and.returnValue(true);
      render();

      // WHEN
      window.dispatchEvent(new Event('offline'));
      fixture.detectChanges();

      // THEN
      expect(element.querySelector('#template')?.textContent).toBe('offline');
      expect(element.querySelector('#shorthand')?.textContent).toBe('offline');
    });

    it('should destroy', () => {
      // GIVEN
      spyOnProperty(navigator, 'onLine').and.returnValue(true);
      render();
      const removeEventListener = spyOn(window, 'removeEventListener').and.callThrough();

      // WHEN
      fixture.destroy();

      // THEN
      expect(removeEventListener).toHaveBeenCalledWith('online', jasmine.any(Function), undefined);
      expect(removeEventListener).toHaveBeenCalledWith('offline', jasmine.any(Function), undefined);
    });
  });

  describe('zoneless', () => {
    beforeEach(() => TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideZonelessChangeDetection()]
    }));

    it('should update when the network changes', async () => {
      // GIVEN
      spyOnProperty(navigator, 'onLine').and.returnValue(true);
      render();

      // WHEN
      window.dispatchEvent(new Event('offline'));
      await fixture.whenStable();

      // THEN
      expect(element.querySelector('#template')?.textContent).toBe('offline');
      expect(element.querySelector('#shorthand')?.textContent).toBe('offline');
    });
  });
});
