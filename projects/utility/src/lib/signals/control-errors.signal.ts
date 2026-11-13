import { Signal, runInInjectionContext } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';

import { ControlErrors } from '../pipes/control-errors.pipe';
import { SignalOptions, resolveInjector } from './signal-options';


/**
 * The error messages of a control, as a signal that follows the control.
 * Messages come from `provideControlErrorsMessages()` when it's provided.
 */
export function controlErrorsSignal(control: AbstractControl, options?: SignalOptions): Signal<(string | any)[]> {
  const injector = resolveInjector(controlErrorsSignal, options);
  const pipe: ControlErrors = runInInjectionContext(injector, () => new ControlErrors());

  return toSignal(pipe.transform(control), { requireSync: true, injector });
}
