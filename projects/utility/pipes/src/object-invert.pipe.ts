import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'objectInvert',
  standalone: true
})
export class ObjectInvert implements PipeTransform {

  /**
   * Swaps keys and values (values become string keys); with duplicate values, the last key wins
   */
  transform(value: Record<string, string | number | boolean> | null | undefined): Record<string, string> {
    const result: Record<string, string> = {};

    Object.keys(value ?? {}).forEach((key: string) => {
      result[String((value as Record<string, string | number | boolean>)[key])] = key;
    });

    return result;
  }

}
