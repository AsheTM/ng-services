import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'objectEntries',
  standalone: true
})
export class ObjectEntries implements PipeTransform {

  transform(value: Record<string | number, any>): [string | number, any][] {
    return Object.entries(value);
  }

}
