import { Component, OnInit } from '@angular/core';
import { User } from '../../../../_models';
import { UserService, AuthenticationService } from '../../../../_shared/services';
import { CommunicationService } from 'src/app/_shared/communications/communication.service';
declare var $:any;
@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss']
})
export class NosotrosComponent implements OnInit {
  loading = false;
  currentUser: User;
  userFromApi: User;
  constructor(private userService: UserService,
    private authenticationService: AuthenticationService,private _comunicationService:CommunicationService) {
      this.currentUser = this.authenticationService.currentUserValue;

     }

  ngOnInit() {
    this._comunicationService.perfilFundacionSelec('')
    this.loading = true;
    console.log("HOMEEEEE") 
    $( document ).ready(()=> {
      console.log( "ready!" );
      this.toggle()
  });
       /* this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
            this.loading = false;
            this.userFromApi = user;
        });*/
  }

  toggle(){
    const selectElement = (s:any) => document.querySelector(s)
    selectElement('.open').addEventListener('click',()=>{
      selectElement('.nav-list').classList.add('active')

    })
    selectElement('.close').addEventListener('click',()=>{
      selectElement('.nav-list').classList.remove('active')

    })
  }

}
