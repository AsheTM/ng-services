import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'arrayPop',
  standalone: true
})
export class ArrayPop implements PipeTransform {

  transform<T>(list: T[]): T;
  transform(list: []): undefined;
  transform<T>(list: T[]): T | undefined {
    return list.length === 0 ? list.pop() : undefined;
  }

}
