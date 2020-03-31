import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/_shared/services';

@Injectable({
  providedIn: 'root'
})
export class FundacionGuard implements CanActivate {
  constructor( private router: Router,
    private authenticationService: AuthenticationService){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = this.authenticationService.currentUserValue;
      if (currentUser) {
          if (next.data[0].roles && next.data[0].roles.indexOf(currentUser.usuario.rol) === -1) {
              this.router.navigate(['/home']);
              return false;
          }
          return true;
      }else if(!currentUser){
      this.router.navigate(['/autenticacion'], { queryParams: { returnUrl: state.url } });
      return true;
      }

  }
  
}
