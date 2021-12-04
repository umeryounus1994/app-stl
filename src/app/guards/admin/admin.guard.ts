import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) { }


  canActivate() {
    if (this.auth.isLoggedIn && (this.auth.user.role === 0)) {
      return true;
    }

    this.router.navigateByUrl('dashboard/cashier');
    return false;
  }
}
