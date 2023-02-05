import { TestBed } from '@angular/core/testing';

import { OpenaiModule } from './openai.module';
import { OpenaiService } from './openai.service';


describe('OpenaiService', () => {
  let service: OpenaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OpenaiModule.forRoot({
        apiKey: 'TEST_API_KEY'
      })]
    });
    service = TestBed.inject(OpenaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
