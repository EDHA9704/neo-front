import { Component } from '@angular/core';
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
    private authenticationService: AuthenticationService
) {
    this.authenticationService.currentUser.subscribe(x => {
      console.log(x)
      this.currentUser = x
    }
     );
}
get isAdmin() {
  return this.currentUser && this.currentUser.rol === Role.Admin;
}
ngOnInit() {
$( document ).ready(()=> {
  console
  .log("viendo scroll")
  $(window).scroll(function() {
   console.log('OK FUNCIONA')
  });
});
console.log("ENTRO APP")

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
