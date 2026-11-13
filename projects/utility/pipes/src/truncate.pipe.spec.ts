import { Truncate } from './truncate.pipe';


describe('Truncate', () => {
  const pipe = new Truncate();

  it('should keep a text that is short enough', () => {
    // GIVEN
    const value: string = 'Hello';

    // WHEN
    const result: string = pipe.transform(value, 10);

    // THEN
    expect(result).toBe('Hello');
  });

  it('should cut a long text and add an ellipsis', () => {
    // GIVEN
    const value: string = 'Hello wonderful world';

    // WHEN
    const result: string = pipe.transform(value, 9);

    // THEN
    expect(result).toBe('Hello won…');
  });

  it('should use the given suffix', () => {
    // GIVEN
    const value: string = 'Hello wonderful world';

    // WHEN
    const result: string = pipe.transform(value, 9, '...');

    // THEN
    expect(result).toBe('Hello won...');
  });

  it('should keep whole words', () => {
    // GIVEN
    const value: string = 'Hello wonderful world';

    // WHEN
    const result: string = pipe.transform(value, 9, '…', true);

    // THEN
    expect(result).toBe('Hello…');
  });

  it('should return an empty string for null or undefined', () => {
    // GIVEN
    // WHEN
    const results: string[] = [pipe.transform(null, 5), pipe.transform(undefined, 5)];

    // THEN
    expect(results).toEqual(['', '']);
  });
});
