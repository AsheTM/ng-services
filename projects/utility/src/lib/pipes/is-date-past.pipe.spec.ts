import { IsDatePast } from './is-date-past.pipe';


describe('IsDatePast', () => {
  const pipe = new IsDatePast();
  const oneDay: number = 24 * 60 * 60 * 1000;

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be a past date', () => {
    const date: number = Date.now() - oneDay;
    const result: boolean = pipe.transform(date);

    expect(result).toBeTrue();
  });

  it('should not be a past date', () => {
    const date: number = Date.now() + oneDay;
    const result: boolean = pipe.transform(date);

    expect(result).toBeFalse();
  });
});
