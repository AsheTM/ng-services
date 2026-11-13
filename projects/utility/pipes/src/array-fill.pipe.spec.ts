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

  it('should not modify the list', () => {
    // GIVEN
    const list: number[] = [1, 2, 3];

    // WHEN
    const filledList: number[] = pipe.transform(list, 0);

    // THEN
    expect(filledList).toEqual([0, 0, 0]);
    expect(list).toEqual([1, 2, 3]);
  });
});
