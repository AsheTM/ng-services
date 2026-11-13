import { Directive, ElementRef, EventEmitter, HostListener, Output, inject } from '@angular/core';


/**
 * Emits when the user clicks outside the element
 */
@Directive({
  selector: '[ashetmClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {

  @Output() readonly ashetmClickOutside: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  private readonly _elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // The event path still contains the clicked element, even if it was removed from the page since
    const path: EventTarget[] = event.composedPath();

    if (!path.includes(this._elementRef.nativeElement)) {
      this.ashetmClickOutside.emit(event);
    }
  }

}
