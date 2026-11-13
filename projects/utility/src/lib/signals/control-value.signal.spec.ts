import { Injector, Signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';

import { controlValueSignal } from './control-value.signal';


describe('controlValueSignal', () => {
  it('should follow the value of the control', () => {
    // GIVEN
    const control = new FormControl<string>('Before');
    const value: Signal<string | null> = TestBed.runInInjectionContext(() => controlValueSignal(control));

    // WHEN
    control.setValue('After');

    // THEN
    expect(value()).toBe('After');
  });

  it('should include disabled controls', () => {
    // GIVEN
    const group = new FormGroup({ name: new FormControl('Test'), age: new FormControl(30) });
    const value: Signal<{ name: string | null, age: number | null }> = TestBed.runInInjectionContext(() => controlValueSignal(group));

    // WHEN
    group.controls.age.disable();

    // THEN
    expect(value()).toEqual({ name: 'Test', age: 30 });
  });

  it('should work outside an injection context with an injector', () => {
    // GIVEN
    const control = new FormControl('Test');

    // WHEN
    const value: Signal<string | null> = controlValueSignal(control, { injector: TestBed.inject(Injector) });

    // THEN
    expect(value()).toBe('Test');
  });

  it('should throw outside an injection context without an injector', () => {
    // GIVEN
    const control = new FormControl('Test');

    // WHEN
    const create: () => Signal<string | null> = () => controlValueSignal(control);

    // THEN
    expect(create).toThrowError(/injection context/);
  });
});
