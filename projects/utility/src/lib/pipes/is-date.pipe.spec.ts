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
});
