import { Observable, Subscriber } from "rxjs";


export class BroadcastChannelRef<T> {

  readonly data$: Observable<T> = new Observable<T>((subscriber: Subscriber<T>) => {
    this._broadcastChannel.onmessage = (event: MessageEvent<T>) => {
      subscriber.next(event.data);
    };
    this._broadcastChannel.onmessageerror = (event: MessageEvent<T>) => {
      subscriber.error(event.data);
    };
  });

  private readonly _broadcastChannel: BroadcastChannel;

  get name(): string {
    return this._broadcastChannel.name;
  }

  constructor(private readonly _name: string) {
    this._broadcastChannel = new BroadcastChannel(_name);
  }

  close(): void {
    this._broadcastChannel.close();
  }

  send(data: T): void {
    this._broadcastChannel.postMessage(data);
  }

}
