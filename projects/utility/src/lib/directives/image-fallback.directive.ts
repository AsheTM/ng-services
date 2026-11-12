import { Directive, ElementRef, HostListener, Input } from '@angular/core';


/**
 * Shows the fallback image when the image fails to load (only once, if the fallback fails too)
 */
@Directive({
  selector: 'img[ashetmImageFallback]',
  standalone: true
})
export class ImageFallbackDirective {

  @Input('ashetmImageFallback') fallback: string | null | undefined;

  constructor(private readonly _elementRef: ElementRef<HTMLImageElement>) { }

  @HostListener('error')
  onError(): void {
    const image: HTMLImageElement = this._elementRef.nativeElement;

    if (this.fallback && image.getAttribute('src') !== this.fallback) {
      image.src = this.fallback;
    }
  }

}
