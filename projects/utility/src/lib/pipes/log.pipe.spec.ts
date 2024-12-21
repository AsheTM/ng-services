import { Log } from './log.pipe';


describe('Log', () => {
  const pipe = new Log();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return initial value', () => {
    const item: object = { a: true };
    const expectedItem: object = pipe.transform(item);

    expect(expectedItem).toBe(item);
  });
});
