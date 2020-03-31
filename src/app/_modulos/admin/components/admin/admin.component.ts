import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../../../_models';
import { UserService } from '../../../../_shared/services';
import { CommunicationService } from 'src/app/_shared/communications/communication.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  loading = false;
  users: User[] = [];
  constructor(private userService: UserService,private _comunicationService:CommunicationService) { }

  ngOnInit() {
    
    this._comunicationService.perfilFundacionSelec('')
        
  }

}
