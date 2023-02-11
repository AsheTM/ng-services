import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'initial',
  standalone: true
})
export class Initial implements PipeTransform {

  transform(value: string, max: number = Infinity): string {
    return value.split(' ').map((word: string) => {
      return word[0].toUpperCase();
    }).filter((_: string, index: number) => index < max)
    .join('');
  }

}
