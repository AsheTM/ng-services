import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { ControlValue } from './control-value.pipe';


function latest<T>(source$: Observable<T>): { value: T | undefined, unsubscribe: () => void } {
  const result: { value: T | undefined, unsubscribe: () => void } = { value: undefined, unsubscribe: () => undefined };
  const subscription = source$.subscribe((value: T) => result.value = value);

  result.unsubscribe = () => subscription.unsubscribe();

  return result;
}

describe('ControlValue', () => {
  const pipe = new ControlValue();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('works properly', () => {
    const value: string = 'Test';
    const formControl: FormControl = new FormControl(value);
    const result = latest(pipe.transform(formControl));

    expect(result.value).toEqual(value);
    result.unsubscribe();
  });

  it('should be pure', () => {
    // GIVEN
    // WHEN
    const pure: boolean = (ControlValue as unknown as { ɵpipe: { pure: boolean } }).ɵpipe.pure;

    // THEN
    expect(pure).toBeTrue();
  });

  it('should emit the new value when the value changes', () => {
    // GIVEN
    const formControl: FormControl = new FormControl('Before');
    const result = latest(pipe.transform(formControl));
    const before: string | undefined = result.value;

    // WHEN
    formControl.setValue('After');

    // THEN
    expect(before).toBe('Before');
    expect(result.value).toBe('After');
    result.unsubscribe();
  });

  it('should emit the group value when a child control changes', () => {
    // GIVEN
    const formGroup: FormGroup = new FormGroup({ name: new FormControl('Before') });
    const result = latest(pipe.transform(formGroup));

    // WHEN
    formGroup.controls['name'].setValue('After');

    // THEN
    expect(result.value).toEqual({ name: 'After' });
    result.unsubscribe();
  });

  it('should include disabled controls', () => {
    // GIVEN
    const formGroup: FormGroup = new FormGroup({ name: new FormControl({ value: 'Test', disabled: true }) });

    // WHEN
    const result = latest(pipe.transform(formGroup));

    // THEN
    expect(result.value).toEqual({ name: 'Test' });
    result.unsubscribe();
  });

  it('should emit the raw value when a child control is disabled', () => {
    // GIVEN
    const formGroup: FormGroup = new FormGroup({ name: new FormControl('Test'), age: new FormControl(30) });
    const result = latest(pipe.transform(formGroup));

    // WHEN
    formGroup.controls['age'].disable();

    // THEN
    expect(result.value).toEqual({ name: 'Test', age: 30 });
    expect(formGroup.value).toEqual({ name: 'Test' });
    result.unsubscribe();
  });

  it('should emit undefined without a control', () => {
    // GIVEN
    // WHEN
    const result = latest(pipe.transform(undefined));

    // THEN
    expect(result.value).toBeUndefined();
  });
});
