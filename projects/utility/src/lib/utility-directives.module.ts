import { NgModule } from '@angular/core';

import {
  AutofocusDirective,
  ClickOutsideDirective,
  CopyToClipboardDirective,
  DebounceClickDirective,
  ImageFallbackDirective,
  InViewportDirective
} from './directives';


@NgModule({
  exports: [
    AutofocusDirective,
    ClickOutsideDirective,
    CopyToClipboardDirective,
    DebounceClickDirective,
    ImageFallbackDirective,
    InViewportDirective
  ],
  imports: [
    AutofocusDirective,
    ClickOutsideDirective,
    CopyToClipboardDirective,
    DebounceClickDirective,
    ImageFallbackDirective,
    InViewportDirective
  ],
})
export class UtilityDirectivesModule { }
