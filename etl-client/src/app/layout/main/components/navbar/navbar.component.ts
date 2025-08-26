import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {
  HomeNavbarAuthStatusComponent
} from '../../../../features/auth/home-navbar-auth-status/home-navbar-auth-status.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    HomeNavbarAuthStatusComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
