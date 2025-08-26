import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {Menu} from "primeng/menu";
import {MenuItem} from 'primeng/api';
import {AuthService} from '../../../../../../features/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-profile-btn',
  standalone: true,
  imports: [
    Button,
    Menu,

  ],
  templateUrl: './user-profile-btn.component.html',
  styleUrl: './user-profile-btn.component.scss'
})
export class UserProfileBtnComponent implements OnInit {
  protected menuItems!: MenuItem[];

  constructor(private authService: AuthService, private router: Router,) {
  }

  ngOnInit() {
    this.menuItems = [
      {
        label: 'User Profile',
        icon: 'pi pi-user',
      },
      {
        label: "Logout", icon: "pi pi-sign-out",
        command: () => {
          this.authService.logout().subscribe(() => {
            this.router.navigate(['/']);
          });
        }
      }];
  }

}
