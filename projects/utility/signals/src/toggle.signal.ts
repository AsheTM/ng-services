import { WritableSignal, signal } from '@angular/core';


export type ToggleSignal = WritableSignal<boolean> & { toggle(): void };

/**
 * A boolean signal with `toggle()`
 */
export function toggleSignal(initial: boolean = false): ToggleSignal {
  const state = signal<boolean>(initial) as ToggleSignal;

  state.toggle = () => state.update((value: boolean) => !value);

  return state;
}
