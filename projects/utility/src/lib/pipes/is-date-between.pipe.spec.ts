import { IsDateBetween } from './is-date-between.pipe';


describe('IsDateBetween', () => {
  const pipe = new IsDateBetween();
  const oneDay: number = 24 * 60 * 60 * 1000;

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be between range of dates, with array range dates', () => {
    const date: number = Date.now();
    const range: [number, number] = [Date.now() - oneDay, Date.now() + oneDay];
    const result: boolean = pipe.transform(date, range);

    expect(result).toBeTrue();
  });

  it('should be between range of dates, with min and max dates', () => {
    const date: number = Date.now();
    const [minDate, maxDate]: [number, number] = [Date.now() - oneDay, Date.now() + oneDay];
    const result: boolean = pipe.transform(date, minDate, maxDate);

    expect(result).toBeTrue();
  });

  it('should not be between range of dates', () => {
    const date: number = Date.now();
    const [minDate, maxDate]: [number, number] = [Date.now() + oneDay, Date.now() + 2 * oneDay];
    const result: boolean = pipe.transform(date, minDate, maxDate);

    expect(result).toBeFalse();
  });
});
