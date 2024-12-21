import { IsDateBefore } from './is-date-before.pipe';


describe('IsDateBefore', () => {
  const pipe = new IsDateBefore();
  const oneDay: number = 24 * 60 * 60 * 1000;

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be before a date', () => {
    const date: number = Date.now();
    const comparedDate: number = Date.now() + oneDay;
    const result: boolean = pipe.transform(date, comparedDate);

    expect(result).toBeTrue();
  });

  it('should not be after a date', () => {
    const date: number = Date.now() + oneDay;
    const comparedDate: number = Date.now() - 2 * oneDay;
    const result: boolean = pipe.transform(date, comparedDate);

    expect(result).toBeFalse();
  });
});
