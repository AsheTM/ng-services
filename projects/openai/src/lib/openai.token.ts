import { InjectionToken } from "@angular/core";

import { AOpenaiConfiguration } from "./openai.class";


export const OPENAI_TOKEN_CONFIGURATION: InjectionToken<AOpenaiConfiguration>
  = new InjectionToken<AOpenaiConfiguration>('OPENAI_TOKEN_CONFIGURATION');
