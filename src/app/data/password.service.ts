import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  password: string = '';

  getPassword(
    length: number,
    text: boolean = false,
    numeric: boolean = false,
    symbol: boolean = false
  ): Observable<string> {
    let i: number = 0;
    this.password = '';
    while (i < length) {
      if (text && i < length) {
        this.password += this.getRandomLower();
        i += 1;
      }
      if (numeric && i < length) {
        this.password += this.getRandomNumber();
        i += 1;
      }
      if (symbol && i < length) {
        this.password += this.getRandomSymbol();
        i += 1;
      }
    }
    return of(this.password);
  }

  getRandomLower(): String {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  getRandomNumber(): String {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }

  getRandomSymbol(): String {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
  }
}
