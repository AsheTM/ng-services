import { FileSize } from './file-size.pipe';


describe('FileSize', () => {
  const pipe = new FileSize('en-US');

  it('should make a size in bytes readable', () => {
    // GIVEN
    const sizes: number[] = [0, 500, 1024, 1536, 5 * 1024 * 1024, 1.25 * 1024 * 1024 * 1024];

    // WHEN
    const results: string[] = sizes.map((size: number) => pipe.transform(size));

    // THEN
    expect(results).toEqual(['0 B', '500 B', '1 KB', '1.5 KB', '5 MB', '1.3 GB']);
  });

  it('should use the given number of decimals and locale', () => {
    // GIVEN
    const size: number = 1.25 * 1024 * 1024 * 1024;

    // WHEN
    const results: string[] = [pipe.transform(size, 2), pipe.transform(size, 2, 'fr')];

    // THEN
    expect(results).toEqual(['1.25 GB', '1,25 GB']);
  });

  it('should return an empty string for null, undefined, negative or invalid sizes', () => {
    // GIVEN
    // WHEN
    const results: string[] = [pipe.transform(null), pipe.transform(undefined), pipe.transform(-1), pipe.transform(NaN)];

    // THEN
    expect(results).toEqual(['', '', '', '']);
  });
});
