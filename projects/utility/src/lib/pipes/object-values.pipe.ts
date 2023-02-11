import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'objectValues',
  standalone: true
})
export class ObjectValues implements PipeTransform {

  transform(value: Record<string | number, any>): any[] {
    return Object.values(value);
  }

}
