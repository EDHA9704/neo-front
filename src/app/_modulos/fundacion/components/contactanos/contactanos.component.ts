import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { AuthenticationService, UserService } from 'src/app/_shared/services';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioFundacion } from 'src/app/_models/usuarioFundacion';
declare var google:any;

declare var $:any;
@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.scss']
})
export class ContactanosComponent implements OnInit {
  public idFun;
  public url;
  public currentUser
  public fundacion:any;
  keyUrl
  fullUrl:string
   //location
   map:any;
   mapHtml:any;
   contMap = 0
   markerActualUserLocation:any;
   donLatLng = {
     lat:Number,
     lng:Number
   }
  constructor(private authenticationService: AuthenticationService,private _route:ActivatedRoute,
    private _router:Router,private _userService:UserService) { 
    this.currentUser = this.authenticationService.currentUserValue;
    this.url = environment.apiUrl;
    this.fullUrl = this._router.url.toString()
      this.keyUrl = this.fullUrl.split('/')
  }

  ngOnInit() {
    this.loadPage();
  }
  loadPage(){
    this._route.params.subscribe(params =>{
      this.idFun =  this.keyUrl[2]
     
      this.obtFundacion(this.idFun);
      
      
     
     
      
    })
  }
  obtFundacion(id){

    this._userService.obtUsuario(id).subscribe(
      response=>{
       
        this.fundacion = response.usuario;
        this.loadMap()
        console.log(this.fundacion)
       
      },
      error=>{
        console.log(<any>error);
      }
    )
    

  }

  async loadMap(){
    // const loading = await this.loadController.create()
   //  loading.present()
   // await this.currentLocationUser()
 
   $( document ).ready(()=> {
     const mapEle:HTMLElement = document.getElementById('mapcustom');
  
   
    console.log(mapEle)
    this.mapHtml = mapEle;
    console.log("bien")
    this.donLatLng.lat = this.fundacion.direccionMap.latLng.lat
    this.donLatLng.lng = this.fundacion.direccionMap.latLng.lng
    console.log("bien2")
    console.log(this.donLatLng)
    this.map = new google.maps.Map(this.mapHtml,{
      center:this.donLatLng,
      zoom:12,
    })
    console.log("bien3")
    google.maps.event.addListenerOnce(this.map,'idle',()=>{
     //loading.dismiss();
     console.log("bien4")
     this.putMarker(this.map,this.donLatLng,'Hello')
    })
   });
   }
   putMarker(map,markerL,text){
    
       
     this.markerActualUserLocation = new google.maps.Marker({
       position:{
         lat:markerL.lat,
         lng:markerL.lng
       },
       draggable: false,
       zoom:8,
       map:map,
       title:text
     })
   
 }
}
