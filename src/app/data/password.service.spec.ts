import { TestBed } from '@angular/core/testing';

import { PasswordService } from './password.service';

describe('PasswordService', () => {
  let service: PasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a random password', () => {
    const length = 5;
    let newPassword = '';
    service.getPassword(length, true, true, false).subscribe((result) => { 
      newPassword = result;
    });
    expect(newPassword.length).toEqual(length);
    expect(newPassword).toMatch(/\d/);
    expect(newPassword).toMatch(/[a-zA-Z]/);
  });
});
