import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';


/**
 * Impure, so it follows the control's value: the raw value is cached until the value changes.
 */
@Pipe({
  name: 'controlValue',
  standalone: true,
  pure: false
})
export class ControlValue implements PipeTransform {

  private _cache?: { control: AbstractControl, value: any, rawValue: any };

  transform(value: AbstractControl): any {
    // No control (e.g. not created yet)
    if (!value) {
      return undefined;
    }

    if (this._cache && this._cache.control === value && this._cache.value === value.value) {
      return this._cache.rawValue;
    }

    const rawValue: any = value.getRawValue();

    this._cache = { control: value, value: value.value, rawValue };

    return rawValue;
  }

}
