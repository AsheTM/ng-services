import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'arrayFrom',
  standalone: true
})
export class ArrayFrom implements PipeTransform {

  transform(length: number): number[];
  transform<T>(length: number, fill: T): T[];
  transform<T>(length: number, fill?: T): (number | T)[] {
    return Array.from({ length }, (_, i: number) => fill ?? i);
  }

}
