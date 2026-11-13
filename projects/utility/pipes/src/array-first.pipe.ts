import { Pipe, PipeTransform } from '@angular/core';
import { Maybe } from '@ashetm/types';


@Pipe({
  name: 'arrayFirst',
  standalone: true
})
export class ArrayFirst implements PipeTransform {

  transform<T>(list: Maybe<T[]>): T | undefined {
    return list?.[0];
  }

}
