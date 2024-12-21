import { ArrayIncludes } from './array-includes.pipe';


describe('ArrayIncludes', () => {
  const pipe = new ArrayIncludes();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should check if the value is included in array properly', () => {
    const list: number[] = [1, 5, 10];
    const value: number = 10;
    const isIncluded: boolean = pipe.transform(list, value);

    expect(isIncluded).toBeTrue();
  });

  it('should check if the value is not included in array properly', () => {
    const list: number[] = [1, 5, 10];
    const value: number = 100;
    const isIncluded: boolean = pipe.transform(list, value);

    expect(isIncluded).toBeTrue();
  });
});
