
export interface NetworkStatus {
  effectiveType: string; // e.g., '4g', '3g'
  downlink: number;      // Bandwidth in Mbps
  rtt: number;           // Round-trip time in milliseconds
  saveData: boolean;     // Whether data-saver mode is enabled
}
