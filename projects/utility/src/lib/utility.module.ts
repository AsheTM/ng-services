import { NgModule } from '@angular/core';

import { UtilityDirectivesModule } from './utility-directives.module';
import { UtilityPipesModule } from './utility-pipes.module';


@NgModule({
  exports: [UtilityDirectivesModule, UtilityPipesModule]
})
export class UtilityModule { }
