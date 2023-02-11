import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'coerciveBoolean',
  standalone: true
})
export class CoerciveBoolean implements PipeTransform {

  transform(value?: any): boolean {
    return coerceBooleanProperty(value);
  }

}
