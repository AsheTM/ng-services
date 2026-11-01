import { isBrowser } from "@ashetm/platform";
import { EMPTY, Observable, Subscriber } from "rxjs";

export abstract class AMediastream {

  protected readonly NAVIGATOR: Navigator | undefined = isBrowser() ? window.navigator : undefined;
  protected readonly MEDIA_DEVICES: MediaDevices | undefined = this.NAVIGATOR?.mediaDevices;

  /**
   * Returns the media devices, or throws a `NotSupportedError` when they aren't available
   * (server-side rendering, insecure context)
   */
  protected _getMediaDevices(): MediaDevices {
    if (!this.MEDIA_DEVICES) {
      throw new DOMException('Media devices are not available', 'NotSupportedError');
    }

    return this.MEDIA_DEVICES;
  }

  /**
   * Opens a media stream, and stops its tracks when unsubscribed.
   * Emits nothing on the server.
   */
  protected _getUserMedia(constraints: MediaStreamConstraints): Observable<MediaStream> {
    if (!isBrowser()) {
      return EMPTY;
    }

    return new Observable<MediaStream>((subscriber: Subscriber<MediaStream>) => {
      let mediastream: MediaStream | undefined;
      let unsubscribed: boolean = false;

      this._getMediaDevices().getUserMedia(constraints).then(
        (value: MediaStream) => {
          if (unsubscribed) {
            this._stopMediastream(value);
            return;
          }

          mediastream = value;
          subscriber.next(value);
        },
        (error: unknown) => subscriber.error(error)
      );

      return () => {
        unsubscribed = true;

        if (mediastream) {
          this._stopMediastream(mediastream);
        }
      };
    });
  }

  protected _stopMediastream(mediastream: MediaStream): void {
    mediastream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
  }

}
