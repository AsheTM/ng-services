import { Pipe, PipeTransform } from '@angular/core';


/**
 * Same rule as `coerceBooleanProperty` of `@angular/cdk`: everything is `true` except `null`, `undefined`, `false` and `'false'`.
 */
@Pipe({
  name: 'coerciveBoolean',
  standalone: true
})
export class CoerciveBoolean implements PipeTransform {

  transform(value?: any): boolean {
    return value != null && `${value}` !== 'false';
  }

}
