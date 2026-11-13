import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Nullable } from '@ashetm/types';


/**
 * Trims the text of an input or textarea when leaving the field.
 * Works with plain fields, reactive forms and `ngModel` (also with `updateOn: 'blur'`).
 */
@Directive({
  selector: 'input[ashetmTrimOnBlur], textarea[ashetmTrimOnBlur]',
  standalone: true
})
export class TrimOnBlurDirective {

  private readonly _elementRef: ElementRef<HTMLInputElement | HTMLTextAreaElement> = inject(ElementRef);
  private readonly _ngControl: Nullable<NgControl> = inject(NgControl, { optional: true, self: true });

  @HostListener('blur')
  onBlur(): void {
    const element: HTMLInputElement | HTMLTextAreaElement = this._elementRef.nativeElement;
    const trimmed: string = element.value.trim();

    if (trimmed === element.value) {
      return;
    }

    element.value = trimmed;
    // Lets Angular forms (reactive and ngModel) see the new value
    element.dispatchEvent(new Event('input'));

    // With `updateOn: 'blur'`, the pending value may already have been committed
    if (this._ngControl?.control?.updateOn === 'blur') {
      this._ngControl.control.setValue(trimmed);
    }
  }

}
