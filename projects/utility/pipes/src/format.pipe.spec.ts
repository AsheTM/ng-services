import { Format } from './format.pipe';


describe('Format', () => {
  const pipe = new Format();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('works properly', () => {
    const value: string = '123456789000000';
    const mask: string = '+(***) *** ****';
    const result: string = pipe.transform(value, mask);

    expect(result).toEqual('+(123) 456 7890');
  });
});
