import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'arrayFrom',
  standalone: true
})
export class ArrayFrom implements PipeTransform {

  transform(length: number, fill?: number): number[] {
    return Array.from({ length }, (_, i: number) => fill || i);
  }

}
