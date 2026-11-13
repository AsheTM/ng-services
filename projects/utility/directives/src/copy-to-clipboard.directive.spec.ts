import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyToClipboardDirective } from './copy-to-clipboard.directive';


@Component({
  standalone: true,
  imports: [CopyToClipboardDirective],
  template: `<button [ashetmCopyToClipboard]="text" (copied)="copied = $event" (copyFailed)="failed = $event">Copy</button>`
})
class HostComponent {
  text: string = 'Hello';
  copied?: string;
  failed?: unknown;
}

describe('CopyToClipboardDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('should copy the text and emit copied', async () => {
    // GIVEN
    const writeText: jasmine.Spy = spyOn(navigator.clipboard, 'writeText').and.resolveTo();

    // WHEN
    fixture.nativeElement.querySelector('button').click();
    await fixture.whenStable();

    // THEN
    expect(writeText).toHaveBeenCalledOnceWith('Hello');
    expect(fixture.componentInstance.copied).toBe('Hello');
  });

  it('should emit copyFailed when copying fails', async () => {
    // GIVEN
    spyOn(navigator.clipboard, 'writeText').and.rejectWith(new DOMException('Denied', 'NotAllowedError'));

    // WHEN
    fixture.nativeElement.querySelector('button').click();
    await fixture.whenStable();

    // THEN
    expect((fixture.componentInstance.failed as DOMException).name).toBe('NotAllowedError');
  });

  it('should emit a NotSupportedError when the clipboard is not available', () => {
    // GIVEN
    spyOnProperty(navigator, 'clipboard').and.returnValue(undefined as unknown as Clipboard);

    // WHEN
    fixture.nativeElement.querySelector('button').click();

    // THEN
    expect((fixture.componentInstance.failed as DOMException).name).toBe('NotSupportedError');
  });
});
