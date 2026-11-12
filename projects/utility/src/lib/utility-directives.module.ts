import { NgModule } from '@angular/core';

import {
  AutofocusDirective,
  ClickOutsideDirective,
  CopyToClipboardDirective,
  DebounceClickDirective,
  ImageFallbackDirective
} from './directives';


@NgModule({
  exports: [
    AutofocusDirective,
    ClickOutsideDirective,
    CopyToClipboardDirective,
    DebounceClickDirective,
    ImageFallbackDirective
  ],
  imports: [
    AutofocusDirective,
    ClickOutsideDirective,
    CopyToClipboardDirective,
    DebounceClickDirective,
    ImageFallbackDirective
  ],
})
export class UtilityDirectivesModule { }
