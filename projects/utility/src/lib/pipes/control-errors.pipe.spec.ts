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

  it('should be impure, to follow the control', () => {
    // GIVEN
    // WHEN
    const pure: boolean = (ControlErrors as unknown as { ɵpipe: { pure: boolean } }).ɵpipe.pure;

    // THEN
    expect(pure).toBeFalse();
  });

  it('should update when the errors change', () => {
    // GIVEN
    const errorsPipe: ControlErrors = new ControlErrors();
    const formControl: FormControl = new FormControl('', { validators: [Validators.required] });
    const before: (string | any)[] = errorsPipe.transform(formControl);

    // WHEN
    formControl.setValue('Test');
    const after: (string | any)[] = errorsPipe.transform(formControl);

    // THEN
    expect(before).toEqual(['This field is required']);
    expect(after).toEqual([]);
  });

  it('should return the same messages while the errors don\'t change', () => {
    // GIVEN
    const errorsPipe: ControlErrors = new ControlErrors();
    const formControl: FormControl = new FormControl('', { validators: [Validators.required] });

    // WHEN
    const first: (string | any)[] = errorsPipe.transform(formControl);
    const second: (string | any)[] = errorsPipe.transform(formControl);

    // THEN
    expect(second).toBe(first);
  });
});
