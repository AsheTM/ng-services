import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, Output, inject } from '@angular/core';
import { isBrowser } from '@ashetm/platform';


/**
 * Emits `true` when the element enters the screen and `false` when it leaves it (`IntersectionObserver`).
 * `ashetmInViewportThreshold` (0 to 1, default 0) is the visible part needed.
 * Does nothing on the server or without `IntersectionObserver`.
 */
@Directive({
  selector: '[ashetmInViewport]',
  standalone: true
})
export class InViewportDirective implements AfterViewInit, OnDestroy {

  @Input() ashetmInViewportThreshold: number = 0;

  @Output() readonly ashetmInViewport: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _observer?: IntersectionObserver;
  private _visible?: boolean;

  private readonly _elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly _ngZone: NgZone = inject(NgZone);

  ngAfterViewInit(): void {
    if (!isBrowser() || typeof IntersectionObserver === 'undefined') {
      return;
    }

    this._observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      const visible: boolean = entries[entries.length - 1].isIntersecting;

      if (visible !== this._visible) {
        this._visible = visible;
        // IntersectionObserver callbacks run outside Angular
        this._ngZone.run(() => this.ashetmInViewport.emit(visible));
      }
    }, { threshold: this.ashetmInViewportThreshold });

    this._observer.observe(this._elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this._observer?.disconnect();
  }

}
