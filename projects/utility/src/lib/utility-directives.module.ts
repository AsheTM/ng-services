import { NgModule } from '@angular/core';

import {
  AutofocusDirective,
  ClickOutsideDirective,
  CopyToClipboardDirective,
  DebounceClickDirective,
  ImageFallbackDirective,
  InViewportDirective,
  TrimOnBlurDirective
} from './directives';


@NgModule({
  exports: [
    AutofocusDirective,
    ClickOutsideDirective,
    CopyToClipboardDirective,
    DebounceClickDirective,
    ImageFallbackDirective,
    InViewportDirective,
    TrimOnBlurDirective
  ],
  imports: [
    AutofocusDirective,
    ClickOutsideDirective,
    CopyToClipboardDirective,
    DebounceClickDirective,
    ImageFallbackDirective,
    InViewportDirective,
    TrimOnBlurDirective
  ],
})
export class UtilityDirectivesModule { }
