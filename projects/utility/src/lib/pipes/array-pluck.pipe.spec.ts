import { ArrayPluck } from './array-pluck.pipe';

describe('SharedArrayPluckPipe', () => {
  const pipe = new ArrayPluck();
  const inputArray: Array<Record<string | number, any>>
    = [
      { a: 1, b: true },
      { a: 2 },
      { a: 3 },
      { a: 4, c: 'Test' },
    ];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter array properly', () => {
    const expectedArray: any[] = pipe.transform(inputArray, 'b');

    expect(expectedArray).toHaveSize(1);
    expect(expectedArray[0]).toEqual(true);
  });
});
