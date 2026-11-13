import { DateMin } from './date-min.pipe';


describe('DateMin', () => {
  const pipe = new DateMin();
  const now: number = Date.now();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('works properly', () => {
    const dateMin: number = now - 60_000;
    const value: number[] = [now, now + 60_000, dateMin];
    const result: Date | null = pipe.transform(value);

    expect(result?.getTime()).toEqual(dateMin);
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
