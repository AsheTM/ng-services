import { FormControl } from '@angular/forms';

import { ControlValue } from './control-value.pipe';


describe('ControlValue', () => {
  const pipe = new ControlValue();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('works properly', () => {
    const value: string = 'Test';
    const formControl: FormControl = new FormControl(value);
    const result: string = pipe.transform(formControl);

    expect(result).toEqual(value);
  });
});
