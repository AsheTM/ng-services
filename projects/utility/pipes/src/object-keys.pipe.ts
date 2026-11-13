import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'objectKeys',
  standalone: true
})
export class ObjectKeys implements PipeTransform {

  transform(value: Record<string | number, any>): string[] {
    return Object.keys(value);
  }

}
