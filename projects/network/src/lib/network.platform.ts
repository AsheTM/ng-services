import { isBrowser } from "@ashetm/platform";

export const isOnline: () => boolean = () => isBrowser() ? navigator.onLine : true;
