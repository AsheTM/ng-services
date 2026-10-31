import { Observable, Subscriber } from "rxjs";

export abstract class AMediastream {

  protected readonly NAVIGATOR: Navigator = window.navigator;
  protected readonly MEDIA_DEVICES: MediaDevices = this.NAVIGATOR.mediaDevices;

  /**
   * Opens a media stream, and stops its tracks when unsubscribed
   */
  protected _getUserMedia(constraints: MediaStreamConstraints): Observable<MediaStream> {
    return new Observable<MediaStream>((subscriber: Subscriber<MediaStream>) => {
      let mediastream: MediaStream | undefined;
      let unsubscribed: boolean = false;

      this.MEDIA_DEVICES.getUserMedia(constraints).then(
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
