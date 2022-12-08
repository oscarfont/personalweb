import { TestBed } from '@angular/core/testing';

import { NavbarsyncService } from './swiperoute.service';

describe('NavbarsyncService', () => {
  let service: NavbarsyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarsyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
