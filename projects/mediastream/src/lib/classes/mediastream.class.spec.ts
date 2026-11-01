import { Observable, Subscription } from 'rxjs';

import { createCameraStreamMock, flushPromises } from '../mediastream.mock';
import { AMediastream } from './mediastream.class';

class MediastreamTest extends AMediastream {

  getMediaDevices(): MediaDevices {
    return this._getMediaDevices();
  }

  getUserMedia(constraints: MediaStreamConstraints): Observable<MediaStream> {
    return this._getUserMedia(constraints);
  }

  stopMediastream(mediastream: MediaStream): void {
    this._stopMediastream(mediastream);
  }

}

describe('AMediastream', () => {
  const constraints: MediaStreamConstraints = { audio: false, video: true };

  describe('_getMediaDevices', () => {
    it('should return the media devices of the navigator', () => {
      // GIVEN
      const mediastream: MediastreamTest = new MediastreamTest();

      // WHEN
      const mediaDevices: MediaDevices = mediastream.getMediaDevices();

      // THEN
      expect(mediaDevices).toBe(navigator.mediaDevices);
    });

    it('should throw NotSupportedError without media devices', () => {
      // GIVEN
      spyOnProperty(navigator, 'mediaDevices').and.returnValue(undefined as unknown as MediaDevices);
      const mediastream: MediastreamTest = new MediastreamTest();

      // WHEN
      const getMediaDevices: () => MediaDevices = () => mediastream.getMediaDevices();

      // THEN
      expect(getMediaDevices).toThrowMatching((error: DOMException) => error.name === 'NotSupportedError');
    });
  });

  describe('_getUserMedia', () => {
    it('should emit the stream opened with the given constraints', async () => {
      // GIVEN
      const stream: MediaStream = createCameraStreamMock();
      const getUserMedia: jasmine.Spy = spyOn(navigator.mediaDevices, 'getUserMedia').and.resolveTo(stream);
      const mediastream: MediastreamTest = new MediastreamTest();
      const values: MediaStream[] = [];

      // WHEN
      const subscription: Subscription = mediastream.getUserMedia(constraints).subscribe((value: MediaStream) => values.push(value));
      await flushPromises();

      // THEN
      expect(getUserMedia).toHaveBeenCalledOnceWith(constraints);
      expect(values).toEqual([stream]);

      subscription.unsubscribe();
    });

    it('should not open the stream before subscription', () => {
      // GIVEN
      const getUserMedia: jasmine.Spy = spyOn(navigator.mediaDevices, 'getUserMedia').and.resolveTo(createCameraStreamMock());
      const mediastream: MediastreamTest = new MediastreamTest();

      // WHEN
      mediastream.getUserMedia(constraints);

      // THEN
      expect(getUserMedia).not.toHaveBeenCalled();
    });

    it('should error when the stream cannot be opened', async () => {
      // GIVEN
      const permissionError: DOMException = new DOMException('Permission denied', 'NotAllowedError');
      spyOn(navigator.mediaDevices, 'getUserMedia').and.rejectWith(permissionError);
      const mediastream: MediastreamTest = new MediastreamTest();
      let error: unknown;

      // WHEN
      mediastream.getUserMedia(constraints).subscribe({ error: (value: unknown) => error = value });
      await flushPromises();

      // THEN
      expect(error).toBe(permissionError);
    });

    it('should stop the tracks when unsubscribed', async () => {
      // GIVEN
      const stream: MediaStream = createCameraStreamMock();
      spyOn(navigator.mediaDevices, 'getUserMedia').and.resolveTo(stream);
      const mediastream: MediastreamTest = new MediastreamTest();
      const subscription: Subscription = mediastream.getUserMedia(constraints).subscribe();
      await flushPromises();

      // WHEN
      subscription.unsubscribe();

      // THEN
      expect(stream.getVideoTracks()[0].readyState).toBe('ended');
    });

    it('should stop a stream that opens after unsubscription', async () => {
      // GIVEN
      const stream: MediaStream = createCameraStreamMock();
      spyOn(navigator.mediaDevices, 'getUserMedia').and.resolveTo(stream);
      const mediastream: MediastreamTest = new MediastreamTest();
      const values: MediaStream[] = [];

      // WHEN
      mediastream.getUserMedia(constraints).subscribe((value: MediaStream) => values.push(value)).unsubscribe();
      await flushPromises();

      // THEN
      expect(values).toEqual([]);
      expect(stream.getVideoTracks()[0].readyState).toBe('ended');
    });

    it('should error with NotSupportedError without media devices', () => {
      // GIVEN
      spyOnProperty(navigator, 'mediaDevices').and.returnValue(undefined as unknown as MediaDevices);
      const mediastream: MediastreamTest = new MediastreamTest();
      let error: DOMException | undefined;

      // WHEN
      mediastream.getUserMedia(constraints).subscribe({ error: (value: DOMException) => error = value });

      // THEN
      expect(error?.name).toBe('NotSupportedError');
    });
  });

  describe('_stopMediastream', () => {
    it('should stop every track of the stream', () => {
      // GIVEN
      const stream: MediaStream = new MediaStream([
        ...createCameraStreamMock().getVideoTracks(),
        ...createCameraStreamMock().getVideoTracks()
      ]);
      const mediastream: MediastreamTest = new MediastreamTest();

      // WHEN
      mediastream.stopMediastream(stream);

      // THEN
      expect(stream.getTracks().length).toBe(2);
      expect(stream.getTracks().every((track: MediaStreamTrack) => track.readyState === 'ended')).toBeTrue();
    });
  });
});
