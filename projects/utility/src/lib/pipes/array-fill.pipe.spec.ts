import { ArrayFill } from './array-fill.pipe';


describe('ArrayFill', () => {
  const pipe = new ArrayFill();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should fill array properly', () => {
    const list: boolean[] = [true, false, true];
    const value: number = 10;
    const filledList: number[] = pipe.transform(list, value);

    const isFilledCorrectly: boolean = filledList.every((item: number) => item === value);

    expect(isFilledCorrectly).toBeTrue();
  });
});
