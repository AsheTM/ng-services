import { Injector, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';

import { ControlValue } from './control-value.pipe';
import type { SignalOptions } from '@ashetm/ng-utility/signals';


/**
 * The raw value of a control (disabled controls included), as a signal that follows the control
 */
export function controlValueSignal<TRawValue>(control: AbstractControl<any, TRawValue>, options?: SignalOptions): Signal<TRawValue> {
  const injector: Injector = options?.injector ?? inject(Injector);

  return toSignal(new ControlValue().transform(control), { requireSync: true, injector });
}
