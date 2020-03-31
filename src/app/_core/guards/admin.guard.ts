import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/_shared/services';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor( private router: Router,
    private authenticationService: AuthenticationService){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = this.authenticationService.currentUserValue;
      
      if (currentUser) {
        console.log(currentUser.usuario.rol)
        console.log(next.data[0].roles.indexOf(currentUser.usuario.rol))
          // check if route is restricted by role
          if (next.data[0].roles && next.data[0].roles.indexOf(currentUser.usuario.rol) === -1) {
              // role not authorised so redirect to home page
              this.router.navigate(['/home']);
              return false;
          }

          // authorised so return true
          return true;
      }else if(!currentUser){

        // not logged in so redirect to login page with the return url
      this.router.navigate(['/autenticacion'], { queryParams: { returnUrl: state.url } });
      return true;
      }
  }
  
}
