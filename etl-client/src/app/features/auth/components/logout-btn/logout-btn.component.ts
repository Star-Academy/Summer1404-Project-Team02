import {Component} from '@angular/core';
import {Button, ButtonIcon, ButtonLabel} from 'primeng/button';
import {AuthStore} from '../../store/auth.store';

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
  constructor(private authStore: AuthStore) {
  }

  protected signOut(): void {
    this.authStore.logout().subscribe();
  }
}
