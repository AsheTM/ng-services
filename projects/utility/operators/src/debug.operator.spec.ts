import { NEVER, of, throwError } from 'rxjs';

import { debug } from './debug.operator';


describe('debug', () => {
  it('should log subscribe, each value and complete, and let the values through', () => {
    // GIVEN
    const log: jasmine.Spy = spyOn(console, 'log');
    const values: number[] = [];

    // WHEN
    of(1, 2).pipe(debug<number>('numbers', { enabled: true })).subscribe((value: number) => values.push(value));

    // THEN
    expect(values).toEqual([1, 2]);
    expect(log.calls.allArgs()).toEqual([
      ['[numbers] subscribe'],
      ['[numbers] next:', 1],
      ['[numbers] next:', 2],
      ['[numbers] complete']
    ]);
  });

  it('should log errors with console.error', () => {
    // GIVEN
    spyOn(console, 'log');
    const error: jasmine.Spy = spyOn(console, 'error');

    // WHEN
    throwError('failed').pipe(debug('request', { enabled: true })).subscribe({ error: () => undefined });

    // THEN
    expect(error).toHaveBeenCalledOnceWith('[request] error:', 'failed');
  });

  it('should log unsubscribe only when stopped early', () => {
    // GIVEN
    const log: jasmine.Spy = spyOn(console, 'log');

    // WHEN
    NEVER.pipe(debug('never', { enabled: true })).subscribe().unsubscribe();
    of(1).pipe(debug('done', { enabled: true })).subscribe().unsubscribe();

    // THEN
    expect(log).toHaveBeenCalledWith('[never] unsubscribe');
    expect(log).not.toHaveBeenCalledWith('[done] unsubscribe');
  });

  it('should use the given level and events', () => {
    // GIVEN
    const info: jasmine.Spy = spyOn(console, 'info');

    // WHEN
    of(1).pipe(debug<number>('numbers', { enabled: true, level: 'info', events: ['next'] })).subscribe();

    // THEN
    expect(info.calls.allArgs()).toEqual([['[numbers] next:', 1]]);
  });

  it('should log nothing when disabled', () => {
    // GIVEN
    const log: jasmine.Spy = spyOn(console, 'log');

    // WHEN
    of(1).pipe(debug<number>('numbers', { enabled: false })).subscribe();

    // THEN
    expect(log).not.toHaveBeenCalled();
  });
});
