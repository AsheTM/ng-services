import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'arrayChunk',
  standalone: true
})
export class ArrayChunk implements PipeTransform {

  /**
   * Splits the list into groups of `size` items (the last group may be smaller). A size below 1 is treated as 1.
   */
  transform<T>(list: T[] | null | undefined, size: number): T[][] {
    const chunkSize: number = Math.max(1, Math.floor(size));
    const items: T[] = list ?? [];
    const chunks: T[][] = [];

    for (let index: number = 0; index < items.length; index += chunkSize) {
      chunks.push(items.slice(index, index + chunkSize));
    }

    return chunks;
  }

}
