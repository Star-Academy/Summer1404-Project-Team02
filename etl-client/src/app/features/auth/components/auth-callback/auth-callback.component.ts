import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthStore} from '../../store/auth.store';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.scss'
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authStore: AuthStore
  ) {
  }

  ngOnInit() {
    const code = this.route.snapshot.queryParamMap.get('code');

    if (code) {
      this.authStore.exchangeCodeForSession({code, redirectPath: '/auth/callback'});

      this.authStore.isAuthenticated$.subscribe(isAuth => {
        if (isAuth) {
          this.router.navigate(['/dashboard']);
        }
      });

      this.authStore.authState$.subscribe(state => {
        if (state.status === 'unauthenticated') {
          this.router.navigate(['/']);
        }
      });
    } else {
      this.router.navigate(['/']);
    }
  }
}
