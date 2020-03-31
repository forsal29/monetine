import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';

import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isUserLogged = false;
  constructor(private authService: NbAuthService, private router: Router){}
  canActivate(){
    return this.authService.isAuthenticated()
    .pipe(
      tap(authenticated => {
    //    console.log(authenticated);
        if (!authenticated) {
          this.router.navigate(['auth/login']);
        }
      }),
    );

  }
}