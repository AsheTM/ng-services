import { NgZone } from "@angular/core";
import { Observable, Subscriber } from "rxjs";


export class BroadcastChannelRef<T> {

  /**
   * Each subscriber gets its own listeners, removed when it unsubscribes.
   * A message that can't be read is skipped with a warning, the stream keeps going.
   */
  readonly data$: Observable<T> = new Observable<T>((subscriber: Subscriber<T>) => {
    const onMessage = (event: MessageEvent<T>) => {
      this._ngZone.run(() => subscriber.next(event.data));
    };
    const onMessageError = (event: MessageEvent<T>) => {
      console.warn(`[@ashetm/ng-broadcast-channel] A message on channel "${this.name}" could not be read and was skipped.`, event);
    };

    this._broadcastChannel.addEventListener('message', onMessage);
    this._broadcastChannel.addEventListener('messageerror', onMessageError);

    return () => {
      this._broadcastChannel.removeEventListener('message', onMessage);
      this._broadcastChannel.removeEventListener('messageerror', onMessageError);
    };
  });

  private readonly _broadcastChannel: BroadcastChannel;

  get name(): string {
    return this._broadcastChannel.name;
  }

  constructor(
    private readonly _ngZone: NgZone,
    private readonly _name: string
  ) {
    this._broadcastChannel = new BroadcastChannel(_name);
  }

  close(): void {
    this._broadcastChannel.close();
  }

  send(data: T): void {
    this._broadcastChannel.postMessage(data);
  }

}
