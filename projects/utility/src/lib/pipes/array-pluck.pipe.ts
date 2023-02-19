import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'arrayPluck',
  standalone: true
})
export class ArrayPluck implements PipeTransform {

  transform(
    value: Array<Record<string | number, any>>,
    key: string | number
  ): Array<any> {
    return value.map((o: Record<string | number, any>) => o[key]).filter(Boolean);
  }

}
