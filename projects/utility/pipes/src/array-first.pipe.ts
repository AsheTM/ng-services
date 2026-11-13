import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'arrayFirst',
  standalone: true
})
export class ArrayFirst implements PipeTransform {

  transform<T>(list: T[] | null | undefined): T | undefined {
    return list?.[0];
  }

}
