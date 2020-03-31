import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HeaderHomeComponent implements OnInit {
  UrlTree
  constructor(router: Router) {
    this.UrlTree = router
    console.log(this.UrlTree.url)
   
   }

  ngOnInit() {
    $( document ).ready(()=> {
      console.log("entoroo mennn **********")
      if(this.UrlTree.url == '/home/nosotros'){
        $("#header").removeClass('darkHeader')
      }else{
        $("#header").addClass('darkHeader')
      }
  });
  $( document ).ready(()=> {
    console.log( "ready fundaicon!" );
    this.toggle()
});
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
