let channelCount: number = 0;

/**
 * Returns a channel name that no other test uses, so tests don't receive each other's messages
 */
export function createChannelNameMock(): string {
  return `ashetm-broadcast-channel-test-${++channelCount}`;
}

/**
 * Waits for messages posted on a `BroadcastChannel` to be delivered (the first delivery in a fresh browser can take a while)
 */
export function flushMessages(): Promise<void> {
  return new Promise((resolve: () => void) => setTimeout(resolve, 200));
}
