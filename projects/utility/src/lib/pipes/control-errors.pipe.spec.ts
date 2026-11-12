import { AsyncPipe, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { ControlErrors } from './control-errors.pipe';
import { DEFAULT_CONTROL_ERRORS_MESSAGES, provideControlErrorsMessages } from './control-errors.messages';


function latest<T>(source$: Observable<T>): { value: T | undefined, unsubscribe: () => void } {
  const result: { value: T | undefined, unsubscribe: () => void } = { value: undefined, unsubscribe: () => undefined };
  const subscription = source$.subscribe((value: T) => result.value = value);

  result.unsubscribe = () => subscription.unsubscribe();

  return result;
}

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
    const result = latest(pipe.transform(formControl));

    expect(result.value).toHaveSize(1);
    result.unsubscribe();
  });

  it('should be pure', () => {
    // GIVEN
    // WHEN
    const pure: boolean = (ControlErrors as unknown as { ɵpipe: { pure: boolean } }).ɵpipe.pure;

    // THEN
    expect(pure).toBeTrue();
  });

  it('should emit new messages when the errors change', () => {
    // GIVEN
    const errorsPipe: ControlErrors = new ControlErrors();
    const formControl: FormControl = new FormControl('', { validators: [Validators.required] });
    const result = latest(errorsPipe.transform(formControl));
    const before: (string | any)[] | undefined = result.value;

    // WHEN
    formControl.setValue('Test');

    // THEN
    expect(before).toEqual(['This field is required']);
    expect(result.value).toEqual([]);
    result.unsubscribe();
  });

  it('should emit new messages when the errors are set by hand', () => {
    // GIVEN
    const errorsPipe: ControlErrors = new ControlErrors();
    const formControl: FormControl = new FormControl('Test');
    const result = latest(errorsPipe.transform(formControl));

    // WHEN
    formControl.setErrors({ server: 'Already taken' });

    // THEN
    expect(result.value).toEqual(['Already taken']);
    result.unsubscribe();
  });

  it('should emit no messages without a control', () => {
    // GIVEN
    // WHEN
    const result = latest(pipe.transform(null));

    // THEN
    expect(result.value).toEqual([]);
  });

  it('should keep its original messages without provided messages', () => {
    // GIVEN
    const errorsPipe: ControlErrors = new ControlErrors();
    const formControl: FormControl = new FormControl('ab', { validators: [Validators.minLength(3)] });

    // WHEN
    const result = latest(errorsPipe.transform(formControl));

    // THEN
    expect(result.value).toEqual([{ requiredLength: 3, actualLength: 2 }]);
    result.unsubscribe();
  });

  it('should use the default messages for the built-in validators', () => {
    // GIVEN
    const errorsPipe: ControlErrors = new ControlErrors(DEFAULT_CONTROL_ERRORS_MESSAGES);
    const formControl: FormControl = new FormControl('ab', { validators: [Validators.minLength(3), Validators.email] });

    // WHEN
    const result = latest(errorsPipe.transform(formControl));

    // THEN
    expect(result.value).toEqual(['Please enter at least 3 characters', 'Please enter a valid email address']);
    result.unsubscribe();
  });

  it('should keep the original behavior for keys without a message', () => {
    // GIVEN
    const errorsPipe: ControlErrors = new ControlErrors(DEFAULT_CONTROL_ERRORS_MESSAGES);
    const formControl: FormControl = new FormControl(null, { validators: [() => ({ custom: 'Custom message' })] });

    // WHEN
    const result = latest(errorsPipe.transform(formControl));

    // THEN
    expect(result.value).toEqual(['Custom message']);
    result.unsubscribe();
  });
});

@Component({
  standalone: true,
  imports: [AsyncPipe, ControlErrors, NgForOf, ReactiveFormsModule],
  providers: [
    provideControlErrorsMessages({
      required: 'Ce champ est obligatoire',
      minlength: (error: { requiredLength: number }) => `Au moins ${error.requiredLength} caractères`
    })
  ],
  template: `<span *ngFor="let message of name | controlErrors | async" class="error">{{ message }}</span>`
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
