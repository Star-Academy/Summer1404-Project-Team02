import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../users/models/user.model';
import {ChangePasswordPayload, GetLoginUrlPayload, LoginCallbackPayload} from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  public checkAuth(): Observable<User> {
    return this.http.get<User>('/user/profile');
  }

  public getLoginUrl(): Observable<GetLoginUrlPayload> {
    return this.http.get<GetLoginUrlPayload>(
      '/auth/login?redirectPath=/auth/callback'
    );
  }

  public exchangeCodeForSession(data: LoginCallbackPayload): Observable<User> {
    return this.http.post<User>('/auth/login-callback', {...data});
  }

  public changePassword(payload: ChangePasswordPayload): Observable<void> {
    return this.http.post<void>('/auth/change-pass', payload);
  }

  public logout(): Observable<void> {
    return this.http.post<void>('/auth/logout', null);
  }
}
