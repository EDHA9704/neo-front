import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../_shared/services';
@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuard implements CanLoad {
  constructor(private router: Router,
    private authenticationService: AuthenticationService){}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      const currentUser = this.authenticationService.currentUserValue;
      console.log(currentUser)
console.log("ENTRO GUARD")
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

    //return true;
  }
}
