import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../users/models/user.model';
import {ChangePasswordPayload} from '../models/auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  public checkAuth(): Observable<User> {
    return this.http.get<User>('/user/profile');
  }

  public getLoginUrl(): Observable<{ redirectUrl: string }> {
    return this.http.get<{ redirectUrl: string }>(
      '/auth/login?redirectPath=/auth/callback'
    );
  }

  public exchangeCodeForSession(code: string, redirectPath: string): Observable<User> {
    return this.http.post<User>('/auth/login-callback', {code, redirectPath});
  }

  public changePassword(payload: ChangePasswordPayload): Observable<void> {
    return this.http.post<void>('/auth/change-pass', payload);
  }

  public logout(): Observable<void> {
    return this.http.post<void>('/auth/logout', null);
  }
}
