import { InjectionToken, Provider } from '@angular/core';


/**
 * A message for one error key: a text, or a function receiving the error details (e.g. `{ requiredLength, actualLength }`)
 */
export type ControlErrorMessage = string | ((error: any, key: string) => string);

/**
 * Messages by error key (`required`, `minlength`, a custom validator's key...)
 */
export type ControlErrorsMessages = Record<string, ControlErrorMessage>;

export const CONTROL_ERRORS_MESSAGES: InjectionToken<ControlErrorsMessages>
  = new InjectionToken<ControlErrorsMessages>('CONTROL_ERRORS_MESSAGES');

/**
 * English messages for Angular's built-in validators
 */
export const DEFAULT_CONTROL_ERRORS_MESSAGES: ControlErrorsMessages = {
  required: 'This field is required',
  requiredTrue: 'This field must be checked',
  email: 'Please enter a valid email address',
  minlength: (error: { requiredLength: number }) => `Please enter at least ${error.requiredLength} characters`,
  maxlength: (error: { requiredLength: number }) => `Please enter at most ${error.requiredLength} characters`,
  min: (error: { min: number }) => `The value must be at least ${error.min}`,
  max: (error: { max: number }) => `The value must be at most ${error.max}`,
  pattern: 'The value has an invalid format'
};

/**
 * Messages used by the `controlErrors` pipe: the English defaults, overridden / completed by `messages`.
 * Without this provider, `controlErrors` keeps its original behavior.
 */
export function provideControlErrorsMessages(messages: ControlErrorsMessages = {}): Provider {
  return {
    provide: CONTROL_ERRORS_MESSAGES,
    useValue: { ...DEFAULT_CONTROL_ERRORS_MESSAGES, ...messages }
  };
}
