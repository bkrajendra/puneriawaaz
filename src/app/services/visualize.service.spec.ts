import { TestBed } from '@angular/core/testing';

import { VisualizeService } from './visualize.service';

describe('VisualizeService', () => {
  let service: VisualizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
