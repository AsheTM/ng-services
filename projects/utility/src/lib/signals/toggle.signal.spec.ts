import { ToggleSignal, toggleSignal } from './toggle.signal';


describe('toggleSignal', () => {
  it('should start with false by default', () => {
    // GIVEN
    // WHEN
    const open: ToggleSignal = toggleSignal();

    // THEN
    expect(open()).toBeFalse();
  });

  it('should toggle its value', () => {
    // GIVEN
    const open: ToggleSignal = toggleSignal(true);

    // WHEN
    open.toggle();
    const once: boolean = open();
    open.toggle();

    // THEN
    expect(once).toBeFalse();
    expect(open()).toBeTrue();
  });

  it('should still be a writable signal', () => {
    // GIVEN
    const open: ToggleSignal = toggleSignal();

    // WHEN
    open.set(true);

    // THEN
    expect(open()).toBeTrue();
  });
});
