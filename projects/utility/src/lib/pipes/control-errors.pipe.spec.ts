import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { ControlErrors } from './control-errors.pipe';
import { DEFAULT_CONTROL_ERRORS_MESSAGES, provideControlErrorsMessages } from './control-errors.messages';


describe('ControlErrors', () => {
  const pipe = new ControlErrors();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('works properly', () => {
    const value: undefined = undefined;
    const formControl: FormControl = new FormControl(value, {
      validators: [Validators.required]
    });
    const result: (string | any)[] = pipe.transform(formControl);

    expect(result).toHaveSize(1);
  });

  it('should be impure, to follow the control', () => {
    // GIVEN
    // WHEN
    const pure: boolean = (ControlErrors as unknown as { ɵpipe: { pure: boolean } }).ɵpipe.pure;

    // THEN
    expect(pure).toBeFalse();
  });

  it('should update when the errors change', () => {
    // GIVEN
    const errorsPipe: ControlErrors = new ControlErrors();
    const formControl: FormControl = new FormControl('', { validators: [Validators.required] });
    const before: (string | any)[] = errorsPipe.transform(formControl);

    // WHEN
    formControl.setValue('Test');
    const after: (string | any)[] = errorsPipe.transform(formControl);

    // THEN
    expect(before).toEqual(['This field is required']);
    expect(after).toEqual([]);
  });

  it('should return the same messages while the errors don\'t change', () => {
    // GIVEN
    const errorsPipe: ControlErrors = new ControlErrors();
    const formControl: FormControl = new FormControl('', { validators: [Validators.required] });

    // WHEN
    const first: (string | any)[] = errorsPipe.transform(formControl);
    const second: (string | any)[] = errorsPipe.transform(formControl);

    // THEN
    expect(second).toBe(first);
  });

  it('should keep its original messages without provided messages', () => {
    // GIVEN
    const errorsPipe: ControlErrors = new ControlErrors();
    const formControl: FormControl = new FormControl('ab', { validators: [Validators.minLength(3)] });

    // WHEN
    const result: (string | any)[] = errorsPipe.transform(formControl);

    // THEN
    expect(result).toEqual([{ requiredLength: 3, actualLength: 2 }]);
  });

  it('should use the default messages for the built-in validators', () => {
    // GIVEN
    const errorsPipe: ControlErrors = new ControlErrors(DEFAULT_CONTROL_ERRORS_MESSAGES);
    const formControl: FormControl = new FormControl('ab', { validators: [Validators.minLength(3), Validators.email] });

    // WHEN
    const result: (string | any)[] = errorsPipe.transform(formControl);

    // THEN
    expect(result).toEqual(['Please enter at least 3 characters', 'Please enter a valid email address']);
  });

  it('should keep the original behavior for keys without a message', () => {
    // GIVEN
    const errorsPipe: ControlErrors = new ControlErrors(DEFAULT_CONTROL_ERRORS_MESSAGES);
    const formControl: FormControl = new FormControl(null, { validators: [() => ({ custom: 'Custom message' })] });

    // WHEN
    const result: (string | any)[] = errorsPipe.transform(formControl);

    // THEN
    expect(result).toEqual(['Custom message']);
  });
});

@Component({
  standalone: true,
  imports: [ControlErrors, NgForOf, ReactiveFormsModule],
  providers: [
    provideControlErrorsMessages({
      required: 'Ce champ est obligatoire',
      minlength: (error: { requiredLength: number }) => `Au moins ${error.requiredLength} caractères`
    })
  ],
  template: `<span *ngFor="let message of name | controlErrors" class="error">{{ message }}</span>`
})
class TranslatedFormComponent {
  name: FormControl<string | null> = new FormControl('', { validators: [Validators.required, Validators.minLength(3), Validators.email] });
}

describe('ControlErrors with provideControlErrorsMessages', () => {
  let fixture: ComponentFixture<TranslatedFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TranslatedFormComponent] });
    fixture = TestBed.createComponent(TranslatedFormComponent);
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  function messages(): string[] {
    return Array.from(fixture.nativeElement.querySelectorAll('.error')).map((element: unknown) => (element as HTMLElement).textContent ?? '');
  }

  it('should use the provided messages', () => {
    // GIVEN
    // WHEN
    const result: string[] = messages();

    // THEN
    expect(result).toEqual(['Ce champ est obligatoire']);
  });

  it('should use a message function with the error details, and the defaults for other keys', () => {
    // GIVEN
    fixture.componentInstance.name.setValue('ab');

    // WHEN
    fixture.detectChanges();

    // THEN
    expect(messages()).toEqual(['Au moins 3 caractères', 'Please enter a valid email address']);
  });
});
