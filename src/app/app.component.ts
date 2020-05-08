import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_shared/services';
import { User, Role } from './_models';
import $ from "jquery";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'neo-front';
  currentUser: User; 
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    public zone: NgZone
) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x
    }
     );
}
get isAdmin() {
  return this.currentUser && this.currentUser.rol === Role.Admin;
}
ngOnInit() {
  
$( document ).ready(()=> {
  window.addEventListener('storage', (event) => {
    console.log("si entro local")
    if (event.storageArea == localStorage) {
      console.log("tambien aqui")
         var token:any = localStorage.getItem('identity');
         if(token == undefined || token == null || token == "") { 
           localStorage.clear()
             window.location.href = 'https://neo-front.herokuapp.com/autenticacion';
         }else{
           let user = JSON.parse(token)
           console.log(user)

          if(user.usuario.rol == '1'){
            window.location.href = 'https://neo-front.herokuapp.com/admin'
           }else if(user.usuario.rol == '4'){
            window.location.href = 'https://neo-front.herokuapp.com/fundacion/'+user.usuario._id+'/nosotros'
           }else{
            window.location.href = 'https://neo-front.herokuapp.com/home/inicio'
           }
         }
    }
});
  $(window).scroll(function() {
  });
});

var OneSignal = window['OneSignal'] || [];
OneSignal.push(function() { 
  OneSignal.init({
    appId: "039f7bfd-cb61-429d-a8b7-5b5cfd4033a8",
  });
}); 


}
logout() {
  this.authenticationService.logout();
  this.router.navigate(['/login']);
}

}
