import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  

  getPassword(
    length: number,
    text: boolean = false,
    numeric: boolean = false,
    symbol: boolean = false
  ): Observable<string> {
    let i: number = 0;
    let password: string = '';
    
    while (i < length) {
      if (text && i < length) {
        let letter = this.getRandomLower();
        password += (i % 3 === 0) ? letter.toUpperCase() : letter ;
        i += 1;
      }
      if (numeric && i < length) {
        password += this.getRandomNumber();
        i += 1;
      }
      if (symbol && i < length) {
        password += this.getRandomSymbol();
        i += 1;
      }
    }
    password=password.split('').sort(function(){return 0.5-Math.random()}).join('');
    return of(password);
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
