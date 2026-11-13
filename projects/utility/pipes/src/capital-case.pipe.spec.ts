import { CapitalCase } from './capital-case.pipe';


describe('CapitalCase', () => {
  const pipe = new CapitalCase();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('works properly', () => {
    const text: string = 'test';
    const result: string = pipe.transform(text);
    const expectedResult: string = 'Test';

    expect(result).toEqual(expectedResult);
  });

  it('should return an empty string for an empty string', () => {
    // GIVEN
    const value: string = '';

    // WHEN
    const result: string = pipe.transform(value);

    // THEN
    expect(result).toBe('');
  });
});
