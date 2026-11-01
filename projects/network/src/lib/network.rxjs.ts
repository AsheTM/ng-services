import { isBrowser } from "@ashetm/platform";
import { EMPTY, Observable, defer, distinctUntilChanged, fromEvent, map, merge, of, startWith, switchMap, timer } from "rxjs";

import { isOnline } from "./network.platform";
import { NetworkStatus } from "./network.type";

interface NetworkInformation extends EventTarget {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

type NavigatorWithConnection = Navigator
  & Partial<Record<'connection' | 'mozConnection' | 'webkitConnection', NetworkInformation>>;

export const fromOfflineEvent: () => Observable<void> = () => isBrowser() ? fromEvent(window, 'offline').pipe(map(() => void 0)) : EMPTY;
export const fromOnlineEvent: () => Observable<void> = () => isBrowser() ? fromEvent(window, 'online').pipe(map(() => void 0)) : EMPTY;
export const fromNetworkEvents: () => Observable<boolean> = () => defer(() => merge(
  fromOfflineEvent().pipe(map(() => false)),
  fromOnlineEvent().pipe(map(() => true)),
).pipe(
  startWith(isOnline()),
  distinctUntilChanged(),
));
export const fromNetworkLastTimeConnected: () => Observable<number | undefined> = () => {
  const interval: number = 100;

  return fromNetworkEvents().pipe(
    switchMap((network: boolean) => network ? of(undefined) : timer(0, interval)),
    map((milliseconds: number | undefined) => milliseconds === undefined ? undefined : milliseconds * interval),
  );
}
export const fromNetworkStatus: () => Observable<NetworkStatus | undefined> = () => {
  if (!isBrowser()) {
    return of(undefined);
  }

  const browserNavigator: NavigatorWithConnection = navigator;
  const connection: NetworkInformation | undefined = browserNavigator.connection
    || browserNavigator.mozConnection
    || browserNavigator.webkitConnection;

  if (!connection) {
    return of(undefined); // Fallback when Network Information API is not supported
  }

  return fromEvent(connection, "change").pipe(
    startWith(connection), // Emit the initial state
    map(() => ({
      effectiveType: connection.effectiveType || "unknown",
      downlink: connection.downlink || 0,
      rtt: connection.rtt || 0,
      saveData: connection.saveData || false,
    }))
  );
};
