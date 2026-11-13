import { CoerciveBoolean } from './coercive-boolean.pipe';


describe('CoerciveBoolean', () => {
  const pipe = new CoerciveBoolean();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('works properly', () => {
    const result: boolean = pipe.transform(true);

    expect(result).toBeTrue();
  });

  it('won\'t work properly', () => {
    const result: boolean = pipe.transform('false');

    expect(result).toBeFalse();
  });

  it('should follow the coerceBooleanProperty rule of @angular/cdk', () => {
    // GIVEN
    const values: any[] = [undefined, null, false, 'false', '', 'true', 0, 'anything', {}];

    // WHEN
    const result: boolean[] = values.map((value: any) => pipe.transform(value));

    // THEN
    expect(result).toEqual([false, false, false, false, true, true, true, true, true]);
  });
});
