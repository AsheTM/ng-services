import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'log',
  standalone: true
})
export class Log implements PipeTransform {

  transform<T>(value: T): T;
  transform<T>(value: T, type: 'log' | 'info' | 'warn' | 'error'): T;
  transform<T>(value: T, type: 'log' | 'info' | 'warn' | 'error' = 'log'): T {
    console[type](value);

    return value;
  }

}
