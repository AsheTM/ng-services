import { Pipe, PipeTransform } from '@angular/core';
import { Maybe } from '@ashetm/types';


@Pipe({
  name: 'objectIsEmpty',
  standalone: true
})
export class ObjectIsEmpty implements PipeTransform {

  transform(value: Maybe<object>): boolean {
    return !value || Object.keys(value).length === 0;
  }

}
