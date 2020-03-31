import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../../../_models';
import { UserService, AuthenticationService } from '../../../../_shared/services';
declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  loading = false;
  currentUser: User;
  userFromApi: User;
  constructor(private userService: UserService,
    private authenticationService: AuthenticationService) {
      this.currentUser = this.authenticationService.currentUserValue;

     }

  ngOnInit() {
  
  
       /* this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
            this.loading = false;
            this.userFromApi = user;
        });*/
  }

 
}
