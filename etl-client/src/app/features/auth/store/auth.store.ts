import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {AuthService} from '../services/auth.service';
import {exhaustMap} from 'rxjs';
import {AuthState, LoginCallbackPayload} from '../models/auth.model';
import {tapResponse} from '@ngrx/operators';
import {User} from '../../users/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthStore extends ComponentStore<AuthState> {
  public readonly authState$ = this.select(state => state);
  public readonly isAuthenticated$ = this.select(
    state => state.status === 'authenticated'
  );
  public readonly user$ = this.select(
    state => state.status === 'authenticated' ? state.user : null
  );

  constructor(private authService: AuthService) {
    super({status: 'loading'});
  }

  public readonly setAuthState = this.updater<AuthState>((_, newState) => newState);

  public readonly checkAuth = this.effect<void>(trigger$ =>
    trigger$.pipe(
      exhaustMap(() =>
        this.authService.checkAuth().pipe(
          tapResponse({
            next: (user: User) => this.setAuthState({status: 'authenticated', user}),
            error: () => this.setAuthState({status: 'unauthenticated'}),
          })
        )
      )
    )
  );

  public readonly exchangeCodeForSession = this.effect<LoginCallbackPayload>(params$ =>
    params$.pipe(
      exhaustMap(({code, redirectPath}) =>
        this.authService.exchangeCodeForSession({code, redirectPath}).pipe(
          tapResponse({
            next: (user: User) => this.setAuthState({status: 'authenticated', user}),
            error: () => this.setAuthState({status: 'unauthenticated'}),
          })
        )
      )
    )
  );

  public readonly logout = this.effect<void>(trigger$ =>
    trigger$.pipe(
      exhaustMap(() =>
        this.authService.logout().pipe(
          tapResponse({
            next: () => this.setAuthState({status: 'unauthenticated'}),
            error: () => this.setAuthState({status: 'unauthenticated'}),
          })
        )
      )
    )
  );
}
