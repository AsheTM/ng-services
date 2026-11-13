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

    for(const charater of mask) {
      if(charater === this.PLACEHOLDER_CHARACTER) {
        result += stringifiedValue[valueIndex] || '';
        valueIndex++;
      } else {
        result += charater;
      }
    }

    return result;
  }

}
