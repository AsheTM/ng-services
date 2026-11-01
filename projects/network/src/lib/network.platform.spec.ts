import { isOnline } from './network.platform';

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
