import { Slugify } from './slugify.pipe';


describe('Slugify', () => {
  const pipe = new Slugify();

  it('should turn a text into a slug', () => {
    // GIVEN
    const value: string = '  Hello, World!  ';

    // WHEN
    const result: string = pipe.transform(value);

    // THEN
    expect(result).toBe('hello-world');
  });

  it('should remove accents', () => {
    // GIVEN
    const value: string = 'Crème brûlée à Paris';

    // WHEN
    const result: string = pipe.transform(value);

    // THEN
    expect(result).toBe('creme-brulee-a-paris');
  });

  it('should return an empty string for null or undefined', () => {
    // GIVEN
    // WHEN
    const results: string[] = [pipe.transform(null), pipe.transform(undefined)];

    // THEN
    expect(results).toEqual(['', '']);
  });
});
