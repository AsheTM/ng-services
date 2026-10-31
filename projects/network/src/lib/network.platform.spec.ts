import { isBrowser, isOnline } from './network.platform';

describe('isBrowser', () => {
  it('should return true in a browser', () => {
    // GIVEN
    // tests run in a browser, where `window` and `navigator` exist

    // WHEN
    const result: boolean = isBrowser();

    // THEN
    expect(result).toBeTrue();
  });
});

describe('isOnline', () => {
  it('should return true when the device is online', () => {
    // GIVEN
    spyOnProperty(navigator, 'onLine').and.returnValue(true);

    // WHEN
    const result: boolean = isOnline();

    // THEN
    expect(result).toBeTrue();
  });

  it('should return false when the device is offline', () => {
    // GIVEN
    spyOnProperty(navigator, 'onLine').and.returnValue(false);

    // WHEN
    const result: boolean = isOnline();

    // THEN
    expect(result).toBeFalse();
  });
});
