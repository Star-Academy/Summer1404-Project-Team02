import {Component, OnInit} from '@angular/core';
import {AuthStore} from './features/auth/store/auth.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private authStore: AuthStore) {
  }

  ngOnInit() {
    this.authStore.checkAuth();
  }

}
