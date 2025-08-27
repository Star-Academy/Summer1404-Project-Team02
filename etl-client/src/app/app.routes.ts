import {Routes} from '@angular/router';
import {MainComponent} from './layout/main/main.component';
import {AuthCallbackComponent} from './features/auth/components/auth-callback/auth-callback.component';
import {AuthGuard} from './features/auth/guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: "auth/callback",
    component: AuthCallbackComponent
  },
  {
    path: '', component: MainComponent,
    loadChildren: () => import("./layout/main/main.module").then(m => m.MainModule)
  },
  {
    path: 'dashboard', loadChildren: () => import("./layout/dashboard/dashboard.module").then(m => m.DashboardModule),
    canMatch: [AuthGuard]
  }
]
