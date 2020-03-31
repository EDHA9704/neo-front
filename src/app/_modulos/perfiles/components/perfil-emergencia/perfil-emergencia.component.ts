import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmergenciaService } from 'src/app/_shared/services/emergencia.service';
import { Emergencia } from 'src/app/_models/emergencia';
import { Notificacion } from 'src/app/_models/notificacion';
import { Ayuda } from 'src/app/_models/ayuda';
import {environment} from '../../../../../environments/environment'
import { UsuarioVoluntario } from 'src/app/_models/usuarioVoluntario';
import { UserService} from 'src/app/_shared/services/user.service';
import { MessagesService } from 'src/app/_shared/messages/messages.service';
import { AuthenticationService } from 'src/app/_shared/services';
import { NotificacionService } from 'src/app/_shared/services/notificacion.service';
import { FormControl, Validators } from '@angular/forms';
import { CommunicationService } from 'src/app/_shared/communications/communication.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
declare var google:any;

declare var $:any;
@Component({
  selector: 'app-perfil-emergencia',
  templateUrl: './perfil-emergencia.component.html',
  styleUrls: ['./perfil-emergencia.component.scss']
})
export class PerfilEmergenciaComponent implements OnInit {
  public idEm
  public url;
  public emergencia:any;
  public emergenciaB:Emergencia;
  public ayudaB:Ayuda;
  public ayuda:Ayuda;
  public notificacion:Notificacion;
  public totalVolun;
 
  public voluntarios:UsuarioVoluntario[];
  public voluntariosAS = []
  public currentUser
  public mensajeAyuda = ''
  public tituloAP = ''
  msjUsuario = new FormControl('', [Validators.required,Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9 ; : . , -]*$'),Validators.maxLength(500),Validators.minLength(10)]);
  msjVoluntarios = new FormControl('', [Validators.required,Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9 ; : . , -]*$'),Validators.maxLength(500),Validators.minLength(10)]);
  public tipoAprobarNegar =''
  public voluntariosMix:any = [];
  public anadirVoluntarios=false;
  public mensajeConfirmacion = "";
  public tituloConfirmacion = "";
  public tipoConfirmacion =""
  public optionConfirmacion=""
  public idFun;
  public permission = false
  public statusAyuda = ''
  //location
  map:any;
  mapHtml:any;
  contMap = 0
  markerActualUserLocation:any;
  donLatLng = {
    lat:Number,
    lng:Number
  }
  fullUrl:string
  constructor(private _route:ActivatedRoute,
    private _router:Router,private _emergenciaService:EmergenciaService,
    private _userService:UserService,private _messageService:MessagesService,
    private authenticationService: AuthenticationService,
     private _notificacionService:NotificacionService,private _comunicationService:CommunicationService,private ngxService: NgxUiLoaderService) {
      this.ngxService.startLoader('loader-02');
      this.url = environment.apiUrl;
      this.notificacion= new Notificacion("","","","","","","","");
      this.currentUser = this.authenticationService.currentUserValue;

     }

  ngOnInit() {
    this.fullUrl = this._router.url.toString()
    this.loadPage();
    this._comunicationService.reload.subscribe(res=>{
      if(res==true){
        this.voluntariosMix = []
         this.voluntariosAS = []
        this.loadPage();
      }
    })
  }
  loadPage(){
    $('#modalAyudarEmergencia').modal('hide');
    this._route.params.subscribe(params =>{
      let id = params['idE'];
     this.idEm = id;

     if(this.currentUser && this.currentUser.usuario.rol == '4'){
      this.permission = true;
    }else{
      this.permission = false;
    }
       this.obtEmergencia(id);
  
    })
  }
  obtVoluntarios(){

    let rol = 2;

    this.voluntarios = []
    this._userService.obtVoluntariosNP( rol).subscribe(
      response=>{
        
        if(response.usuarios && response.n == '1'){
          
          this.totalVolun = response.total;
          this.voluntarios = response.usuarios;
          if(this.emergencia.estado == 1){
            this.voluntarios = []
            var temArray = []
            this.emergencia.ayuda.voluntarios.forEach(element => {
              var voluntario = {
                _id:"",
                nombres:"",
                apellidos:"",
                estadoD:"",
                foto:"",
                seleccionado:false
              }
              voluntario._id = element.voluntarioId._id;
              voluntario.nombres = element.voluntarioId.nombres;
              voluntario.apellidos = element.voluntarioId.apellidos;
              voluntario.foto = element.voluntarioId.foto;
              voluntario.estadoD = element.aprobado
              voluntario.seleccionado = true;
              this.voluntariosMix.push(voluntario)
            });
            response.usuarios.forEach(vls => {
              var voluntario2 = {
                _id:"",
                nombres:"",
                apellidos:"",
                estadoD:"",
                foto:"",
                seleccionado:false
              }

              var temv = this.voluntariosMix.filter(x => x._id == vls._id)
              if(temv.length == 0){
                voluntario2._id = vls._id;
                voluntario2.nombres = vls.nombres;
                voluntario2.apellidos = vls.apellidos;
                voluntario2.foto = vls.foto;
                voluntario2.estadoD = ""
                voluntario2.seleccionado = false;
                this.voluntariosMix.push(voluntario2)
              }
  
  
            });
          }
        }else{
          this._messageService.showError('Error','No se pudo obtener los voluntarios, inténtalo de nuevo')

        }
      },
      error=>{
        var errorMessage = <any>error;
        if(errorMessage != null && error.error.n == '2'){
          this._messageService.showError('Error','Lo sentimos, no existe fundaciones registradas.')
        }else if(errorMessage != null && error.error.n == '3'){
          this._messageService.showError('Error',error.error.message)
        }else{
          this._messageService.showError('Error','No se pudo obtener los voluntarios, inténtalo de nuevo')

        }
      }
    )
  }

  obtEmergencia(id){
    this.voluntariosMix = []
    this.voluntariosAS = []
    this._emergenciaService.obtEmergencia(id).subscribe(
      response=>{
        if(response.emergencia){
          this.emergencia = response.emergencia;
          this.ngxService.stopLoader('loader-02');
          this._comunicationService.perfilFundacionSelec('')
          if(this.permission == true){
            this.obtVoluntarios()
            if(this.emergencia.ayuda){
              response.emergencia.ayuda.voluntarios.forEach(vol => {
                var voluntario = {
                  voluntarioC:'',
                  estadoD:''
                }
                this._userService.obtUsuario(vol.voluntarioId._id).subscribe(
                  response=>{
                    voluntario.voluntarioC = response.usuario;
                    voluntario.estadoD = vol.aprobado
                    this.voluntariosAS.push(voluntario)
                  },
                  error=>{
                  }
                )
            }
              )}
          }

       
        }
      },
      error=>{
        this._router.navigate(['**']);  
        this._messageService.showError('Error','No se pudo obtener la emergenca, inténtalo de nuevo')
      }
    )
  }
  registrarAyuda(){
    this.statusAyuda = 'procesando' 
     var valoresCheck = [];
     var paraNoti = [];
     $("input[type=checkbox]:checked").each(function(){
       valoresCheck.push({
         
         'voluntarioId':this.value,
       'aprobado':0});
       paraNoti.push({
         
         'voluntarioId':this.value});
   });
 
   if(valoresCheck.length >= 1){
     this.emergencia.fundacion = this.currentUser.usuario._id;
     this.emergencia.voluntarios = valoresCheck;
   
     this._emergenciaService.nuevaAyuda(this.emergencia, this.idEm,this.emergencia.responsable.rol).subscribe(
       response=>{
         if(response.emergencia && response.n == '1'){
           this.notificacion.emergencia = this.idEm;
           this.notificacion.fundacion = this.currentUser.usuario._id;
           this.notificacion.para = paraNoti;
           
           this._notificacionService.registerNotificacion(this.notificacion,'a').subscribe(
             responsee=>{
               if(responsee.notificacion && responsee.n == '1'){
               
               
                this.obtEmergencia(this.idEm)
                this.statusAyuda = '' 
                 this.mensajeAyuda = 'Emergencia acogida, se notificará a los voluntarios seleccionados para que acepten o rechazen el ayudar en la emergencia.'
                 $("#modalAyudarEmergencia").modal('show')
               
               }else{
                this.statusAyuda = '' 
                this._messageService.showError('Error','No se pudo registrar la ayuda, intentalo de nuevo')

               }
             },
             errore=>{
              this.statusAyuda = '' 
               if( (errore != null && errore.error.n == '3') || (errore != null && errore.error.n == '2') ){
                 
                 this.mensajeAyuda = errore.error.message;
               }else{
                this._messageService.showError('Error','No se pudo notificar a los voluntarios, intentalo de nuevo')

               }
               
             }
           )
   
         }else{
          this._messageService.showError('Error','No se pudo registrar la ayuda, intentalo de nuevo')
         }
       },
       error=>{
         if( (error != null && error.error.n == '6') ||  (error != null && error.error.n == '3') || (error != null && error.error.n == '2')){
          this._messageService.showError('Error',error.error.message)
         
         }else{
          this._messageService.showError('Error','No se pudo registrar la ayuda, intentalo de nuevo')
         }
         
       }
     )
   
   }else{
      this._messageService.showError('Asignar','Selecciona al menos un voluntario')
     this.mensajeAyuda = 'Selecciona al menos 1 voluntario.'
   }
   
  
   }

   marcarAtentida(){
     this._emergenciaService.marcarAtentida(this.currentUser.usuario._id,this.emergencia._id,this.emergencia.responsable.rol).subscribe(
       response=>{
        this._messageService.showSuccess('Emergencia','Se marcó la emergencia como atentida')

        this.obtEmergencia(this.emergencia._id)
       },
       error=>{
       }
     )
   }
   negarEmergencia(){
    var body = {
      msjUsuario:this.msjUsuario.value
    }
    this._emergenciaService.negarEmergencia(body,this.emergencia._id,this.emergencia.responsable.rol).subscribe(
      response=>{
       this._messageService.showSuccess('Emergencia','Se marcó la emergencia como falsa')

       this.obtEmergencia(this.emergencia._id)
      },
      error=>{
        this._messageService.showError('Error','Inténtalo de nuevo')
      }
    )
  }
  aprobarEmergencia(){
    var body = {
      msjUsuario:this.msjUsuario.value,
      msjVoluntarios:this.msjVoluntarios.value
    }
    this._emergenciaService.aprobarEmergencia(body,this.emergencia._id,this.emergencia.responsable.rol).subscribe(
      response=>{
       this._messageService.showSuccess('Emergencia','Se aprobó la emergencia')

       this.obtEmergencia(this.emergencia._id)
      },
      error=>{
        this._messageService.showError('Error','Inténtalo de nuevo')
      }
    )
  }
  executeConfirmacion(tipo,option){
    this.tipoConfirmacion = tipo;
    this.optionConfirmacion = option;
   if(tipo == 'delVol'){
     $("#modalConfirmacion").modal('show')
     this.tituloConfirmacion = 'Descartar voluntario'
     this.mensajeConfirmacion = 'Esta acción es irreversible. ¿Estás seguro de eliminar al voluntario de está emergencia?'
   }else if(tipo == 'reasignar'){
     $("#modalConfirmacion").modal('show')
     this.tituloConfirmacion = 'Reasignar voluntarios'
     this.mensajeConfirmacion = 'Esta acción es irreversible. ¿Estás seguro de reasignar los voluntarios de está emergencia?. Recuerda'+
     'que los voluntarios que selecciones deberán aceptar o negar nuevamene al solicitud.'
   }
  }
  executeFunction(){
    if(this.tipoConfirmacion == 'delVol'){
     $("#modalConfirmacion").modal('hide')
     this.eliminarVoluntarioEmergencia(this.optionConfirmacion)
     this.tipoConfirmacion = ''
     this.optionConfirmacion = ''
   }else if(this.tipoConfirmacion == 'reasignar'){
     $("#modalConfirmacion").modal('hide')
     this.reasignarVoluntarioEmergencia(this.emergencia._id)
     this.tipoConfirmacion = ''
     this.optionConfirmacion = ''
   }
  }
  executeConfirmacionAprobarNegar(tipo,option){
    this.tipoAprobarNegar = tipo;
    if(tipo == 'negar'){
      this.tituloAP = 'Marcar como Emergencia Falsa'
      $("#modalAprobarNegar").modal('show')
    }else if(tipo == 'aproVolun'){

      var tem = this.voluntariosAS.filter(x=> x.estadoD == 1)
      if(tem.length >= 1){
        this.tituloAP = 'Aprobar emergencia'
        $("#modalAprobarNegar").modal('show')
      }else{
        this._messageService.showError('Error','Almenos un voluntario debe aprobar la solicitud')
      }

    }
   }
   executeFunctionAprobarNegar(){ 
    if(this.tipoAprobarNegar == 'negar'){
      this.tituloAP = ''
      this.negarEmergencia()
      $("#modalAprobarNegar").modal('hide')
    }else if(this.tipoAprobarNegar == 'aproVolun'){
      this.tituloAP = ''
      this.aprobarEmergencia()
      $("#modalAprobarNegar").modal('hide')
    }
   }
   hola(event){
    if(this.emergencia.estado == 1){
   var tempVol = []
    $("input[type=checkbox]:checked").each(function(){
     tempVol.push(this.value)
 
 });
   if(tempVol.length > this.emergencia.ayuda.voluntarios.length){
     this.anadirVoluntarios = true
   }else{
     this.anadirVoluntarios = false
   }
  }
  }
  eliminarVoluntarioEmergencia(id){

    if(this.emergencia.ayuda.voluntarios.length > 1){
      this._emergenciaService.eliminarVoluntarioEmer(this.emergencia._id,id).subscribe(
        response=>{
         this.obtEmergencia(this.idEm)
         this._messageService.showSuccess('Voluntario','Se elimino al voluntario de la emergencia')
        },
        error=>{
         this._messageService.showError('Error','No se pudo eliminar, inténtalo de nuevo')
 
        }
      )
    }else{
      this._messageService.showError('Error','Debe existir al menos un voluntario para la emergencia')
    }
 
   }
   reasignarVoluntarioEmergencia(id){

      this._emergenciaService.reasignarVoluntarioEmer(this.emergencia._id).subscribe(
        response=>{
         this.obtEmergencia(this.idEm)
         this._messageService.showSuccess('Donación','Se descarto los voluntarios. Puedes asignar nuevos')
        },
        error=>{
         this._messageService.showError('Error','No se pudo reasignar, inténtalo de nuevo')
 
        }
      )

 
   }
   anadirVoluntariosToEmergencia(){
    var temVolun = []
    var temFinal = []
   $("input[type=checkbox]:checked").each(function(){
     temVolun.push({
       '_id':this.value,
       'voluntarioId':this.value,
       'aprobado':0});
 });
 temVolun.forEach((x,index)=> {
   var tem = this.voluntariosAS.filter(v=>v.voluntarioC._id == x._id)
   if(tem.length == 0){
     temFinal.push(x)
   }
   
 });
 var body = {
   voluntarios:temFinal
 }
 this._emergenciaService.anadirVoluntarioEmer(body,this.emergencia._id).subscribe(
   response=>{
     this.obtEmergencia(this.idEm)
     this.anadirVoluntarios = false;
     this._messageService.showSuccess('Emergencia','Voluntarios agregados correctamente')
   },
   error=>{
     this._messageService.showError('Error','No se pudo agregar los voluntarios, inténtalo de nuevo')
   }
 )

  }
  tabChanged(event){
    
    if(event == 1){

     
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
   this.donLatLng.lat = this.emergencia.direccion.latLng.lat
   this.donLatLng.lng = this.emergencia.direccion.latLng.lng
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

redirectLogin(){
  this._router.navigate(['/autenticacion'], { queryParams: { returnUrl: this.fullUrl }});
}
}
