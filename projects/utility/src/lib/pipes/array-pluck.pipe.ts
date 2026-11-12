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
    // Missing values are removed, falsy ones (`0`, `''`, `false`) are kept
    return value.map((o: Record<string | number, any>) => o[key])
      .filter((item: any) => item !== undefined && item !== null);
  }

}
