import { Inject, Optional, Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { CONTROL_ERRORS_MESSAGES, ControlErrorMessage, ControlErrorsMessages } from './control-errors.messages';


/**
 * Impure, so it follows the control's errors: the messages are cached until the errors change.
 * Messages come from `provideControlErrorsMessages()` when it's provided.
 */
@Pipe({
  name: 'controlErrors',
  standalone: true,
  pure: false
})
export class ControlErrors implements PipeTransform {

  private _cache?: { errors: ValidationErrors | null, messages: (string | any)[] };

  constructor(
    @Optional() @Inject(CONTROL_ERRORS_MESSAGES) private readonly _messages: ControlErrorsMessages | null = null
  ) { }

  transform({ errors }: AbstractControl): (string | any)[] {
    if (this._cache && this._cache.errors === errors) {
      return this._cache.messages;
    }

    const errorsControl:  ValidationErrors  = errors || {};
    let messages:         string[]          = [];

    for (const key in errorsControl) {
      const configured: ControlErrorMessage | undefined = this._messages?.[key];

      if (configured !== undefined) {
        messages = [...messages, typeof configured === 'function' ? configured(errorsControl[key], key) : configured];
        continue;
      }

      switch(true) {
        case key === 'required':
          messages = [...messages, 'This field is required'];
          break;
        case typeof errorsControl[key] === 'string':
        default:
          messages = [...messages, errorsControl[key]];
      }
    }

    this._cache = { errors, messages };

    return messages;
  }

}
