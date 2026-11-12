import { NgModule } from '@angular/core';

import {
  AutofocusDirective
} from './directives';


@NgModule({
  exports: [
    AutofocusDirective
  ],
  imports: [
    AutofocusDirective
  ],
})
export class UtilityDirectivesModule { }
