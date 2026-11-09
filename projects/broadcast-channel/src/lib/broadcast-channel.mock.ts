let channelCount: number = 0;

/**
 * Returns a channel name that no other test uses, so tests don't receive each other's messages
 */
export function createChannelNameMock(): string {
  return `ashetm-broadcast-channel-test-${++channelCount}`;
}

/**
 * Waits for messages posted on a `BroadcastChannel` to be delivered
 */
export function flushMessages(): Promise<void> {
  return new Promise((resolve: () => void) => setTimeout(resolve, 50));
}
