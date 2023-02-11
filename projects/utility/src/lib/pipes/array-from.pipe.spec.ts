import { ArrayFrom } from './array-from.pipe';


describe('ArrayFrom', () => {
  const pipe = new ArrayFrom();
  const length: number = 10;

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should create array properly', () => {
    const array: Array<number> = pipe.transform(length);
    const isFilled: boolean = array.every((n: number, i: number) => n === i);

    expect(array).toHaveSize(length);
    expect(isFilled).toBeTruthy();
  });

  it('should create array and filled properly', () => {
    const fill: number = 1;
    const array: Array<number> = pipe.transform(length, fill);
    const isFilled: boolean = array.every((n: number) => n === fill);

    expect(array).toHaveSize(length);
    expect(isFilled).toBeTruthy();
  });
});
