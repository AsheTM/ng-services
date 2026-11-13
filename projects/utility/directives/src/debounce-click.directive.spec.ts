import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { DebounceClickDirective } from './debounce-click.directive';


@Component({
  standalone: true,
  imports: [DebounceClickDirective],
  template: `<button (ashetmDebounceClick)="clicks = clicks + 1" [ashetmDebounceClickTime]="1000">Save</button>`
})
class HostComponent {
  clicks: number = 0;
}

describe('DebounceClickDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let button: HTMLButtonElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('button');
  });

  afterEach(() => fixture.destroy());

  it('should emit the first click and ignore the next ones during the delay', fakeAsync(() => {
    // GIVEN
    // WHEN
    button.click();
    button.click();
    tick(999);
    button.click();

    // THEN
    expect(fixture.componentInstance.clicks).toBe(1);
  }));

  it('should emit again after the delay', fakeAsync(() => {
    // GIVEN
    button.click();

    // WHEN
    tick(1000);
    button.click();

    // THEN
    expect(fixture.componentInstance.clicks).toBe(2);
  }));
});
