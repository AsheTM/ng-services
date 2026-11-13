import { Injector, Signal, inject, runInInjectionContext } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';

import { ControlErrors } from './control-errors.pipe';
import type { SignalOptions } from '@ashetm/ng-utility/signals';


/**
 * The error messages of a control, as a signal that follows the control.
 * Messages come from `provideControlErrorsMessages()` when it's provided.
 */
export function controlErrorsSignal(control: AbstractControl, options?: SignalOptions): Signal<(string | any)[]> {
  const injector: Injector = options?.injector ?? inject(Injector);
  const pipe: ControlErrors = runInInjectionContext(injector, () => new ControlErrors());

  return toSignal(pipe.transform(control), { requireSync: true, injector });
}
