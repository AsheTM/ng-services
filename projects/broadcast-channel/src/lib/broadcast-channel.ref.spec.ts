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

  it('should deliver messages to every subscriber', async () => {
    // GIVEN
    const first: string[] = [];
    const second: string[] = [];
    const subscription: Subscription = broadcastChannel.data$.subscribe((message: string) => first.push(message));
    subscription.add(broadcastChannel.data$.subscribe((message: string) => second.push(message)));

    // WHEN
    otherChannel.postMessage('hello');
    await flushMessages();

    // THEN
    expect(first).toEqual(['hello']);
    expect(second).toEqual(['hello']);

    subscription.unsubscribe();
  });

  it('should keep delivering to the other subscribers when one unsubscribes', async () => {
    // GIVEN
    const first: string[] = [];
    const second: string[] = [];
    const firstSubscription: Subscription = broadcastChannel.data$.subscribe((message: string) => first.push(message));
    const secondSubscription: Subscription = broadcastChannel.data$.subscribe((message: string) => second.push(message));

    // WHEN
    firstSubscription.unsubscribe();
    otherChannel.postMessage('hello');
    await flushMessages();

    // THEN
    expect(first).toEqual([]);
    expect(second).toEqual(['hello']);

    secondSubscription.unsubscribe();
  });

  it('should remove its listeners when unsubscribed', () => {
    // GIVEN
    const subscription: Subscription = broadcastChannel.data$.subscribe();
    const removeEventListener: jasmine.Spy = spyOn(BroadcastChannel.prototype, 'removeEventListener').and.callThrough();

    // WHEN
    subscription.unsubscribe();

    // THEN
    expect(removeEventListener).toHaveBeenCalledWith('message', jasmine.any(Function));
    expect(removeEventListener).toHaveBeenCalledWith('messageerror', jasmine.any(Function));
  });

  it('should warn about a message that cannot be read', () => {
    // GIVEN
    const warn: jasmine.Spy = spyOn(console, 'warn');
    const subscription: Subscription = broadcastChannel.data$.subscribe();

    // WHEN
    broadcastChannel['_broadcastChannel'].dispatchEvent(new MessageEvent('messageerror'));

    // THEN
    expect(warn).toHaveBeenCalledOnceWith(jasmine.stringMatching(name), jasmine.any(MessageEvent));

    subscription.unsubscribe();
  });

  it('should keep receiving after a message that cannot be read', async () => {
    // GIVEN
    spyOn(console, 'warn');
    const messages: string[] = [];
    let error: unknown;
    const subscription: Subscription = broadcastChannel.data$.subscribe({
      next: (message: string) => messages.push(message),
      error: (value: unknown) => error = value
    });

    // WHEN
    broadcastChannel['_broadcastChannel'].dispatchEvent(new MessageEvent('messageerror'));
    otherChannel.postMessage('hello');
    await flushMessages();

    // THEN
    expect(error).toBeUndefined();
    expect(subscription.closed).toBeFalse();
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
