import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { isBrowser } from '@ashetm/platform';


/**
 * Focuses the element once it's rendered. `[ashetmAutofocus]="false"` disables it.
 */
@Directive({
  selector: '[ashetmAutofocus]',
  standalone: true
})
export class AutofocusDirective implements AfterViewInit {

  @Input() ashetmAutofocus: boolean | '' | null | undefined = true;

  constructor(private readonly _elementRef: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void {
    if (this.ashetmAutofocus !== false && isBrowser()) {
      this._elementRef.nativeElement.focus();
    }
  }

}
