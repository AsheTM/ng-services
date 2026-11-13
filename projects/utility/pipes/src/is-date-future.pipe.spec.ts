import { IsDateFuture } from './is-date-future.pipe';


describe('IsDateFuture', () => {
  const pipe = new IsDateFuture();
  const oneDay: number = 24 * 60 * 60 * 1000;

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be a future date', () => {
    const date: number = Date.now() + oneDay;
    const result: boolean = pipe.transform(date);

    expect(result).toBeTrue();
  });

  it('should not be a future date', () => {
    const date: number = Date.now() - oneDay;
    const result: boolean = pipe.transform(date);

    expect(result).toBeFalse();
  });
});
