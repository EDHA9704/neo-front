import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService} from 'ngx-ui-loader'; // Import NgxUiLoaderService
@Component({
  selector: 'app-loading-custom',
  templateUrl: './loading-custom.component.html',
  styleUrls: ['./loading-custom.component.scss']
})
export class LoadingCustomComponent implements OnInit {

  constructor(private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    this.ngxService.startLoader('loader-01');
  }

}
