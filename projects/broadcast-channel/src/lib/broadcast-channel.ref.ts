import { NgZone } from "@angular/core";
import { Observable, Subject, Subscriber, Subscription } from "rxjs";


export class BroadcastChannelRef<T> {

  /**
   * Each subscriber gets its own listeners, removed when it unsubscribes.
   * A message that can't be read is skipped with a warning, the stream keeps going.
   * Completes when the channel is closed.
   */
  readonly data$: Observable<T> = new Observable<T>((subscriber: Subscriber<T>) => {
    if (this._closed) {
      subscriber.complete();
      return;
    }

    const onMessage = (event: MessageEvent<T>) => {
      this._ngZone.run(() => subscriber.next(event.data));
    };
    const onMessageError = (event: MessageEvent<T>) => {
      console.warn(`[@ashetm/ng-broadcast-channel] A message on channel "${this.name}" could not be read and was skipped.`, event);
    };
    const closeSubscription: Subscription = this._close$.subscribe(() => subscriber.complete());

    this._broadcastChannel.addEventListener('message', onMessage);
    this._broadcastChannel.addEventListener('messageerror', onMessageError);

    return () => {
      closeSubscription.unsubscribe();
      this._broadcastChannel.removeEventListener('message', onMessage);
      this._broadcastChannel.removeEventListener('messageerror', onMessageError);
    };
  });

  private readonly _broadcastChannel: BroadcastChannel;
  private readonly _close$: Subject<void> = new Subject<void>();
  private _closed: boolean = false;

  get name(): string {
    return this._broadcastChannel.name;
  }

  /**
   * @param _onClose called once, when the channel is closed (used by `BroadcastChannelService` to forget it)
   */
  constructor(
    private readonly _ngZone: NgZone,
    private readonly _name: string,
    private readonly _onClose?: () => void
  ) {
    this._broadcastChannel = new BroadcastChannel(_name);
  }

  close(): void {
    if (this._closed) {
      return;
    }

    this._closed = true;
    this._broadcastChannel.close();
    this._close$.next();
    this._close$.complete();
    this._onClose?.();
  }

  send(data: T): void {
    this._broadcastChannel.postMessage(data);
  }

}
