import { TestBed } from '@angular/core/testing';

import { UiStateStoreService } from './ui-state-store.service';

describe('UiStateStoreService', () => {
  let service: UiStateStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiStateStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
