import { InjectionToken, Provider, inject } from '@angular/core';
import { CanDeactivateFn, MaybeAsync } from '@angular/router';
import { isBrowser } from '@ashetm/platform';
import { of, switchMap } from 'rxjs';

import { toObservable } from './guard-result';


/**
 * Implemented by the components protected by `unsavedChangesGuard`
 */
export interface HasUnsavedChanges {
  hasUnsavedChanges(): MaybeAsync<boolean>;
}

/**
 * Asks the user to confirm leaving: `true` to leave
 */
export type UnsavedChangesConfirm = (message: string) => MaybeAsync<boolean>;

export const UNSAVED_CHANGES_MESSAGE: InjectionToken<string> = new InjectionToken<string>('UNSAVED_CHANGES_MESSAGE', {
  factory: () => 'You have unsaved changes. Leave anyway?'
});

export const UNSAVED_CHANGES_CONFIRM: InjectionToken<UnsavedChangesConfirm> = new InjectionToken<UnsavedChangesConfirm>('UNSAVED_CHANGES_CONFIRM', {
  factory: () => (message: string) => confirm(message)
});

/**
 * Replaces the message, and / or the confirmation (e.g. your own dialog) of `unsavedChangesGuard`
 */
export function provideUnsavedChanges(options: { message?: string, confirm?: UnsavedChangesConfirm }): Provider[] {
  return [
    ...(options.message !== undefined ? [{ provide: UNSAVED_CHANGES_MESSAGE, useValue: options.message }] : []),
    ...(options.confirm !== undefined ? [{ provide: UNSAVED_CHANGES_CONFIRM, useValue: options.confirm }] : [])
  ];
}

/**
 * Asks before leaving a component that has unsaved changes. Always allowed on the server.
 */
export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = (component: HasUnsavedChanges | null) => {
  if (!isBrowser() || typeof component?.hasUnsavedChanges !== 'function') {
    return true;
  }

  const message: string = inject(UNSAVED_CHANGES_MESSAGE);
  const ask: UnsavedChangesConfirm = inject(UNSAVED_CHANGES_CONFIRM);

  return toObservable(component.hasUnsavedChanges()).pipe(
    switchMap((unsaved: boolean) => unsaved ? toObservable(ask(message)) : of(true))
  );
};
