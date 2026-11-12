import { NgModule } from '@angular/core';

import {
  AutofocusDirective,
  ClickOutsideDirective,
  CopyToClipboardDirective,
  ImageFallbackDirective
} from './directives';


@NgModule({
  exports: [
    AutofocusDirective,
    ClickOutsideDirective,
    CopyToClipboardDirective,
    ImageFallbackDirective
  ],
  imports: [
    AutofocusDirective,
    ClickOutsideDirective,
    CopyToClipboardDirective,
    ImageFallbackDirective
  ],
})
export class UtilityDirectivesModule { }
