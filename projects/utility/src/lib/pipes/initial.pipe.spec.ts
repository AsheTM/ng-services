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
});
