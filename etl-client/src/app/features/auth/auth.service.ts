import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export type AuthState =
  | { status: 'loading' }
  | { status: 'authenticated'; user: User }
  | { status: 'unauthenticated' };

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authState$ = new BehaviorSubject<AuthState>({status: 'loading'});

  constructor(private http: HttpClient) {
  }

  public get authState$(): Observable<AuthState> {
    return this._authState$.asObservable();
  }

  public get currentState(): AuthState {
    return this._authState$.value;
  }

  public checkAuth(): Observable<AuthState> {
    return this.http.get<User>('/user/profile').pipe(
      map((user: User) => {
        const state: AuthState = {status: 'authenticated', user};
        this._authState$.next(state);
        return state;
      }),
      catchError(() => {
        const state: AuthState = {status: 'unauthenticated'};
        this._authState$.next(state);
        return of(state);
      })
    );
  }

  public logout(): Observable<void> {
    return this.http.post<void>('/auth/logout', null, {}).pipe(
      map(() => {
        this._authState$.next({status: 'unauthenticated'});
      })
    );
  }

  public getLoginUrl(): Observable<{ redirectUrl: string }> {
    return this.http.get<{ redirectUrl: string }>('/auth/login?redirectPath=/auth/callback');
  }

  public exchangeCodeForSession(code: string, redirectPath: string): Observable<User> {
    return this.http.post<User>('/auth/login-callback', {code, redirectPath}).pipe(
      map(user => {
        this._authState$.next({status: 'authenticated', user});
        return user;
      })
    );
  }
}
