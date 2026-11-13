import { WritableSignal, signal } from '@angular/core';
import { isBrowser } from '@ashetm/platform';
import { Maybe, Nullable } from '@ashetm/types';


/**
 * A signal saved in `localStorage` (or `sessionStorage`), as JSON.
 * On the server, or when the storage can't be used, it's a plain signal.
 */
export function storageSignal<T>(key: string, initial: T, options: { storage?: 'local' | 'session' } = {}): WritableSignal<T> {
  const storage: Nullable<Storage> = getStorage(options.storage ?? 'local');
  const state: WritableSignal<T> = signal<T>(read(storage, key, initial));
  const set: (value: T) => void = state.set.bind(state);

  state.set = (value: T) => {
    set(value);
    write(storage, key, value);
  };
  state.update = (updateFn: (value: T) => T) => state.set(updateFn(state()));

  return state;
}

function getStorage(type: 'local' | 'session'): Nullable<Storage> {
  try {
    return isBrowser() ? (type === 'local' ? localStorage : sessionStorage) : null;
  } catch {
    // Storage blocked (e.g. by the browser's privacy settings)
    return null;
  }
}

function read<T>(storage: Nullable<Storage>, key: string, initial: T): T {
  try {
    const saved: Maybe<string> = storage?.getItem(key);

    return saved === null || saved === undefined ? initial : JSON.parse(saved);
  } catch {
    return initial;
  }
}

function write<T>(storage: Nullable<Storage>, key: string, value: T): void {
  try {
    storage?.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or blocked: the signal still works
  }
}
