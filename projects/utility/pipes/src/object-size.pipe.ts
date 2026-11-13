import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'objectSize',
  standalone: true
})
export class ObjectSize implements PipeTransform {

  transform(value: object | null | undefined): number {
    return value ? Object.keys(value).length : 0;
  }

}
