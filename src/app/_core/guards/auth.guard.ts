import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../_shared/services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = this.authenticationService.currentUserValue;
      console.log(currentUser)
      console.log("ENTRO GUARD2")
      if(!currentUser){
        return true
      }else{
        if(currentUser.usuario.rol == '4'){
          this.router.navigate(['/fundacion',currentUser.usuario._id,'nosotros']);
          return false
        }else if(currentUser.usuario.rol == '1'){
          this.router.navigate(['/admin']);
          return false
        }else{
          this.router.navigate(['/forbiden']);
          return false
        }
      
      
      }

      
  }
  
  
}
