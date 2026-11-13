import { ObjectValues } from './object-values.pipe';


describe('ObjectValues', () => {
  const pipe = new ObjectValues();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('works properly', () => {
    const obj: Record<string, string | number> = {
      a: 'a',
      b: 1
    };
    const result: (string | number)[] = pipe.transform(obj);
    const expectedResult: (string | number)[] = ['a', 1];

    expect(result).toEqual(expectedResult);
  });
});
