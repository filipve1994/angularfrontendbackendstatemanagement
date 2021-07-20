import { TestBed } from '@angular/core/testing';

import { TodoBackendService } from './todo-backend.service';

describe('TodoBackendService', () => {
  let service: TodoBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
