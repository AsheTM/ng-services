import { FormControl, Validators } from '@angular/forms';

import { ControlErrors } from './control-errors.pipe';


describe('ControlErrors', () => {
  const pipe = new ControlErrors();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('works properly', () => {
    const value: undefined = undefined;
    const formControl: FormControl = new FormControl(value, {
      validators: [Validators.required]
    });
    const result: (string | any)[] = pipe.transform(formControl);

    expect(result).toHaveSize(1);
  });
});
