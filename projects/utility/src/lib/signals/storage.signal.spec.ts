import { WritableSignal } from '@angular/core';

import { storageSignal } from './storage.signal';


describe('storageSignal', () => {
  const key: string = 'ashetm-storage-signal-test';

  afterEach(() => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });

  it('should start with the initial value when nothing is saved', () => {
    // GIVEN
    // WHEN
    const theme: WritableSignal<string> = storageSignal(key, 'light');

    // THEN
    expect(theme()).toBe('light');
  });

  it('should save the value in localStorage', () => {
    // GIVEN
    const settings: WritableSignal<{ theme: string }> = storageSignal(key, { theme: 'light' });

    // WHEN
    settings.update((value: { theme: string }) => ({ ...value, theme: 'dark' }));

    // THEN
    expect(settings()).toEqual({ theme: 'dark' });
    expect(localStorage.getItem(key)).toBe('{"theme":"dark"}');
  });

  it('should start with the saved value', () => {
    // GIVEN
    localStorage.setItem(key, '"dark"');

    // WHEN
    const theme: WritableSignal<string> = storageSignal(key, 'light');

    // THEN
    expect(theme()).toBe('dark');
  });

  it('should use sessionStorage when asked', () => {
    // GIVEN
    const theme: WritableSignal<string> = storageSignal(key, 'light', { storage: 'session' });

    // WHEN
    theme.set('dark');

    // THEN
    expect(sessionStorage.getItem(key)).toBe('"dark"');
    expect(localStorage.getItem(key)).toBeNull();
  });

  it('should ignore a saved value that isn\'t JSON', () => {
    // GIVEN
    localStorage.setItem(key, 'not json');

    // WHEN
    const theme: WritableSignal<string> = storageSignal(key, 'light');

    // THEN
    expect(theme()).toBe('light');
  });
});
