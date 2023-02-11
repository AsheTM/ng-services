import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'capitalCase',
  standalone: true
})
export class CapitalCase implements PipeTransform {

  transform(value: string): string {
    return value[0].toUpperCase() + value.substr(1).toLowerCase();
  }

}
