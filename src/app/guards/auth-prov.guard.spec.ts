import { TestBed } from '@angular/core/testing';

import { AuthProvGuard } from './auth-prov.guard';

describe('AuthProvGuard', () => {
  let guard: AuthProvGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthProvGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
