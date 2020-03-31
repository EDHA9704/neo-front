import { Component, OnInit } from '@angular/core';
import { AdopcionService } from 'src/app/_shared/services/adopcion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from 'src/app/_shared/messages/messages.service';
import { FormControl, Validators } from '@angular/forms';
import {environment} from '../../../../../environments/environment'
import { CommunicationService } from 'src/app/_shared/communications/communication.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
declare var google:any;
declare var $:any;
@Component({
  selector: 'app-perfil-adopcion',
  templateUrl: './perfil-adopcion.component.html',
  styleUrls: ['./perfil-adopcion.component.scss']
})
export class PerfilAdopcionComponent implements OnInit {
  public adopcion:any;
  public idFun;
  public url;
  public idm;
  public statusAPA = ''
    //location
    map:any;
    mapHtml:any;
    contMap = 0
    markerActualUserLocation:any;
    donLatLng = {
      lat:Number,
      lng:Number
    }
  aprobarNg = new FormControl('', []);
  descripcion = new FormControl('', [Validators.required,Validators.maxLength(500),Validators.minLength(25)]);
  getErrorMessage11() {
    return this.descripcion.hasError('required') ? 'Razones requeridas' :  
            this.descripcion.hasError('maxlength') ? 'Máximo 500 caracteres':
            this.descripcion.hasError('minlength') ? 'Debes especificar mejor las razones y pasos a seguir para el adoptante':
            '';
  }
  constructor(private _route:ActivatedRoute,
    private _router:Router, private _adopcionService:AdopcionService,
    private _messageService:MessagesService,private _comunicationService:CommunicationService,private ngxService: NgxUiLoaderService) { 
      this.ngxService.startLoader('loader-02');
      this.url = environment.apiUrl;
      
    }
 
  ngOnInit() {

    this._comunicationService.reload.subscribe(res=>{
      this.loadPage()
    $(document).ready(()=>{
      this.prob()
            
        });
    })
    this.loadPage()
    $(document).ready(()=>{
      this.prob()
            
        });
  }
  loadPage(){
    this._route.params.subscribe(params =>{
      let id = params['idA'];
      this.idm = id;
     
      this.idFun = params['id'] 
         this.obtAdopcion(id);


    
    
      
     
    })
  }
  obtAdopcion(id){
   
    this._adopcionService.obtAdopcion(id).subscribe(
      response=>{
        if(response.adopcion && response.n == '1'){
          this.adopcion = response.adopcion;
          this.ngxService.stopLoader('loader-02');
          this._comunicationService.perfilFundacionSelec(this.adopcion.fundacion.logo)
          this.loadMap()
          var ff = this.adopcion.adoptante.fechaNacimiento; 
          var fs = new Date(ff)
          var fn = fs.toLocaleDateString();
          this.adopcion.adoptante.fechaNacimiento = fn;
          $(document).ready(()=>{
            this.prob()
              });

        }else{
          this._messageService.showError('Error','Algo salio mal, intentalo mas tarde.')
        }
        
      },
      error=>{
        this._router.navigate(['**']);  
        if((error.error.n == '3') || (error.error.n == '2')){
          this._messageService.showError('Error',error.error.message)
        }else{
          this._messageService.showError('Error','Algo salio mal, intentalo mas tarde.')
        }
        
      }

    )
    
  }

  aproNgAdop(id,mid){
    var adop = {
      descripcion:""
    }
    adop.descripcion = this.descripcion.value;
    if(this.aprobarNg.value == '1'){
      this.aprobarAdopcion(adop,id,mid)
    }
    if(this.aprobarNg.value == '2'){
      this.desaprobarAdopcion(adop,id, mid)
    }
  }
  aprobarAdopcion(adop,id, mid){

    this.statusAPA = 'procesando'
    $('#tsp').toast('show');
    this._adopcionService.aprobarAdopcion(adop,id,mid, this.adopcion.adoptante.rol).subscribe(

      response=>{
        if(response.n == '1'){
          var end = end
          this._messageService.showSuccess('Adopción','Solicitud de adopción aprobada correctamente')
          this.obtAdopcion(this.idm);
          this.statusAPA = ''
        }else if(response.n == '8' || response.n == '6'){
          this._messageService.showError('Error',response.message)
          this.statusAPA = ''

        }else{
          this.statusAPA = ''
          this._messageService.showError('Error','Algo salio mal, intentalo mas tarde')
        }
       
      },
      error=>{
        this.statusAPA = ''
        if((error.error.n == '9') || (error.error.n == '7') || (error.error.n == '5') || (error.error.n == '4') || (error.error.n == '3') || (error.error.n == '2') ){
          this._messageService.showError('Error',error.error.message)
        }else{
          this._messageService.showError('Error','Algo salio mal, intentalo mas tarde')
        }
        
   
      }
    )
  }


  desaprobarAdopcion(adop,id, mid){

  
    this._adopcionService.desaprobarAdopcion(adop,id,mid,this.adopcion.adoptante.rol).subscribe(

      response=>{
        if(response.n == '1'){
          this._messageService.showSuccess('Adopción','Solicitud de adopción negada correctamente')
          this.obtAdopcion(this.idm);
          
        }else{
          this._messageService.showError('Error','Algo salio mal, intentalo mas tarde')
        }
       
      },
      error=>{
        if((error.error.n == '7') || (error.error.n == '6') || (error.error.n == '5') || (error.error.n == '4') || (error.error.n == '3') || (error.error.n == '2') ){

          this._messageService.showError('Error',error.error.message)
        }else{
          this._messageService.showError('Error','Algo salio mal, intentalo mas tarde')

        }
        
   
      }
    ) 
  }
  prob(){
    $("#descripcion").keyup(()=>{
         
      this.descripcion.setValue(this.limpiarCampo(this.descripcion.value));
}); 

  }
  limpiarCampo(text){

    var textFin = text.replace(/([\\ \\]+(?=[\\ \\])|^\\s+|\\s+$)/g, '');
  
    text = textFin;
  
    return text;
  
  }

  tabChanged(event){
    
    if(event == 0){

     
        if(this.contMap == 0){
          this.contMap++
            this.loadMap()

        }
      }
  }
  async loadMap(){
   $( document ).ready(()=> {
     const mapEle:HTMLElement = document.getElementById('mapcustom');
    this.mapHtml = mapEle;
    this.donLatLng.lat = this.adopcion.datosAdopcion.direccion.latLng.lat
    this.donLatLng.lng = this.adopcion.datosAdopcion.direccion.latLng.lng
    this.map = new google.maps.Map(this.mapHtml,{
      center:this.donLatLng,
      zoom:12,
    })
    google.maps.event.addListenerOnce(this.map,'idle',()=>{
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

 redirectMascota(nombre,id,idr){
  this._router.navigate(['perfil/mascota',idr,'fund',nombre,id]);
  
}
}
