import { IsDateAfter } from './is-date-after.pipe';


describe('IsDateAfter', () => {
  const pipe = new IsDateAfter();
  const oneDay: number = 24 * 60 * 60 * 1000;

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be after a date', () => {
    const date: number = Date.now() + oneDay;
    const comparedDate: number = Date.now();
    const result: boolean = pipe.transform(date, comparedDate);

    expect(result).toBeTrue();
  });

  it('should not be after a date', () => {
    const date: number = Date.now() - oneDay;
    const comparedDate: number = Date.now() + 2 * oneDay;
    const result: boolean = pipe.transform(date, comparedDate);

    expect(result).toBeFalse();
  });
});
