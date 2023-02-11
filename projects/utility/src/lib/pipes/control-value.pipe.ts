import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';


@Pipe({
  name: 'controlValue',
  standalone: true
})
export class ControlValue implements PipeTransform {

  transform(value: AbstractControl): any {
    return value?.getRawValue();
  }

}
