import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';


@Injectable()
export class OpenaiService extends OpenAIApi {

  constructor() {
    super(new Configuration({
      apiKey: ''
    }));

    throw new Error('Do not instanciate directly!');
  }

}
