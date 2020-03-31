import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/_shared/services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  currentUser:any
  constructor(private authenticationService: AuthenticationService) { 
    this.currentUser = this.authenticationService.currentUserValue;

  }

  ngOnInit() {
    console.log("entrp LAYOUT")
  }
 
}
