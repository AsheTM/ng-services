import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';


@Pipe({
  name: 'controlErrors',
  standalone: true
})
export class ControlErrors implements PipeTransform {

  transform({ errors }: AbstractControl): (string | any)[] {
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

    return messages;
  }

}
