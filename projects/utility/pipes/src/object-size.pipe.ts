import { Pipe, PipeTransform } from '@angular/core';
import { Maybe } from '@ashetm/types';


@Pipe({
  name: 'objectSize',
  standalone: true
})
export class ObjectSize implements PipeTransform {

  transform(value: Maybe<object>): number {
    return value ? Object.keys(value).length : 0;
  }

}
