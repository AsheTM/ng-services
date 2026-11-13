import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, GuardResult, RouterStateSnapshot } from '@angular/router';

import { runGuard } from './testing';
import { HasUnsavedChanges, provideUnsavedChanges, unsavedChangesGuard } from './unsaved-changes.guard';


describe('unsavedChangesGuard', () => {
  const route = {} as ActivatedRouteSnapshot;
  const state = {} as RouterStateSnapshot;

  function leave(component: HasUnsavedChanges | null): Promise<GuardResult> {
    return runGuard(() => unsavedChangesGuard(component as HasUnsavedChanges, route, state, state));
  }

  it('should allow leaving without unsaved changes', async () => {
    // GIVEN
    const confirmSpy: jasmine.Spy = spyOn(window, 'confirm');

    // WHEN
    const result: GuardResult = await leave({ hasUnsavedChanges: () => false });

    // THEN
    expect(result).toBeTrue();
    expect(confirmSpy).not.toHaveBeenCalled();
  });

  it('should ask with the default message when there are unsaved changes', async () => {
    // GIVEN
    const confirmSpy: jasmine.Spy = spyOn(window, 'confirm').and.returnValue(false);

    // WHEN
    const result: GuardResult = await leave({ hasUnsavedChanges: () => true });

    // THEN
    expect(result).toBeFalse();
    expect(confirmSpy).toHaveBeenCalledOnceWith('You have unsaved changes. Leave anyway?');
  });

  it('should use the provided message and confirmation, also async', async () => {
    // GIVEN
    const ask: jasmine.Spy = jasmine.createSpy('ask').and.returnValue(Promise.resolve(true));
    TestBed.configureTestingModule({ providers: [provideUnsavedChanges({ message: 'Quitter ?', confirm: ask })] });

    // WHEN
    const result: GuardResult = await leave({ hasUnsavedChanges: () => Promise.resolve(true) });

    // THEN
    expect(result).toBeTrue();
    expect(ask).toHaveBeenCalledOnceWith('Quitter ?');
  });

  it('should allow leaving a component without hasUnsavedChanges', async () => {
    // GIVEN
    // WHEN
    const result: GuardResult = await leave(null);

    // THEN
    expect(result).toBeTrue();
  });
});
