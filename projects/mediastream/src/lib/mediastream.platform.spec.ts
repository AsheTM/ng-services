import { isBrowser } from './mediastream.platform';

describe('isBrowser', () => {
  it('should be true in the browser', () => {
    // GIVEN
    // WHEN
    const browser: boolean = isBrowser();

    // THEN
    expect(browser).toBeTrue();
  });
});
