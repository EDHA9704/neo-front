import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  constructor(private ngxService: NgxUiLoaderService) {
    this.ngxService.startLoader('loader-02');
   }

  ngOnInit() {
    setTimeout(() => {
      this.ngxService.stopLoader('loader-02');
    }, 2000);
  }

}
