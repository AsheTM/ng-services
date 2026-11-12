import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'capitalCase',
  standalone: true
})
export class CapitalCase implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    return value[0].toUpperCase() + value.slice(1).toLowerCase();
  }

}
