import { fakeAsync, tick } from '@angular/core/testing';

import {
  fromNetworkEvents,
  fromNetworkLastTimeConnected,
  fromNetworkStatus,
  fromOfflineEvent,
  fromOnlineEvent
} from './network.rxjs';
import { NetworkStatus } from './network.type';

function goOnline(): void {
  window.dispatchEvent(new Event('online'));
}

function goOffline(): void {
  window.dispatchEvent(new Event('offline'));
}

describe('fromOfflineEvent', () => {
  it('should emit when the device goes offline', () => {
    // GIVEN
    let count: number = 0;
    const subscription = fromOfflineEvent().subscribe(() => count++);

    // WHEN
    goOnline();
    goOffline();
    subscription.unsubscribe();

    // THEN
    expect(count).toBe(1);
  });
});

describe('fromOnlineEvent', () => {
  it('should emit when the device goes online', () => {
    // GIVEN
    let count: number = 0;
    const subscription = fromOnlineEvent().subscribe(() => count++);

    // WHEN
    goOffline();
    goOnline();
    subscription.unsubscribe();

    // THEN
    expect(count).toBe(1);
  });
});

describe('fromNetworkEvents', () => {
  it('should emit true first when the device is online', () => {
    // GIVEN
    spyOnProperty(navigator, 'onLine').and.returnValue(true);
    const values: boolean[] = [];

    // WHEN
    fromNetworkEvents().subscribe((value: boolean) => values.push(value)).unsubscribe();

    // THEN
    expect(values).toEqual([true]);
  });

  it('should emit false first when the device is offline', () => {
    // GIVEN
    spyOnProperty(navigator, 'onLine').and.returnValue(false);
    const values: boolean[] = [];

    // WHEN
    fromNetworkEvents().subscribe((value: boolean) => values.push(value)).unsubscribe();

    // THEN
    expect(values).toEqual([false]);
  });

  it('should read the state on subscribe, not on creation', () => {
    // GIVEN
    const onLine = spyOnProperty(navigator, 'onLine').and.returnValue(true);
    const values: boolean[] = [];
    const network$ = fromNetworkEvents();

    // WHEN
    onLine.and.returnValue(false);
    network$.subscribe((value: boolean) => values.push(value)).unsubscribe();

    // THEN
    expect(values).toEqual([false]);
  });

  it('should emit network changes and skip repeated values', () => {
    // GIVEN
    spyOnProperty(navigator, 'onLine').and.returnValue(true);
    const values: boolean[] = [];
    const subscription = fromNetworkEvents().subscribe((value: boolean) => values.push(value));

    // WHEN
    goOnline();
    goOffline();
    goOffline();
    goOnline();
    subscription.unsubscribe();

    // THEN
    expect(values).toEqual([true, false, true]);
  });
});

describe('fromNetworkLastTimeConnected', () => {
  it('should emit undefined while online', () => {
    // GIVEN
    spyOnProperty(navigator, 'onLine').and.returnValue(true);
    const values: (number | undefined)[] = [];

    // WHEN
    fromNetworkLastTimeConnected().subscribe((value: number | undefined) => values.push(value)).unsubscribe();

    // THEN
    expect(values).toEqual([undefined]);
  });

  it('should count elapsed time right away when starting offline', fakeAsync(() => {
    // GIVEN
    spyOnProperty(navigator, 'onLine').and.returnValue(false);
    const values: (number | undefined)[] = [];
    const subscription = fromNetworkLastTimeConnected().subscribe((value: number | undefined) => values.push(value));

    // WHEN
    tick(250);
    goOnline();
    subscription.unsubscribe();

    // THEN
    expect(values).toEqual([0, 100, 200, undefined]);
  }));

  it('should restart counting when the device goes offline again', fakeAsync(() => {
    // GIVEN
    spyOnProperty(navigator, 'onLine').and.returnValue(true);
    const values: (number | undefined)[] = [];
    const subscription = fromNetworkLastTimeConnected().subscribe((value: number | undefined) => values.push(value));

    // WHEN
    goOffline();
    tick(150);
    subscription.unsubscribe();

    // THEN
    expect(values).toEqual([undefined, 0, 100]);
  }));
});

describe('fromNetworkStatus', () => {
  it('should emit undefined when the Network Information API is not supported', () => {
    // GIVEN
    spyOnProperty(navigator, 'connection' as keyof Navigator).and.returnValue(undefined);
    const values: (NetworkStatus | undefined)[] = [];

    // WHEN
    fromNetworkStatus().subscribe((value: NetworkStatus | undefined) => values.push(value));

    // THEN
    expect(values).toEqual([undefined]);
  });

  it('should emit the current status, then on every change', () => {
    // GIVEN
    const connection = Object.assign(new EventTarget(), {
      effectiveType: '4g',
      downlink: 10,
      rtt: 50,
      saveData: false
    });
    spyOnProperty(navigator, 'connection' as keyof Navigator).and.returnValue(connection);
    const values: (NetworkStatus | undefined)[] = [];
    const subscription = fromNetworkStatus().subscribe((value: NetworkStatus | undefined) => values.push(value));

    // WHEN
    Object.assign(connection, { effectiveType: '3g', downlink: 1.5, rtt: 300, saveData: true });
    connection.dispatchEvent(new Event('change'));
    subscription.unsubscribe();

    // THEN
    expect(values).toEqual([
      { effectiveType: '4g', downlink: 10, rtt: 50, saveData: false },
      { effectiveType: '3g', downlink: 1.5, rtt: 300, saveData: true }
    ]);
  });
});
