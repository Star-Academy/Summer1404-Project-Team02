import {Component, OnInit} from '@angular/core';
import {SignInBtnComponent} from '../sign-in-btn/sign-in-btn.component';
import {LogoutBtnComponent} from '../logout-btn/logout-btn.component';
import {AuthState} from '../../models/auth.model';
import {AuthStore} from '../../store/auth.store';

@Component({
  selector: 'app-home-navbar-auth-status',
  standalone: true,
  imports: [
    SignInBtnComponent,
    LogoutBtnComponent
  ],
  templateUrl: './home-navbar-auth-status.component.html',
  styleUrl: './home-navbar-auth-status.component.scss'
})
export class HomeNavbarAuthStatusComponent implements OnInit {
  protected authStatus!: AuthState;

  constructor(private authStore: AuthStore) {
  }

  ngOnInit() {
    this.authStore.authState$.subscribe(state => {
      this.authStatus = state
    })
  }
}
