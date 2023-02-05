import { ModuleWithProviders, NgModule } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';

import { OpenairootModule } from './openai-root.module';
import { AOpenaiConfiguration } from './openai.class';
import { OpenaiService } from './openai.service';
import { OPENAI_TOKEN_CONFIGURATION } from './openai.token';
import { TOpenaiConfiguration } from './openai.type';


@NgModule({
  declarations: [
  ],
  imports: [
  ],
  exports: [
  ]
})
export class OpenaiModule {

  constructor() {
    throw new Error('Import OpenaiModule.forRoot static method!');
  }

  static forRoot(configuration: TOpenaiConfiguration): ModuleWithProviders<OpenairootModule> {
    return {
      ngModule: OpenairootModule,
      providers: [
        {
          provide: OpenaiService,
          useFactory: (configuration: AOpenaiConfiguration) => new OpenAIApi(configuration),
          deps: [OPENAI_TOKEN_CONFIGURATION]
        }, {
          provide: OPENAI_TOKEN_CONFIGURATION,
          useValue: new Configuration(configuration)
        }
      ]
    };
  }

}
