import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'objectIsEmpty',
  standalone: true
})
export class ObjectIsEmpty implements PipeTransform {

  transform(value: object | null | undefined): boolean {
    return !value || Object.keys(value).length === 0;
  }

}
