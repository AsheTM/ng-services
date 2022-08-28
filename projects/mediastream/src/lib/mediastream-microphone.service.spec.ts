import { TestBed } from '@angular/core/testing';

import { MediastreamMicrophoneService } from './mediastream-microphone.service';
import { MEDIASTREAM_TOKEN_CONSTRAINTS_MOCK } from './mediastream-service.class.mock';

describe('MediastreamMicrophoneService', () => {
  let mediastreamConstraints: boolean | MediaTrackConstraints;
  let service: MediastreamMicrophoneService;

  beforeEach(() => {
    const MEDIASTREAM_CONSTRAINTS_MOCK_VALUE: boolean = true;
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MEDIASTREAM_TOKEN_CONSTRAINTS_MOCK,
          useValue: MEDIASTREAM_CONSTRAINTS_MOCK_VALUE
        }
      ]
    });
    mediastreamConstraints = TestBed.inject(MEDIASTREAM_TOKEN_CONSTRAINTS_MOCK);
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
