import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'format',
  standalone: true
})
export class Format implements PipeTransform {

  private readonly PLACEHOLDER_CHARACTER: '*' = '*' as const;

  transform<T extends string | number | boolean>(value: T, mask: string): string {
    const stringifiedValue: string = String(value);
    let valueIndex: number = 0;
    let result: string = '';

    for(let i: number = 0; i < mask.length; i++) {
      const charater: string = mask[i];

      if(charater === this.PLACEHOLDER_CHARACTER) {
        result += stringifiedValue[valueIndex] || '';
        valueIndex++;
      } else {
        result += mask[i];
      }
    }

    return result;
  }

}
