import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { TrimOnBlurDirective } from './trim-on-blur.directive';


@Component({
  standalone: true,
  imports: [ReactiveFormsModule, TrimOnBlurDirective],
  template: `
    <input id="plain" ashetmTrimOnBlur>
    <input id="reactive" ashetmTrimOnBlur [formControl]="name">
    <input id="on-blur" ashetmTrimOnBlur [formControl]="nameOnBlur">
  `
})
class HostComponent {
  name: FormControl<string | null> = new FormControl('');
  nameOnBlur: FormControl<string | null> = new FormControl('', { updateOn: 'blur' });
}

describe('TrimOnBlurDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  function typeAndLeave(id: string, text: string): HTMLInputElement {
    const input: HTMLInputElement = fixture.nativeElement.querySelector(`#${id}`);

    input.value = text;
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));

    return input;
  }

  it('should trim a plain input', () => {
    // GIVEN
    // WHEN
    const input: HTMLInputElement = typeAndLeave('plain', '  John  ');

    // THEN
    expect(input.value).toBe('John');
  });

  it('should trim the value of a reactive form control', () => {
    // GIVEN
    // WHEN
    typeAndLeave('reactive', '  John  ');

    // THEN
    expect(fixture.componentInstance.name.value).toBe('John');
  });

  it('should trim the value of a form control updated on blur', () => {
    // GIVEN
    // WHEN
    typeAndLeave('on-blur', '  John  ');

    // THEN
    expect(fixture.componentInstance.nameOnBlur.value).toBe('John');
  });
});
