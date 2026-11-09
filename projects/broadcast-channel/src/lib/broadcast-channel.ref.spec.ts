import { NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Subscription } from 'rxjs';

import { createChannelNameMock, flushMessages } from './broadcast-channel.mock';
import { BroadcastChannelRef } from './broadcast-channel.ref';

describe('BroadcastChannelRef', () => {
  let name: string;
  let broadcastChannel: BroadcastChannelRef<string>;
  let otherChannel: BroadcastChannel;

  beforeEach(() => {
    name = createChannelNameMock();
    broadcastChannel = new BroadcastChannelRef<string>(TestBed.inject(NgZone), name);
    // Another channel with the same name, like another tab of the app
    otherChannel = new BroadcastChannel(name);
  });

  afterEach(() => {
    broadcastChannel.close();
    otherChannel.close();
  });

  it('should expose the channel name', () => {
    // GIVEN
    // WHEN
    const channelName: string = broadcastChannel.name;

    // THEN
    expect(channelName).toBe(name);
  });

  it('should receive a message sent from another tab', async () => {
    // GIVEN
    const messages: string[] = [];
    const subscription: Subscription = broadcastChannel.data$.subscribe((message: string) => messages.push(message));

    // WHEN
    otherChannel.postMessage('hello');
    await flushMessages();

    // THEN
    expect(messages).toEqual(['hello']);

    subscription.unsubscribe();
  });

  it('should send a message to another tab', async () => {
    // GIVEN
    const messages: string[] = [];
    otherChannel.onmessage = (event: MessageEvent<string>) => messages.push(event.data);

    // WHEN
    broadcastChannel.send('hello');
    await flushMessages();

    // THEN
    expect(messages).toEqual(['hello']);
  });

  it('should not receive its own messages', async () => {
    // GIVEN
    const messages: string[] = [];
    const subscription: Subscription = broadcastChannel.data$.subscribe((message: string) => messages.push(message));

    // WHEN
    broadcastChannel.send('hello');
    await flushMessages();

    // THEN
    expect(messages).toEqual([]);

    subscription.unsubscribe();
  });
});
