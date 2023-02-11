import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'arrayFilter',
  standalone: true
})
export class ArrayFilter<T extends string | number | boolean> implements PipeTransform {

  transform(value: T[], filterBy: string | number | boolean): (string | number | boolean)[] {
    return value.filter((val: T) => {
      const stringVal: string = String(val);

      return !filterBy || stringVal.includes(String(filterBy));
    });
  }

}
