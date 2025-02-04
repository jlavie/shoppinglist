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
  private url = 'http://localhost:3200/api/session/user/';
  user = signal<User | null | undefined>(undefined);

  login(credentials: LoginCredentials): Observable<any> {
    return this.http.post(this.url + 'login/', credentials).pipe(
      tap({
        next: (result: any) => {
          console.log(result)
          // localStorage.setItem('token', result['token']);
          // const user = Object.assign(new User(), result['user']);
          // this.user.set(user);
        }
      }),
      map(result => {return this.user();})
    )
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

  logout() {
    return this.http.get(this.url + 'logout/').pipe(
      tap({
        next: result => {
          localStorage.removeItem('token');
          this.user.set(null);
        }
      })
    )
  }
}
