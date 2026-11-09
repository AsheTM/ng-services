import { TestBed } from '@angular/core/testing';

import { createChannelNameMock } from './broadcast-channel.mock';
import { provideBroadcastChannel } from './broadcast-channel.provider';
import { BroadcastChannelRef } from './broadcast-channel.ref';
import { BroadcastChannelService } from './broadcast-channel.service';

describe('BroadcastChannelService', () => {
  let service: BroadcastChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideBroadcastChannel()]
    });
    service = TestBed.inject(BroadcastChannelService);
  });

  it('should be created', () => {
    // GIVEN
    // WHEN
    // THEN
    expect(service).toBeTruthy();
  });

  it('should create a channel with the given name', () => {
    // GIVEN
    const name: string = createChannelNameMock();

    // WHEN
    const broadcastChannel: BroadcastChannelRef<string> = service.create<string>(name);

    // THEN
    expect(broadcastChannel).toBeInstanceOf(BroadcastChannelRef);
    expect(broadcastChannel.name).toBe(name);
  });

  it('should return the same channel for the same name', () => {
    // GIVEN
    const name: string = createChannelNameMock();
    const broadcastChannel: BroadcastChannelRef<string> = service.create<string>(name);

    // WHEN
    const sameBroadcastChannel: BroadcastChannelRef<string> = service.create<string>(name);

    // THEN
    expect(sameBroadcastChannel).toBe(broadcastChannel);
  });

  it('should return different channels for different names', () => {
    // GIVEN
    const broadcastChannel: BroadcastChannelRef<string> = service.create<string>(createChannelNameMock());

    // WHEN
    const otherBroadcastChannel: BroadcastChannelRef<string> = service.create<string>(createChannelNameMock());

    // THEN
    expect(otherBroadcastChannel).not.toBe(broadcastChannel);
  });

  it('should get a created channel', () => {
    // GIVEN
    const name: string = createChannelNameMock();
    const broadcastChannel: BroadcastChannelRef<string> = service.create<string>(name);

    // WHEN
    const foundBroadcastChannel: BroadcastChannelRef<string> | null = service.get<string>(name);

    // THEN
    expect(foundBroadcastChannel).toBe(broadcastChannel);
  });
});
