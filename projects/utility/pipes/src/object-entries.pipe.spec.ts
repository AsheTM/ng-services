import { ObjectEntries } from './object-entries.pipe';


describe('ObjectEntries', () => {
  const pipe = new ObjectEntries();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('works properly', () => {
    const obj: Record<string | number, string | number> = {
      a: 'a',
      b: 1
    };
    const result: [string | number, string | number][] = pipe.transform(obj);
    const expectedResult: [string | number, string | number][] = [
      ['a', 'a'],
      ['b', 1]
    ];

    expect(result).toEqual(expectedResult);
  });
});
