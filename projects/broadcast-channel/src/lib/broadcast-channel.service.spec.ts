import { TestBed } from '@angular/core/testing';

import { BroadcastChannelModule } from './broadcast-channel.module';
import { BroadcastChannelRef } from './broadcast-channel.ref';
import { BroadcastChannelService } from './broadcast-channel.service';

describe('BroadcastChannelService', () => {
  let service: BroadcastChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BroadcastChannelModule]
    });
    service = TestBed.inject(BroadcastChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.create).toBeDefined();
    expect(service.get).toBeDefined();
    expect(service.ngOnDestroy).toBeDefined();
  });

  it('should created BroadcastChannelRef', () => {
    const name: string = 'TEST';
    const broadcastChannel: BroadcastChannelRef<any> = service.create<any>(name);

    expect(broadcastChannel).toBeTruthy();
    expect(broadcastChannel.name).toEqual(name);
  });

  // it('should BroadcastChannelRef works', (done: DoneFn) => {
  //   const name: string = 'TEST';
  //   const broadcastChannel: BroadcastChannelRef<string> = service.create<string>(name);
  //   const dataToSend: string = 'TEST SENDING DATA';

  //   broadcastChannel.data$.subscribe({
  //     next: (data: string) => {
  //       console.log(data)
  //       expect(data).toEqual(dataToSend);
  //       done();
  //     }
  //   });

  //   setTimeout(() => broadcastChannel.send(dataToSend), 2000);
  // });
});
