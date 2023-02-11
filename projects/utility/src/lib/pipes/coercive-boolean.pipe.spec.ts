import { CoerciveBoolean } from './coercive-boolean.pipe';


describe('CoerciveBoolean', () => {
  const pipe = new CoerciveBoolean();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('works properly', () => {
    const result: boolean = pipe.transform(true);

    expect(result).toBeTrue();
  });

  it('won\'t work properly', () => {
    const result: boolean = pipe.transform('false');

    expect(result).toBeFalse();
  });
});
