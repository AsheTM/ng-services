import { ObjectKeys } from './object-keys.pipe';


describe('ObjectKeys', () => {
  const pipe = new ObjectKeys();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('works properly', () => {
    const obj: Record<string, string | number> = {
      a: 'a',
      b: 1
    };
    const result: string[] = pipe.transform(obj);
    const expectedResult: string[] = ['a', 'b'];

    expect(result).toEqual(expectedResult);
  });
});
