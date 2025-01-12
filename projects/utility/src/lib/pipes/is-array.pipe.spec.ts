import { IsArray } from './is-array.pipe';


describe('IsArray', () => {
  const pipe = new IsArray();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be an array', () => {
    const list: unknown[] = [1, 2];
    const result: boolean = pipe.transform(list);

    expect(result).toBeTrue();
  });

  it('should not be an array', () => {
    const list: unknown = 1;
    const result: boolean = pipe.transform(list);

    expect(result).toBeFalse();
  });
});
