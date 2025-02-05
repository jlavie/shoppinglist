import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../user/user.model';
import { LoginCredentials } from './login.utils';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3200/api/auth';
  user = signal<User | null | undefined>(undefined);

  register(user: any): Observable<any> {
    return this.http.post(this.url + '/register', user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.url}/login`, credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn():boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getUser(): Observable<any> {
    return this.http.get(this.url + 'me/').pipe(
      tap({
        next: result => {
          const user = Object.assign(new User(), result);
          this.user.set(user);
        }
      }),
      map(result => {return this.user();})
    )
  }
}
