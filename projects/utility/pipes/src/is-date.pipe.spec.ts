import { IsDate } from './is-date.pipe';


describe('IsDate', () => {
  const pipe = new IsDate();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('works properly', () => {
    const date: number = Date.now();
    const result: boolean = pipe.transform(date);

    expect(result).toBeTrue();
  });

  it('won\'t work properly', () => {
    const result: boolean = pipe.transform('Invalid Date');

    expect(result).toBeFalse();
  });

  it('should accept 0, the 1st of January 1970', () => {
    // GIVEN
    const value: number = 0;

    // WHEN
    const result: boolean = pipe.transform(value);

    // THEN
    expect(result).toBeTrue();
  });

  it('should return false, not the value, for an empty value', () => {
    // GIVEN
    const values: (string | null | undefined)[] = ['', null, undefined];

    // WHEN
    const results: boolean[] = values.map((value: string | null | undefined) => pipe.transform(value as string));

    // THEN
    expect(results).toEqual([false, false, false]);
  });
});
