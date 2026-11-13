import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'initial',
  standalone: true
})
export class Initial implements PipeTransform {

  transform(value: string, max: number = Infinity): string {
    // Repeated spaces (or tabs, new lines) don't create empty words
    return value.split(/\s+/).filter((word: string) => word.length > 0).map((word: string) => {
      return word[0].toUpperCase();
    }).filter((_: string, index: number) => index < max)
      .join('');
  }

}
