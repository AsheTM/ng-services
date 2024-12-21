import { ArrayPop } from './array-pop.pipe';


describe('ArrayPop', () => {
  const pipe = new ArrayPop();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the last item from the array', () => {
    const value: number = 10;
    const list: number[] = [1, 5, value];
    const item: number = pipe.transform(list);

    expect(item).toBe(value);
  });

  it('should return undefined', () => {
    const item: undefined = pipe.transform([]);

    expect(item).toBeUndefined();
  });
});
