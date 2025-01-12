import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'arrayFill',
  standalone: true
})
export class ArrayFill implements PipeTransform {

  transform<T>(list: unknown[], value: T): T[] {
    return list.fill(value) as T[];
  }

}
