import { FormControl, FormGroup } from '@angular/forms';

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

  it('should be impure, to follow the control', () => {
    // GIVEN
    // WHEN
    const pure: boolean = (ControlValue as unknown as { ɵpipe: { pure: boolean } }).ɵpipe.pure;

    // THEN
    expect(pure).toBeFalse();
  });

  it('should update when the value changes', () => {
    // GIVEN
    const valuePipe: ControlValue = new ControlValue();
    const formControl: FormControl = new FormControl('Before');
    const before: string = valuePipe.transform(formControl);

    // WHEN
    formControl.setValue('After');
    const after: string = valuePipe.transform(formControl);

    // THEN
    expect(before).toBe('Before');
    expect(after).toBe('After');
  });

  it('should return the same raw value while the value doesn\'t change', () => {
    // GIVEN
    const valuePipe: ControlValue = new ControlValue();
    const formGroup: FormGroup = new FormGroup({ name: new FormControl('Test') });

    // WHEN
    const first: Record<string, string> = valuePipe.transform(formGroup);
    const second: Record<string, string> = valuePipe.transform(formGroup);

    // THEN
    expect(first).toEqual({ name: 'Test' });
    expect(second).toBe(first);
  });

  it('should include disabled controls', () => {
    // GIVEN
    const valuePipe: ControlValue = new ControlValue();
    const formGroup: FormGroup = new FormGroup({ name: new FormControl({ value: 'Test', disabled: true }) });

    // WHEN
    const result: Record<string, string> = valuePipe.transform(formGroup);

    // THEN
    expect(result).toEqual({ name: 'Test' });
  });
});
