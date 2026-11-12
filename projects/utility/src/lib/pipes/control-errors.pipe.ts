import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';


/**
 * Impure, so it follows the control's errors: the messages are cached until the errors change.
 */
@Pipe({
  name: 'controlErrors',
  standalone: true,
  pure: false
})
export class ControlErrors implements PipeTransform {

  private _cache?: { errors: ValidationErrors | null, messages: (string | any)[] };

  transform({ errors }: AbstractControl): (string | any)[] {
    if (this._cache && this._cache.errors === errors) {
      return this._cache.messages;
    }

    const errorsControl:  ValidationErrors  = errors || {};
    let messages:         string[]          = [];

    for (const key in errorsControl) {
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
