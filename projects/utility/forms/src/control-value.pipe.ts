import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, ValueChangeEvent } from '@angular/forms';
import { Observable, defer, filter, map, of, startWith } from 'rxjs';


/**
 * Pure: returns an Observable of the raw value, which follows the control's value (use it with `| async`).
 */
@Pipe({
  name: 'controlValue',
  standalone: true
})
export class ControlValue implements PipeTransform {

  transform(control: AbstractControl | null | undefined): Observable<any> {
    // No control (e.g. not created yet)
    if (!control) {
      return of(undefined);
    }

    return defer(() => control.events.pipe(
      filter((event: unknown) => event instanceof ValueChangeEvent),
      startWith(null),
      map(() => control.getRawValue())
    ));
  }

}
