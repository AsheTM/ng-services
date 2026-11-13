import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';


/**
 * Emits the first click right away, then ignores clicks for `ashetmDebounceClickTime` ms (default 500).
 * Prevents double submits.
 */
@Directive({
  selector: '[ashetmDebounceClick]',
  standalone: true
})
export class DebounceClickDirective {

  @Input() ashetmDebounceClickTime: number = 500;

  @Output() readonly ashetmDebounceClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  private _lastClick: number = -Infinity;

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    const now: number = Date.now();

    if (now - this._lastClick < this.ashetmDebounceClickTime) {
      return;
    }

    this._lastClick = now;
    this.ashetmDebounceClick.emit(event);
  }

}
