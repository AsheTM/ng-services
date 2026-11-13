import { AfterViewInit, Directive, ElementRef, Input, inject } from '@angular/core';
import { isBrowser } from '@ashetm/platform';
import { Maybe } from '@ashetm/types';


/**
 * Focuses the element once it's rendered. `[ashetmAutofocus]="false"` disables it.
 */
@Directive({
  selector: '[ashetmAutofocus]',
  standalone: true
})
export class AutofocusDirective implements AfterViewInit {

  @Input() ashetmAutofocus: Maybe<boolean | ''> = true;

  private readonly _elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  ngAfterViewInit(): void {
    if (this.ashetmAutofocus !== false && isBrowser()) {
      this._elementRef.nativeElement.focus();
    }
  }

}
