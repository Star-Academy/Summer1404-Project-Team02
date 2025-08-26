import {Component, OnInit} from '@angular/core';
import {AuthService, AuthState} from '../auth.service';
import {SignInBtnComponent} from '../sign-in-btn/sign-in-btn.component';
import {LogoutBtnComponent} from '../logout-btn/logout-btn.component';

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

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.authState$.subscribe(state => {
      this.authStatus = state
    })
  }
}
