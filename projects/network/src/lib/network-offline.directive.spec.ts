import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkOfflineDirective } from './network-offline.directive';

@Component({
    imports: [NetworkOfflineDirective],
    template: `
    <div *ashetmNetworkOffline>
      <span id="template">Offline</span>
    </div>
  `
})
class HostComponent { }

describe('NetworkOfflineDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let element: HTMLElement;

  function render(): void {
    fixture = TestBed.configureTestingModule({ imports: [HostComponent] }).createComponent(HostComponent);
    fixture.detectChanges();
    element = fixture.nativeElement;
  }

  afterEach(() => fixture.destroy());

  it('should render the current state when offline', () => {
    // GIVEN
    spyOnProperty(navigator, 'onLine').and.returnValue(false);

    // WHEN
    render();

    // THEN
    expect(element.querySelector('#template')).toBeTruthy();
  });

  it('should not render the current state when online', () => {
    // GIVEN
    spyOnProperty(navigator, 'onLine').and.returnValue(true);

    // WHEN
    render();

    // THEN
    expect(element.querySelector('#template')).toBeFalsy();
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
