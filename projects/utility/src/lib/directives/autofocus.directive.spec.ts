import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutofocusDirective } from './autofocus.directive';


@Component({
  standalone: true,
  imports: [AutofocusDirective],
  template: `
    <input id="focused" ashetmAutofocus>
    <input id="disabled" [ashetmAutofocus]="false">
  `
})
class HostComponent { }

describe('AutofocusDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  afterEach(() => fixture.destroy());

  it('should focus the element', () => {
    // GIVEN
    fixture = TestBed.createComponent(HostComponent);
    document.body.appendChild(fixture.nativeElement);

    // WHEN
    fixture.detectChanges();

    // THEN
    expect(document.activeElement?.id).toBe('focused');
  });

  it('should not focus when disabled', () => {
    // GIVEN
    fixture = TestBed.createComponent(HostComponent);
    const disabled: HTMLInputElement = fixture.nativeElement.querySelector('#disabled');
    const focus: jasmine.Spy = spyOn(disabled, 'focus');

    // WHEN
    fixture.detectChanges();

    // THEN
    expect(focus).not.toHaveBeenCalled();
  });
});
