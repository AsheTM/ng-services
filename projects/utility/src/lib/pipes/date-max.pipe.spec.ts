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
    const result: Date = pipe.transform(value);

    expect(result.getTime()).toEqual(dateMax);
  });
});
