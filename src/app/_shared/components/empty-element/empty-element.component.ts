import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-empty-element',
  templateUrl: './empty-element.component.html',
  styleUrls: ['./empty-element.component.scss']
})
export class EmptyElementComponent implements OnInit {
  @Input() foto:string;
  @Input() mensaje:string;
  constructor() { }

  ngOnInit() {
  }

}
