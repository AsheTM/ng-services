import { DefaultValue } from './default-value.pipe';


describe('DefaultValue', () => {
  const pipe = new DefaultValue();

  it('should return the fallback for null, undefined or an empty string', () => {
    // GIVEN
    const values: (string | null | undefined)[] = [null, undefined, ''];

    // WHEN
    const results: string[] = values.map((value: string | null | undefined) => pipe.transform(value, '—'));

    // THEN
    expect(results).toEqual(['—', '—', '—']);
  });

  it('should keep other values, including 0 and false', () => {
    // GIVEN
    const values: (string | number | boolean)[] = ['John', 0, false];

    // WHEN
    const results: (string | number | boolean)[] = values.map((value: string | number | boolean) => pipe.transform(value, '—'));

    // THEN
    expect(results).toEqual(['John', 0, false]);
  });
});
