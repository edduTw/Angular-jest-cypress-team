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

  it('should return a password with letters and length = 8', () => {
    service.getPassword(8, true).subscribe((value) => {
      const reg = new RegExp('^d+$');
      expect(value).toHaveLength(8);
      expect(reg.test(value)).toBe(true);
    });
  });
  it('should return a password with numbers and length = 8', () => {
    service.getPassword(8, false, true).subscribe((value) => {
      const reg = new RegExp(/^[a-zA-Z]+$/);
      expect(value).toHaveLength(8);
      expect(reg.test(value)).toBe(true);
    });
  });

  it('should return a password with symbols and length = 8', () => {
    service.getPassword(8, false, false, true).subscribe((value) => {
      const reg = new RegExp('[!@#$%^&*(){}[]=<>/,.]');
      expect(value).toHaveLength(8);
      expect(reg.test(value)).toBe(true);
    });
  });

  it('should return a password with letters and numbers and length = 8', () => {
    service.getPassword(8, true, true, false).subscribe((value) => {
      const reg = new RegExp('/^[A-Za-z0-9]*$/');
      expect(value).toHaveLength(8);
      expect(reg.test(value)).toBe(true);
    });
  });
  it('should return a password with letters and numbers and length = 8', () => {
    service.getPassword(8, true, true, true).subscribe((value) => {
      const reg = new RegExp('/^[A-Za-z0-9*$/!@#$%^&*(){}[]=<>/,.]');
      expect(value).toHaveLength(8);
      expect(reg.test(value)).toBe(true);
    });
  });
});
