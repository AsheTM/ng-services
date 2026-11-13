import { DateMax } from './date-max.pipe';


describe('DateMax', () => {
  const pipe = new DateMax();
  const now: number = Date.now();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('works properly', () => {
    const dateMax: number = now + 60_000;
    const value: number[] = [now, now - 60_000, dateMax];
    const result: Date | null = pipe.transform(value);

    expect(result?.getTime()).toEqual(dateMax);
  });

  it('should return null for an empty list', () => {
    // GIVEN
    const value: number[] = [];

    // WHEN
    const result: Date | null = pipe.transform(value);

    // THEN
    expect(result).toBeNull();
  });
});
