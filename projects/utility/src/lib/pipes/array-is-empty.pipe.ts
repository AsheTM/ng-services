import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'arrayIsEmpty',
  standalone: true
})
export class ArrayIsEmpty implements PipeTransform {

  transform(list: unknown[] | null | undefined): boolean {
    return !list || list.length === 0;
  }

}
