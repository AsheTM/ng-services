import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { isBrowser } from '@ashetm/platform';


/**
 * Copies the given text to the clipboard on click.
 * `copyFailed` gets a `NotSupportedError` when the clipboard isn't available (server, page not served over HTTPS).
 */
@Directive({
  selector: '[ashetmCopyToClipboard]',
  standalone: true
})
export class CopyToClipboardDirective {

  @Input('ashetmCopyToClipboard') text: string | null | undefined = '';

  @Output() readonly copied: EventEmitter<string> = new EventEmitter<string>();
  @Output() readonly copyFailed: EventEmitter<unknown> = new EventEmitter<unknown>();

  @HostListener('click')
  onClick(): void {
    const text: string = this.text ?? '';

    if (!isBrowser() || !navigator.clipboard) {
      this.copyFailed.emit(new DOMException('The clipboard is not available', 'NotSupportedError'));
      return;
    }

    navigator.clipboard.writeText(text).then(
      () => this.copied.emit(text),
      (error: unknown) => this.copyFailed.emit(error)
    );
  }

}
