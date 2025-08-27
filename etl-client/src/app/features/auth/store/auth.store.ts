import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, of} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {AuthState} from '../models/auth.model';
import {User} from '../../users/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  private readonly _authState$ = new BehaviorSubject<AuthState>({status: 'loading'});

  constructor(private authService: AuthService) {
  }

  get authState$() {
    return this._authState$.asObservable();
  }

  get currentState(): AuthState {
    return this._authState$.value;
  }

  public checkAuth() {
    return this.authService.checkAuth().pipe(
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

  public exchangeCodeForSession(code: string, redirectPath: string) {
    return this.authService.exchangeCodeForSession(code, redirectPath).pipe(
      map((user: User) => {
        const state: AuthState = {status: 'authenticated', user};
        this._authState$.next(state);
        return user;
      })
    );
  }

  public logout() {
    return this.authService.logout().pipe(
      map(() => {
        this._authState$.next({status: 'unauthenticated'});
      })
    );
  }
}
