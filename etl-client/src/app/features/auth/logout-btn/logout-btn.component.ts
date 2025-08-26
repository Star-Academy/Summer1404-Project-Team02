import {Component} from '@angular/core';
import {AuthService} from '../auth.service';
import {Button, ButtonIcon, ButtonLabel} from 'primeng/button';

@Component({
  selector: 'app-logout-btn',
  standalone: true,
  imports: [
    Button,
    ButtonIcon,
    ButtonLabel
  ],
  templateUrl: './logout-btn.component.html',
  styleUrl: './logout-btn.component.scss'
})
export class LogoutBtnComponent {
  constructor(private authService: AuthService) {
  }

  protected signOut(): void {
    this.authService.logout().subscribe();
  }
}
