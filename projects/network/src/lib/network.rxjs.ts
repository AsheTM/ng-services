import { Observable, fromEvent, merge, of, timer } from "rxjs";
import { map, startWith, switchMap } from "rxjs/operators";

import { NetworkStatus } from "./network.type";

export const fromOfflineEvent: () => Observable<void> = () => fromEvent(window, 'offline').pipe(map(() => void 0));
export const fromOnlineEvent: () => Observable<void> = () => fromEvent(window, 'online').pipe(map(() => void 0));
export const fromNetworkEvents: () => Observable<boolean> = () => merge(
  fromOfflineEvent().pipe(map(() => false)),
  fromOnlineEvent().pipe(map(() => true)),
);
export const fromNetworkLastTimeConnected: () => Observable<number | undefined> = () => {
  const interval: number = 100;

  return fromNetworkEvents().pipe(
    switchMap((network: boolean) => network ? of(undefined) : timer(0, interval)),
    map((milliseconds: number | undefined) => milliseconds === undefined ? undefined : milliseconds * interval),
    startWith(undefined),
  );
}
export const fromNetworkStatus: () => Observable<NetworkStatus | undefined> = () => {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;

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
