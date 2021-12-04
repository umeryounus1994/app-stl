import { Routes, RouterModule } from '@angular/router';

export const full: Routes = [
  {
    path: 'auth',
    loadChildren: './pages/auth/auth.module#AuthModule'
  },
];
