import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickOutsideDirective } from './click-outside.directive';


@Component({
  standalone: true,
  imports: [ClickOutsideDirective],
  template: `
    <div id="menu" (ashetmClickOutside)="outsideClicks = outsideClicks + 1"><button id="inside">Inside</button></div>
    <button id="outside">Outside</button>
  `
})
class HostComponent {
  outsideClicks: number = 0;
}

describe('ClickOutsideDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    document.body.appendChild(fixture.nativeElement);
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('should emit when clicking outside', () => {
    // GIVEN
    const outside: HTMLButtonElement = fixture.nativeElement.querySelector('#outside');

    // WHEN
    outside.click();

    // THEN
    expect(fixture.componentInstance.outsideClicks).toBe(1);
  });

  it('should not emit when clicking inside', () => {
    // GIVEN
    const inside: HTMLButtonElement = fixture.nativeElement.querySelector('#inside');

    // WHEN
    inside.click();

    // THEN
    expect(fixture.componentInstance.outsideClicks).toBe(0);
  });
});
