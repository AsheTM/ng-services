import { Initial } from './initial.pipe';


describe('InitialPipe', () => {
  const pipe = new Initial();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('works properly', () => {
    const text: string = 'test lorum';
    const result: string = pipe.transform(text);
    const expectedResult: string = 'TL';

    expect(result).toEqual(expectedResult);
  });

  it('should ignore repeated and surrounding spaces', () => {
    // GIVEN
    const value: string = ' john   doe ';

    // WHEN
    const result: string = pipe.transform(value);

    // THEN
    expect(result).toBe('JD');
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
