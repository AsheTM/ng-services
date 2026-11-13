import { Signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';

import { provideControlErrorsMessages } from './control-errors.messages';
import { controlErrorsSignal } from './control-errors.signal';


describe('controlErrorsSignal', () => {
  it('should follow the errors of the control', () => {
    // GIVEN
    const control = new FormControl('', { validators: [Validators.required] });
    const errors: Signal<(string | any)[]> = TestBed.runInInjectionContext(() => controlErrorsSignal(control));
    const before: (string | any)[] = errors();

    // WHEN
    control.setValue('Test');

    // THEN
    expect(before).toEqual(['This field is required']);
    expect(errors()).toEqual([]);
  });

  it('should use the provided messages', () => {
    // GIVEN
    TestBed.configureTestingModule({ providers: [provideControlErrorsMessages({ required: 'Ce champ est obligatoire' })] });
    const control = new FormControl('', { validators: [Validators.required] });

    // WHEN
    const errors: Signal<(string | any)[]> = TestBed.runInInjectionContext(() => controlErrorsSignal(control));

    // THEN
    expect(errors()).toEqual(['Ce champ est obligatoire']);
  });
});
