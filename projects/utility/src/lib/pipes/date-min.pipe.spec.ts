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
    const result: Date = pipe.transform(value);

    expect(result.getTime()).toEqual(dateMin);
  });
});
