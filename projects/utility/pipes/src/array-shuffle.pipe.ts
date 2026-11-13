import { Pipe, type PipeTransform } from '@angular/core';


@Pipe({
  name: 'arrayShuffle',
  standalone: true,
})
export class ArrayShuffle implements PipeTransform {

  transform<T>(list: T[]): T[] {
    // Shuffles a copy, the list itself is left untouched
    const array: T[] = [...list];
    let currentIndex: number = array.length, randomIndex, tempValue;

    while( currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      tempValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = tempValue;
    }

    return array;
  }

}
