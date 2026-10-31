import { TestBed } from '@angular/core/testing';
import { Subscription } from 'rxjs';

import { MediastreamMicrophoneService } from './mediastream-microphone.service';
import { createMicrophoneStreamMock, flushPromises } from './mediastream.mock';
import { MEDIASTREAM_TOKEN_MICROPHONE_CONSTRAINTS } from './mediastream.token';

describe('MediastreamMicrophoneService', () => {
  let service: MediastreamMicrophoneService;

  beforeEach(() => {
    const MEDIASTREAM_CONSTRAINTS_MOCK_VALUE: boolean = true;
    TestBed.configureTestingModule({
      providers: [
        MediastreamMicrophoneService,
        {
          provide: MEDIASTREAM_TOKEN_MICROPHONE_CONSTRAINTS,
          useValue: MEDIASTREAM_CONSTRAINTS_MOCK_VALUE
        }
      ]
    });
    service = TestBed.inject(MediastreamMicrophoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.currentMediaDevice$).toBeDefined();
    expect(service.disableMicrophone).toBeDefined();
    expect(service.enableMicrophone).toBeDefined();
    expect(service.mediastream$).toBeTruthy();
    expect(service.mediastreamConstraints).toBeTruthy();
    expect(service.toggleMicrophone).toBeDefined();
    expect(service.updateMicrophoneDevice).toBeDefined();
  });

  // it('should mediastream$ work', (done: DoneFn) => {
  //   service.mediastream$.pipe(first()).subscribe({
  //     next: (mediastream: MediaStream) => {
  //       expect(mediastream).toBeDefined();
  //       done();
  //     }
  //   });
  // });
});

describe('MediastreamMicrophoneService release', () => {
  let service: MediastreamMicrophoneService;

  beforeEach(() => {
    spyOn(navigator.mediaDevices, 'getUserMedia').and.callFake(() => Promise.resolve(createMicrophoneStreamMock()));
    TestBed.configureTestingModule({
      providers: [
        MediastreamMicrophoneService,
        { provide: MEDIASTREAM_TOKEN_MICROPHONE_CONSTRAINTS, useValue: true }
      ]
    });
    service = TestBed.inject(MediastreamMicrophoneService);
  });

  it('should stop the tracks when unsubscribed', async () => {
    // GIVEN
    const mediastreams: MediaStream[] = [];
    const subscription: Subscription = service.mediastream$.subscribe((mediastream: MediaStream) => mediastreams.push(mediastream));
    await flushPromises();

    // WHEN
    subscription.unsubscribe();

    // THEN
    expect(mediastreams.length).toBe(1);
    expect(mediastreams[0].getAudioTracks()[0].readyState).toBe('ended');
  });
});

describe('MediastreamMicrophoneService sharing', () => {
  let service: MediastreamMicrophoneService;
  let getUserMedia: jasmine.Spy;

  beforeEach(() => {
    getUserMedia = spyOn(navigator.mediaDevices, 'getUserMedia').and.callFake(() => Promise.resolve(createMicrophoneStreamMock()));
    TestBed.configureTestingModule({
      providers: [
        MediastreamMicrophoneService,
        { provide: MEDIASTREAM_TOKEN_MICROPHONE_CONSTRAINTS, useValue: true }
      ]
    });
    service = TestBed.inject(MediastreamMicrophoneService);
  });

  it('should share one stream between subscribers', async () => {
    // GIVEN
    const first: MediaStream[] = [];
    const second: MediaStream[] = [];

    // WHEN
    const subscription: Subscription = service.mediastream$.subscribe((mediastream: MediaStream) => first.push(mediastream));
    subscription.add(service.mediastream$.subscribe((mediastream: MediaStream) => second.push(mediastream)));
    await flushPromises();

    // THEN
    expect(getUserMedia).toHaveBeenCalledTimes(1);
    expect(second[0]).toBe(first[0]);

    subscription.unsubscribe();
  });
});
