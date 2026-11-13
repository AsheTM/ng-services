import { Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';

import { ControlValue } from '../pipes/control-value.pipe';
import { SignalOptions, resolveInjector } from './signal-options';


/**
 * The raw value of a control (disabled controls included), as a signal that follows the control
 */
export function controlValueSignal<TRawValue>(control: AbstractControl<any, TRawValue>, options?: SignalOptions): Signal<TRawValue> {
  const injector = resolveInjector(controlValueSignal, options);

  return toSignal(new ControlValue().transform(control), { requireSync: true, injector });
}
