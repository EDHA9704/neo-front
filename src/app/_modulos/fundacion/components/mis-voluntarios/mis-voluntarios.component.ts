import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioVoluntario } from 'src/app/_models/usuarioVoluntario';
import { FundacionService } from 'src/app/_shared/services/fundacion.service';
import { FormControl, Validators } from '@angular/forms';
import { UserService, AuthenticationService } from 'src/app/_shared/services';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { MessagesService } from 'src/app/_shared/messages/messages.service';
import { UploadService } from 'src/app/_shared/services/upload.service';
import { UsuarioFundacion } from 'src/app/_models/usuarioFundacion';
import {MapCustomComponent} from 'src/app/_shared/components/map-custom/map-custom.component'
declare var google:any;
declare var $:any
@Component({
  selector: 'app-mis-voluntarios',
  templateUrl: './mis-voluntarios.component.html',
  styleUrls: ['./mis-voluntarios.component.scss']
})
export class MisVoluntariosComponent implements OnInit {
  @ViewChild('stepper', {static: true}) private myStepper: MatStepper;

  public carga;
  public url;
  imageObj: File;
  //variables para recoger lo que venga por la URL
  public idFun;
  public titu;
  public nm = 'noe';
  public cor = 'noe';
  public mensaje;
  public nVolun;
  public registrando;
  public usuarioVoluntario:UsuarioVoluntario;
  public voluntarios:UsuarioVoluntario[];
  public usuario:UsuarioVoluntario;
  public usuario2:any;
  minDate = new Date(1980, 0, 1);
  maxDate = new Date();
  public page
  public total;
  public pages;
  public itemsPerPage;
  public next_page;
  public prev_page;

  public pagesSelec;
  public type;
  public name;
  public filtroBTN;
  public busqueda;
  public imgUN:any;
  public imL = false;
public nuevoRegistro = false;
  public direccionSelec:any = ''
  rgxPass  = new RegExp("^(?=.*\\d)(?=.*[\\u0021-\\u002b\\u003c-\\u0040])(?=.*[A-Z])(?=.*[a-z])\\S{8,16}$")
  public imgCom;
  foto= new FormControl('', [Validators.required]);
  public actualizar = false;
  bsVoluntario = new FormControl('', [ Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ]*$'), Validators.maxLength(100)]);
  nombres = new FormControl('', [Validators.required, Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ]*$'), Validators.maxLength(25),Validators.minLength(4)]);
  apellidos = new FormControl('', [Validators.required,Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ]*$'), Validators.maxLength(40),Validators.minLength(7)]);
  cedula = new FormControl('', [Validators.required,Validators.maxLength(10),Validators.minLength(10)]);
  fechaNacimiento = new FormControl('', [Validators.required]);
  correo = new FormControl('', [Validators.required, Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')]);
  password = new FormControl('', [Validators.required, Validators.maxLength(30),Validators.minLength(8), Validators.pattern(this.rgxPass)]);
  tipoVoluntario = new FormControl('', [Validators.required]);
  disponibilidadTiempo = new FormControl('', [Validators.required]);
  telefono = new FormControl('', [Validators.required,Validators.maxLength(9),Validators.minLength(9),Validators.pattern('[0-9]+$')]);
  celular = new FormControl('', [Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern('[0-9]+$')]);
  direccion = new FormControl('', [Validators.required,Validators.maxLength(300),Validators.minLength(25)]);
  getErrorMessage() {
    return this.nombres.hasError('required') ? 'El nombre es requerido' :
    this.nombres.hasError('pattern') ? 'No se admite: símbolos, caracteres especiales o números':
            this.nombres.hasError('maxlength') ? 'Máximo 25 caracteres':
            this.nombres.hasError('minlength') ? 'Mínimo 4 caracteres':
            '';
  }
  getErrorMessage2() {
    return this.apellidos.hasError('required') ? 'Especie requerida' :  
    this.apellidos.hasError('pattern') ? 'No se admite: símbolos, caracteres especiales o números':
            this.apellidos.hasError('maxlength') ? 'Máximo 40 caracteres':
            this.apellidos.hasError('minlength') ? 'Ingrese los apellidos completos':
            '';
  }
  getErrorMessage3() {
    return this.cedula.hasError('required') ? 'Cédula requerida' :  
    this.cedula.hasError('maxlength') ? 'Máximo 10 caracteres':
    this.cedula.hasError('minlength') ? 'Mínimo 10 caracteres':
            '';
  }
  getErrorMessage4() {
    return this.fechaNacimiento.hasError('required') ? 'Fecha de nacimiento requerida' :  
            '';
  }
  getErrorMessage5() {
    return this.correo.hasError('required') ? 'Correo requerido' :  
            this.correo.hasError('pattern') ? 'Ingresa un correo válido':
            '';
  }
  getErrorMessage6() {
    return this.password.hasError('required') ? 'Contraseña requerida' :
    this.password.hasError('maxlength') ? 'Máximo 30 caracteres':  
    this.password.hasError('minlength') ? 'Mínimo 8 caracteres':  
           this.password.hasError('pattern') ? 'Contraseña no válida':  
            '';
  }
  getErrorMessage7() {
    return this.tipoVoluntario.hasError('required') ? 'Campo requerido' :  
            '';
  }
  getErrorMessage8() {
    return this.disponibilidadTiempo.hasError('required') ? 'Campo requerido' :  
            '';
  }
  getErrorMessage9() {
    return this.telefono.hasError('required') ? 'Teléfono requerido' : 
    this.telefono.hasError('maxlength') ? 'Máximo 9 caracteres':
    this.telefono.hasError('minlength') ? 'Mínimo 9 caracteres': 
    this.telefono.hasError('pattern') ? 'Número no válido':     
            '';
  }
  getErrorMessage10() {
    return this.celular.hasError('required') ? 'Celular requerido' : 
    this.celular.hasError('maxlength') ? 'Máximo 10 caracteres':
    this.celular.hasError('minlength') ? 'Mínimo 10 caracteres': 
    this.celular.hasError('pattern') ? 'Número no válido':   

            '';
  }
  getErrorMessage11() {
    return this.direccion.hasError('required') ? 'Dirección requeridos' :  
            this.direccion.hasError('maxlength') ? 'Máximo 300 caracteres':
            this.direccion.hasError('minlength') ? 'Especifica mejor la dirección':
            '';
  }
  public currentUser;
  public advertencia;
  public loading = true;
  public fundacion:UsuarioFundacion;
  keyUrl
  fullUrl:string
  hide = true; 
   //location
   map:any;
   mapHtml:any;
   contMap = 0
   markerActualUserLocation:any;
   donLatLng = {
     lat:Number,
     lng:Number
   }
  constructor(private _route:ActivatedRoute,public dialog: MatDialog,
    private _router:Router,private _fundacionService:FundacionService,
    private _userService:UserService,
    private authenticationService: AuthenticationService, private _messageService:MessagesService,
    private _uploadService:UploadService) {
      this.url = environment.apiUrl
      this.currentUser = this.authenticationService.currentUserValue;
      this.page = 1;
      this.carga = true;
      this.filtroBTN = false;
      this.fullUrl = this._router.url.toString()
      this.keyUrl = this.fullUrl.split('/')
      
     }

  ngOnInit() {
    this.actualPage();
    $(document).ready(()=>{
    this.prob3()
    this.prob()
  });
  }
  actualPage(){
    this.loading = true;
    this.voluntarios = []
    this.pagesSelec=[]
    this.type = ''
    this._route.params.subscribe(params =>{
       this.type = params['tipo']
       this.name= params['name']
       let page = +params['page'];
      this.idFun = this.keyUrl[2]
      this.obtFundacion(this.idFun)
         this.page = page;
         if(!params['page']){
           page = 1;
           this.page = 1;
         }
      
         if(!page){
           page = 1;
         }else{
           this.next_page = page+1;
           this.prev_page = page-1;
   
           if(this.prev_page <= 0){
             this.prev_page = 1;
           }
         }
    });
  }
  obtFundacion(id){
    this._userService.obtUsuario(id).subscribe(
      response=>{
        this.prob()
        this.prob3()
        this.carga == false
        this.fundacion = response.usuario;
        this.obtVoluntarios(this.page);
      },
      error=>{
        this._router.navigate(['**']);
      }
    )
    
  
  }
  prob(){
    $(document).ready(()=>{
    $("#bsFunNombre").keyup(()=>{
    
      this.obtnerVoluntariosByApellidos();
      this.busqueda = true;
  
  }); 
}); 
  }
  nuewVoluntario(){
    this.myStepper.selectedIndex = 0;
    this.usuarioVoluntario = new UsuarioVoluntario("","","","","","","","","","","","","","","","","")
    this.resets2()
    this.actualizar = false
    this.nuevoRegistro = true
    $("#mapcustom").removeClass('mapCustom')
    $('#modalMascota').modal('show')

   
  }
  verFoto(foto){
    $('#modalComprobante').modal('show')
    this.imgCom = foto;
  }
  cancelarBus(){
    this.filtroBTN = false;
    this.actualPage()
    this.bsVoluntario.reset()
    this._router.navigate(['/fundacion',this.name,this.idFun,'voluntarios','todos','1'])
  }
  obtnerVoluntariosByApellidos(){
    let cont = 0
    this.pagesSelec = []
    this.voluntarios = []
    this.loading = true;
    const nombre = this.bsVoluntario.value;
    this.filtroBTN = true;
    if(nombre != '' && nombre != undefined &&cont == 0){
      cont++;
      this._fundacionService.obtVoluntariosByApellidos(nombre,this.idFun).subscribe(
        response=>{
          if(response.usuarios && response.n == '1'){
            this.voluntarios = response.usuarios;
            this.total = this.voluntarios.length;
           this.advertencia =false;
           this.loading = false;
           $(".content-grid-cards").addClass('visible')

          }
        },
        error=>{
          this.pagesSelec = []
          this.voluntarios = []
          this.loading = false;
          this.advertencia = true
          this.carga = false;
          $(".carga").fadeOut("slow");
          var errorMessage = <any>error;
          if(errorMessage != null && error.error.n == '2'){
            this.mensaje = 'Lo sentimos, no se encontro voluntarios';
          }else if(errorMessage != null && error.error.n == '3'){
            this.mensaje = error.error.message;
          }else{
            this.mensaje = 'Algo salio mal, intentalo de nuevo.'
          }
        }
      )
    }else{
      
     this.actualPage();
    }

  }
  obtVoluntarios(page){
    let rol = 2;
    this.pagesSelec = []
    this.voluntarios = []
    this.loading = true;
    this._fundacionService.obtVoluntarios(page, rol).subscribe(
      response=>{
        if(response.usuarios && response.n == '1'){
          this.total = response.total;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
          this.voluntarios = response.usuarios;
          for (let i = 1; i <= this.pages; i++) {
            this.pagesSelec.push(i)
            
          }
          this.advertencia =false;
          this.loading = false;
          $(".content-grid-cards").addClass('visible')
          this.carga = false;
        }else{
          this.mensaje = 'Algo salió mal.'
        }
      },
      error=>{
        this.pagesSelec = []
        this.voluntarios = []
        var errorMessage = <any>error;
        this.carga = false;
        this.loading = false;
        this.advertencia = true;
        if(errorMessage != null && error.error.n == '2'){
          this.mensaje = 'Lo sentimos, no se encontro voluntarios';
        }else if(errorMessage != null && error.error.n == '3'){
          this.mensaje = error.error.message;
        }else{
          this.mensaje = 'Algo salio mal, intentalo de nuevo.'
        }
      }
    )
  }

  obtenerVoluntario(usuario,id){
    this.actualizar = true;
    $('#modalMascota').modal('show')
    this.usuarioVoluntario = new UsuarioVoluntario("","","","","","","","","","","","","","","","","")
    this.usuario = usuario;
    this.nombres.setValue(usuario.nombres)
        this.apellidos.setValue(usuario.apellidos)
        this.cedula.setValue(usuario.cedula)
        this.fechaNacimiento.setValue(usuario.fechaNacimiento)
        this.correo.setValue(usuario.correo)
        this.tipoVoluntario.setValue(usuario.tipoVoluntario)
        this.disponibilidadTiempo.setValue(usuario.disponibilidadTiempo)
        this.telefono.setValue(usuario.telefono)
        this.celular.setValue(usuario.celular)
        if(usuario.direccionMap){
          this.loadMap(usuario.direccionMap.latLng.lat,usuario.direccionMap.latLng.lng)
        }
        this.usuarioVoluntario.disponibilidadParticipacion = usuario.disponibilidadParticipacion
        this.usuarioVoluntario.disponibilidadCasa = usuario.disponibilidadCasa
        $(document).ready(()=>{
   

          this.prob3()
                
            });
    this._userService.obtUsuario(id).subscribe(
      response=>{
        if(response.usuario && response.n == '1')
       this.usuario2 =response.usuario;
       
      },
      error=>{
      }
    )
  }
  prob3(){
  $("#nombres").keyup(()=>{
    this.nombres.setValue(this.limpiarCampo(this.nombres.value));
  }); 
  $("#apellidos").keyup(()=>{
    this.apellidos.setValue(this.limpiarCampo(this.apellidos.value));
  }); 
  $("#password").keyup(()=>{
    this.password.setValue(this.limpiarCampo(this.password.value));
  });
  $("#direccion").keyup(()=>{
    this.direccion.setValue(this.limpiarCampo(this.direccion.value));
  }); 
  $("#correo2").keyup(()=>{
    this.validarNM('c')
    $("#corr").fadeOut("fast")

}); 

  }
  limpiarCampo(text){
    var textFin = text.replace(/([\\ \\]+(?=[\\ \\])|^\\s+|\\s+$)/g, '');
    text = textFin;
    return text;
  }
  validarNM(op){
  console.log(this.usuario2.cedula,this.usuario2.correo)
    if(op == 'ce'){
      const cedula = $("#cedula2").val(); 
      this.usuario.cedula = cedula
      this._fundacionService.validarCedulaE(this.usuario).subscribe(
        response=>{
  
          if(response.n == '1' && this.usuario2.cedula != this.usuario.cedula ){
            this.nm = 'sie'
          }else if(response.n == '1' && this.usuario2.cedula == this.usuario.cedula){
            this.nm = 'noe'
          }else if(response.n == '2'){
            this.nm = 'noe'
          }
        },
        error=>{
        }
      )
    }
    if(op == 'c'){
      const coreo = $("#correo2").val();
      this.usuario.correo = coreo
      this._fundacionService.validarCorreoF(this.usuario).subscribe(
        response=>{
          if(response.n == '1' && this.usuario2.correo != this.usuario.correo ){
            this.cor = 'sie'
          }else if(response.n == '1' && this.usuario2.correo == this.usuario.correo){
            this.cor = 'noe'
          }else if(response.n == '2'){
            this.cor = 'noe'
          }
        },
        error=>{
        }
      )
    }
      
    }

  public filesToUpload: Array<File>;
  urls = new Array<string>();
  fileChangeEvent(fileInput:any){
    const FILE = (event.target as HTMLInputElement).files[0];
    this.imageObj= FILE;
    if(this.imageObj.type ==  "image/jpeg" || this.imageObj.type ==  "image/png" || this.imageObj.type ==  "image/jpg"){
    this.filesToUpload = <Array<File>>fileInput.target.files;
 
     let files = <Array<File>>fileInput.target.files;
    this.urls = [];
     if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
          this.imgUN = e.target.result;
          this.imL = true;
        }
        reader.readAsDataURL(file);
      }
    }
     if(this.filesToUpload != undefined){
      this.imL = false;
    }
  }else{
    this.filesToUpload = undefined;
     this.imL = false;
     this.imgUN = undefined;
      this._messageService.showError('Error','Solo se permite subir fotos.')
  }
  }

  actualizarVoluntario(stepper: MatStepper){
    this.registrando = true;
    this._messageService.showInfo('Actualizar','Procesando actualización del voluntario')
    this.usuario.nombres = this.nombres.value.trim();
    this.usuario.apellidos = this.apellidos.value.trim();
    this.usuario.cedula = this.cedula.value.trim();
    this.usuario.fechaNacimiento = this.fechaNacimiento.value;
    this.usuario.correo = this.correo.value.trim();
    this.usuario.tipoVoluntario = this.tipoVoluntario.value;
    this.usuario.disponibilidadTiempo = this.disponibilidadTiempo.value;
    this.usuario.direccion = this.direccion.value.trim();
    this.usuario.telefono = this.telefono.value;
    this.usuario.celular = this.celular.value;
    if(this.direccionSelec != ''){
      this.usuario.direccionMap = this.direccionSelec;
    }else{
      this.usuario.direccionMap = this.usuario.direccionMap
    }
   var validar = this.validar(this.usuario.cedula)
    if(validar == true){
      if(this.nm == 'noe' &&  this.cor == 'noe'){
        this._fundacionService.actualizarUsuario2(this.usuario,this.usuario._id).subscribe(
          response=>{
            if(response.usuario && response.n=='1'){
              if(this.filesToUpload != undefined){
                const imageForm = new FormData();
                        imageForm.append('image', this.imageObj);
                        this._uploadService.imageUpload(imageForm,'subir-foto-usuario/',response.usuario._id).subscribe(res => {
                          this.actualizar = false;
                          this.registrando = false;
                          this.actualPage()
                          this.imL = false;
                                 this.imgUN = undefined;
                                 stepper.selectedIndex = 0;
                                 this.direccionSelec != ''
                          this._messageService.showSuccess('Voluntario','Actualizado exitosamente')
                          
                          $('#modalMascota').modal('hide')
                        });
              
              }else{
                this.actualizar = false;
                this.registrando = false;
                this.imL = false;
                this.imgUN = '';
                  this.actualPage()
                  stepper.selectedIndex = 0;
                  this.direccionSelec != ''
                  this._messageService.showSuccess('Voluntario','Actualizado exitosamente')
                  $('#modalMascota').modal('hide')
              }
    
            }else{
              this.registrando = false;
              this._messageService.showError('Voluntario','Algo salió mal, intentalo de nuevo.')
            }
          },
          error=>{
            this.registrando = false;
            this._messageService.showError('Voluntario','Algo salió mal, intentalo de nuevo.')
          }
        )
      }else{
        this.registrando = false;
        this._messageService.showError('Correo','El correo ya esta en uso')
      }
    }else{
      this.registrando = false;
      this._messageService.showError('Cédula','El número de cedula no es válido')
      }
  }
  
  validar(ced) {
    var cad = ced.trim();
    var total = 0;
    var longitud = cad.length;
    var longcheck = longitud - 1;
    if (cad !== "" && longitud === 10){
      for(var i = 0; i < longcheck; i++){
        if (i%2 === 0) {
          var aux = cad.charAt(i) * 2;
          if (aux > 9) aux -= 9;
          total += aux;
        } else {
          total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
        }
      }

      total = total % 10 ? 10 - total % 10 : 0;

      if (cad.charAt(longitud-1) == total) {
        return true;
      }else{
        return false;
      }
    }
  }

  registrarVoluntario(stepper: MatStepper){
    if(this.direccionSelec != ''){
      this._messageService.showInfo('Registro','Procesando registro del voluntario')
      this.registrando = true;
      this.usuarioVoluntario.nombres = this.nombres.value.trim();
      this.usuarioVoluntario.apellidos = this.apellidos.value.trim();
      this.usuarioVoluntario.cedula = this.cedula.value.trim();
      this.usuarioVoluntario.fechaNacimiento =this.fechaNacimiento.value;
      this.usuarioVoluntario.correo = this.correo.value.trim();
      this.usuarioVoluntario.password = this.password.value.trim();
      this.usuarioVoluntario.tipoVoluntario = this.tipoVoluntario.value;
      this.usuarioVoluntario.disponibilidadTiempo = this.disponibilidadTiempo.value;
      this.usuarioVoluntario.telefono = this.telefono.value;
      this.usuarioVoluntario.celular = this.celular.value;
      this.usuarioVoluntario.direccionMap = this.direccionSelec;
      if(this.usuarioVoluntario.nombres != "",
        this.usuarioVoluntario.apellidos != "",
        this.usuarioVoluntario.cedula != "",
        this.usuarioVoluntario.fechaNacimiento != "",
        this.usuarioVoluntario.correo != "",
        this.usuarioVoluntario.password != "",
        this.usuarioVoluntario.tipoVoluntario != "",
        this.usuarioVoluntario.disponibilidadTiempo != "",
        this.usuarioVoluntario.telefono != "",
        this.usuarioVoluntario.celular != ""
        ){
          var valid = this.validar(this.usuarioVoluntario.cedula);
          if(valid == true){
  
            this._fundacionService.validarUsuarioV(this.usuarioVoluntario).subscribe(
              response=>{
                if(response.n == '6'){
                  this._fundacionService.registerVoluntario(this.usuarioVoluntario).subscribe(
                    response =>{
                      if(response.usuario && response.usuario._id){
                        var mail = {
                          asunto:"NEWVOLUNTARIO",
                          fundacion:this.currentUser.usuario.nombreFundacion,
                          fullname:response.usuario.nombres + ' ' + response.usuario.apellidos ,
                          password:this.password.value,
                          correo : response.usuario.correo
                        }
                        if(this.filesToUpload != undefined){
  
                          const imageForm = new FormData();
                          imageForm.append('image', this.imageObj);
                          this._uploadService.imageUpload(imageForm,'subir-foto-usuario/',response.usuario._id).subscribe(res => {
                            this.enviaEmail(mail)
                            this.direccionSelec != ''
                            this._messageService.showSuccess('Exito','Voluntario registrado')
                            this.registrando = false;
                            this.resets()
                           this.actualPage()
                           this.imL = false;
                           this.imgUN = undefined;
                          });
  
                       
                        }else{
                          this._messageService.showSuccess('Exito','Voluntario registrado')
                          this.direccionSelec != ''
                          this.resets()
                          this.actualPage()
                          this.imL = false;
                          this.registrando = false;

                          this.imgUN = undefined;
                        }
                      }else{
                        this.registrando = false;
                        this._messageService.showError('Error',response.message)
                      }
                    },
                    error =>{
                      this.registrando = false;
                      this._messageService.showError('Foto','No se pudo registrar, intentalo de nuevo')
                    }
                  );
                  
                }else if(response.n == '5'){
                  this.registrando = false;
                  stepper.selectedIndex = 0;
                  this._messageService.showError('Formulario','El número de cédula  ya está en uso')
  
                }else if(response.n == '2'){
                  this.registrando = false;
                  stepper.selectedIndex = 0;
                  this._messageService.showError('Formulario','La cédula y correo electrónico ya están en uso')
                }else if(response.n == '3'){
                  this.registrando = false;
                  stepper.selectedIndex = 1;
                  this._messageService.showError('Formulario','El correo electrónico ya está en uso')
                }
              },
              error=>{
                this.registrando = false;
                this._messageService.showError('Formulario','No se pudo validar los datos, intentalo de nuevo')
              }
            )
          }else{
            this.registrando = false;
            stepper.selectedIndex = 0;
            this._messageService.showError('Formulario','El número de cédula no es válido')
          }
      }else{
        this.registrando = false;
        this._messageService.showError('Formulario','Llena todos los campos')
      }
    }else{
      this.registrando = false;
      this._messageService.showError('Error','Selecciona la dirección del voluntario.')
    }
  }
  enviaEmail(mail){
    this._userService.enviarEmail(mail).subscribe(
      res=>{

      },
      err=>{
      }
    )
  }
  resets(){
    $("#RGF")[0].reset();
    $("#RGF2")[0].reset();
    $("#RGF3")[0].reset();
    this.disponibilidadTiempo.setValue(null)
    this.tipoVoluntario.setValue(null)
 $('#modalMascota').modal('hide')
  }               
  resets2(){
    $("#RGF")[0].reset();
    $("#RGF2")[0].reset();
    $("#RGF3")[0].reset();
    this.disponibilidadTiempo.setValue(null)
    this.tipoVoluntario.setValue(null)
  
  } 
  
  eliminarVoluntarioEstado(usuario,id){
    this._fundacionService.eliminarVoluntarioEstado(usuario,id).subscribe(
      response=>{
        if(response.usuario && response.n == '1'){
          this.actualizar = false;
                this.imL = false;
                this.imgUN = '';
                this.resets()
                  this.actualPage()
 
          this._messageService.showSuccess('Voluntario','El voluntario fue eliminado')


        }else if(response.n == '4'){
          this._messageService.showError('Permisos','No tienes permisos para realizar esta acción')

        }
      }, 
      error=>{
        this._messageService.showError('Error','No se pudo eliminar al voluntario')
      }
    );
  }
    activarVoluntarioEstado(usuario,id){
      this._fundacionService.activarVoluntarioEstado(usuario,id).subscribe(
        response=>{
          if(response.usuario && response.n == '1'){
            this.actualizar = false;
                  this.imL = false;
                  this.imgUN = '';
                  this.resets()
                    this.actualPage()
   
            this._messageService.showSuccess('Voluntario','El voluntario fue activado')
  
  
          }else if(response.n == '4'){
            this._messageService.showError('Permisos','No tienes permisos para realizar esta acción')
  
          }
        }, 
        error=>{
          this._messageService.showError('Error','No se pudo activar al voluntario')
        }
      );
    }
  openDialogMap(): void {
    $('#modalMascota').modal('hide')
    const dialogRef = this.dialog.open(MapCustomComponent, {
      width: '500px',
      height: '500px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      $('#modalMascota').modal('show')
      if(result != null && result != undefined && result != ''){
        this.direccionSelec = result;
        if(this.actualizar == true){
          this.usuario.direccionMap = this.direccionSelec
        } 
        this.loadMap(this.direccionSelec.latLng.lat,this.direccionSelec.latLng.lng)
      }else{
        this.direccionSelec = ''
      }
      
    });
  }

  async loadMap(lat,lng){
   $( document ).ready(()=> {
     const mapEle:HTMLElement = document.getElementById('mapcustom');
    this.mapHtml = mapEle;
    this.donLatLng.lat = lat
    this.donLatLng.lng = lng
    $("#mapcustom").addClass('mapCustom')
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
}
