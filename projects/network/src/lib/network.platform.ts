// Node 21+ defines a global `navigator` without `onLine`, so `window` is checked too
export const isBrowser: () => boolean = () => typeof window !== 'undefined' && typeof navigator !== 'undefined';
export const isOnline: () => boolean = () => isBrowser() ? navigator.onLine : true;
