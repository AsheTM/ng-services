import { Pipe, PipeTransform, inject } from '@angular/core';
import { AbstractControl, StatusChangeEvent, ValidationErrors } from '@angular/forms';
import { Observable, defer, filter, map, of, startWith } from 'rxjs';

import { CONTROL_ERRORS_MESSAGES, ControlErrorMessage, ControlErrorsMessages } from './control-errors.messages';


/**
 * Pure: returns an Observable of the messages, which follows the control's errors (use it with `| async`).
 * Messages come from `provideControlErrorsMessages()` when it's provided.
 */
@Pipe({
  name: 'controlErrors',
  standalone: true
})
export class ControlErrors implements PipeTransform {

  private readonly _messages: ControlErrorsMessages | null = inject(CONTROL_ERRORS_MESSAGES, { optional: true });

  transform(control: AbstractControl | null | undefined): Observable<(string | any)[]> {
    // No control (e.g. not created yet)
    if (!control) {
      return of([]);
    }

    return defer(() => control.events.pipe(
      filter((event: unknown) => event instanceof StatusChangeEvent),
      startWith(null),
      map(() => this._toMessages(control.errors))
    ));
  }

  private _toMessages(errors: ValidationErrors | null): (string | any)[] {
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

    return messages;
  }

}
