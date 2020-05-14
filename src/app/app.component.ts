import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_shared/services';
import { User, Role } from './_models';
import $ from "jquery";
import { CommunicationService } from './_shared/communications/communication.service';
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
    public zone: NgZone,private commService:CommunicationService
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
  this.commService.logOutAll.subscribe(
    res=>{
      console.log(res)
      if(res == true){

      }
    }
  )
$( document ).ready(()=> {
  window.addEventListener('storage', (event) => {
    if (event.storageArea == localStorage) {
         var token:any = localStorage.getItem('identity');
         if(token == undefined || token == null || token == "") { 
          console.log("logout")
           localStorage.clear()
             //window.location.href = 'https://neo-front.herokuapp.com/autenticacion';
             window.location.href = 'https://neo-front.herokuapp.com/autenticacion';
         }
    }
},false);

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
