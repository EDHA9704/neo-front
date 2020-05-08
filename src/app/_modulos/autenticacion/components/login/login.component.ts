import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../../../_shared/services';
import { MessagesService } from 'src/app/_shared/messages/messages.service';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { UsuarioFundacion } from 'src/app/_models/usuarioFundacion';
import { Mail } from 'src/app/_models/mail';
import { Codigo } from 'src/app/_models/codigo';
import { UploadService } from 'src/app/_shared/services/upload.service';
declare var $:any;
import { NotificacionService } from 'src/app/_shared/services/notificacion.service';
import {MapCustomComponent} from 'src/app/_shared/components/map-custom/map-custom.component'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLinear = true;
  formGr1: FormGroup;
  formGr2: FormGroup;
  formGr3:FormGroup;
  loading = false;
  loadingRG = false;
  loadingCodigo= false;
  submitted = false;
  returnUrl: string;
  error = '';
  public imgUN2:any;
  public imL2 = false;
  public usuarioFundacion:UsuarioFundacion;
  public usuarioFundacion2:UsuarioFundacion;
  public mail:Mail;
  public codi:Codigo;
  public advertenciaCodigo = ''
  public direccionSelec:any = ''
  @ViewChild('stepper', {static: true}) private myStepper: MatStepper;
  totalStepsCount: number;
  sector2= [
    {value: 'Norte'},
    {value: 'Centro'},
    {value: 'Sur'}
  ];
  minDate = new Date(1980, 0, 1);
  maxDate = new Date();
  rgxPass  = new RegExp("^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$")
  rgxPass2  = new RegExp("^(?=.*\\d)(?=.*[\\u0021-\\u002b\\u003c-\\u0040])(?=.*[A-Z])(?=.*[a-z])\\S{8,30}$")
  rgx3 = new RegExp("[\\w ]+")
  rg = new RegExp("^([a-zA-ZñáéíóúñÑ]+[\\s]+[a-zA-ZñáéíóúñÑ]+[\\s]*)+$")
imageObj: File;
imageUrl: string;
hide = true; 
hide2 = true;
fullUrl:any
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,public dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private _meesageService:MessagesService,private _uploadService:UploadService,private _notificacionService:NotificacionService) { 
      this.usuarioFundacion = new UsuarioFundacion("","","","","","","","","","","","","","","","","","","","","","","",0,"")
      this.usuarioFundacion2 = new UsuarioFundacion("","","","","","","","","","","","","","","","","","","","","","","",0,"")
      this.mail = new Mail("","","","","","");
      this.codi = new Codigo("","", "","","",""
      )
    }

  ngOnInit() {
    $( document ).ready(()=> {
      $('#password2').popover({ trigger: 'focus', title: 'Contraseña', content: "La contraseña debe contener entre 8-20 caracteres, al menos 1 letra mayúscula, 1 letra minúscula, 1 número y un caracter no alfanumérico." })
      this.animationLogin()
  });
    this.loginForm = this.formBuilder.group({
      correo: ['', Validators.required],
      password: ['', Validators.required]
  });
  this.forms()
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get fl() { return this.loginForm.controls; }
  get f() { return this.formGr1.controls; }
  get f2() { return this.formGr2.controls; }
  get f3() { return this.formGr3.controls; }

  onSubmit(){
    var OneSignal = window['OneSignal'] || [];
    this.loading = true;
    this.error = ''
    this.authenticationService.login(this.loginForm.value,true).subscribe(
      response=>{
        if(response.n == '4'){
          OneSignal.getUserId().then((userId) =>{
            var device = { 
              usuario:response.usuario._id,
              onesgId:userId,
              rol:response.usuario.rol
            }
            localStorage.setItem('idsignal', JSON.stringify(userId));
            this._notificacionService.nuevaOneSignal(device).subscribe(
              response=>{
              },
              error=>{
              }
            )
          });
          if(this.returnUrl && this.returnUrl != '' && this.returnUrl != null  && this.returnUrl != undefined){
            this.router.navigate([this.returnUrl]);
            setTimeout(() => {
              this.loading = false;
            }, 1000);
          }else{
            if(response.usuario.rol == '1'){
              this.router.navigate(['/admin']);
              setTimeout(() => {
                this.loading = false;
              }, 1000);
               
             }else if(response.usuario.rol == '4'){
              this.router.navigate(['/fundacion',response.usuario._id,'nosotros']);
              setTimeout(() => {
                this.loading = false;
              }, 1000);
             }else{
              this.router.navigate(['/home']);
              setTimeout(() => {
                this.loading = false;
              }, 1000);
             }
          }
        }else{
          this.error = 'No se pudo identificar el usuario'
          this._meesageService.showError('Error',this.error)
        }
      }, 
      error =>{
        this.loading = false;
        this.error = 'No se pudo identificar el usuario'
        this._meesageService.showError('Error',this.error)
        var errorMessage = <any>error;
      
      }
    )
  }
 
  animationLogin(){
        const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
});
  }
  forms(){
    this.formGr1 = this.formBuilder.group({
      nombres : ['', [Validators.required, Validators.pattern('[a-z A-Z áéíóúÁÉÍÓÚñÑ]+$'), Validators.maxLength(20),Validators.minLength(3)]],
    fechaFunda :['', [Validators.required]],
    representante:['', [Validators.required, Validators.pattern(this.rg), Validators.maxLength(50),Validators.minLength(10)]],
    foto :['', [Validators.required]],
    });
    this.formGr2 = this.formBuilder.group({
      correo2 : ['', [Validators.required, Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')]],
      password2:['', [Validators.required, Validators.maxLength(30), Validators.pattern(this.rgxPass2)]],
      telefono :['', [Validators.required,Validators.pattern('^([0-9]){9,10}$')]],
      celular :['', [Validators.required,Validators.pattern('^([0-9]){10,10}$')]]
    });
    this.formGr3 = this.formBuilder.group({
    
      sector : ['', [Validators.required]],
      barrio : ['', [Validators.required,Validators.maxLength(50),Validators.minLength(4),Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ . , : ; -]+$')]],
     
    });
  }
  //para fundaciones
public filesToUpload2: Array<File>;
urls2 = new Array<string>();
fileChangeEvent2(/*fileInput:any*/event: any){
  const FILE = (event.target as HTMLInputElement).files[0];
  this.imageObj = FILE;
  if(this.imageObj.type ==  "image/jpeg" || this.imageObj.type ==  "image/png" || this.imageObj.type ==  "image/jpg"){
  this.filesToUpload2 = <Array<File>>event.target.files;
  
   let files = <Array<File>>event.target.files;
  this.urls2 = []; 
   if (files) {
    for (let file of files) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.urls2.push(e.target.result);
        this.imgUN2 = e.target.result;
        this.imL2 = true;
      }
      reader.readAsDataURL(file);
    }
  }
   if(this.filesToUpload2 != undefined){
    this.imL2 = false;
  }
}else{
  this.filesToUpload2 = undefined;
  this.imL2 = false;
  this.imgUN2 = undefined;
   this._meesageService.showError('Error','Solo se permite subir fotos.')
}
}

enviarEmailRF(stepper: MatStepper){
  this.loadingRG = true;
  this._meesageService.showInfo('Registro','Estamos procesando tu registro')

  let nombre = this.formGr1.value.nombres;
  let nombreClean = nombre.replace('Fundación','')
  let nombreClean2 = nombreClean.replace('Fundacion','')
  let nombreClean3 = nombreClean2.replace('fundación','')
  let nombreClean4 = nombreClean3.replace('fundacion','')

  this.usuarioFundacion.nombreFundacion = nombreClean4.trim()
  var fec = new Date( this.formGr1.value.fechaFunda);
  var fechaFin = fec.toLocaleDateString();
  this.usuarioFundacion.fechaFundacion = fechaFin;
  this.usuarioFundacion.representante = this.formGr1.value.representante;

  this.usuarioFundacion.correo = this.formGr2.value.correo2;
  this.usuarioFundacion.passwordFundacion = this.formGr2.value.password2;
  this.usuarioFundacion.telefono = this.formGr2.value.telefono;
  this.usuarioFundacion.celular = this.formGr2.value.celular;
  this.usuarioFundacion.sector = this.formGr3.value.sector;
  this.usuarioFundacion.barrio = this.formGr3.value.barrio;
  this.usuarioFundacion.direccionMap = this.direccionSelec;

this.usuarioFundacion2 = this.usuarioFundacion;
  this.authenticationService.validarUsuarioF(this.usuarioFundacion2).subscribe(
    response=>{

      if(response.n == '6'){
    
        this.mail.asunto = "VRFC";
        this.mail.nombreFundacion = this.usuarioFundacion2.nombreFundacion;
        this.mail.contraseniaFundacion = "";
        this.mail.correoFundacion = this.usuarioFundacion2.correo;
      
        this.authenticationService.enviarEmail(this.mail).subscribe(
          res=>{
            //this.advertencia = false;
            $('#modalFundacion').modal('show');
            this.loadingRG = false;
             if(res.n == '3'){
              
             }else if(res.n == '1'){
              $('#modalFundacion').modal('hide');
              this.loadingRG = false;
              this._meesageService.showError('Error','No se pudo enviar el código de verificación. Inténtalo de nuevo')

             }else{
              this.loadingRG = false;
              $('#modalFundacion').modal('hide');
              this._meesageService.showError('Error','No se pudo enviar el código de verificación. Inténtalo de nuevo')
             }
      
           },
           err=>{
            this.loadingRG = false;
            $('#modalFundacion').modal('hide');
            this._meesageService.showError('Error','No se pudo enviar el código de verificación. Inténtalo de nuevo')
           }
         )
      }else if(response.n == '5'){
        this.loadingRG = false;
        stepper.selectedIndex = 0;
        this._meesageService.showError('Error','El nombre de la fundación ya se encuentra registrado')
      }else if(response.n == '2'){
        this.loadingRG = false;
        stepper.selectedIndex = 0;
        this._meesageService.showError('Error','El nombre y el correo de la fundación ya están en uso')

      }else if(response.n == '3'){
        this.loadingRG = false;
        stepper.selectedIndex = 1;
        this._meesageService.showError('Error','El correo ya se encuentra registrado')
      }
    },
    error=>{
      this.loadingRG = false;
      this._meesageService.showError('Error','No se pudo validar los datos. Inténtalo de nuevo')

    }
  )
}

verificarCodigo(){

 this.loadingCodigo = true
 this.authenticationService.verificarCodigo(this.usuarioFundacion2.correo, this.codi.codigo,'newUser').subscribe(
   responseC=>{
    if(responseC.n == '1' && responseC.codigo){
  this.authenticationService.registerFundacion(this.usuarioFundacion2,'fund').subscribe(
    response =>{

      if(response.usuario && response.usuario._id && response.n == '1'){ 
        const imageForm = new FormData();
        imageForm.append('image', this.imageObj);
        this._uploadService.imageUpload(imageForm,'subir-foto-fundacion/',response.usuario._id).subscribe(res => {
          this.imageUrl = res['image'];
        });
        this.loadingCodigo = false
              $('#modalFundacion').modal('hide');
              $('#modalFundacion2').modal('show');
              this.direccionSelec = ''
              this.limipiarForms()
              this.authenticationService.eliminarCodigo(responseC.codigo._id).subscribe(
                response=>{

                },
                error=>{

                }
              )
      }else if(response.n == '4'|| response.n == '6'){
        this.loadingCodigo = false
              $('#modalFundacion').modal('hide');
        this._meesageService.showError('Registro',response.message)
      }else {
        this.loadingCodigo = false
              $('#modalFundacion').modal('hide');
        this._meesageService.showError('Registro','Algo salió mal al procesar el registro, inténtalo de nuevo.')

      }
    },
    error =>{
     this.advertenciaCodigo = 'error'
     this.loadingCodigo = false
     $('#modalFundacion').modal('hide');
     this._meesageService.showError('Registro','Algo salió mal al procesar el registro, inténtalo de nuevo.')
      
    }
  );
    
    }else{
      this.loadingCodigo = false
      this._meesageService.showInfo('Código','El código es incorrecto')
      this.advertenciaCodigo = 'codIn'
    }
   },
   error=>{
    this.loadingCodigo = false
    this._meesageService.showError('Código','Error al validar el código, inténtalo de nuevo.')

   }
 )
}
validarNextStep(op,stepper: MatStepper){


   
   
  if(op == '1'){
    if(this.formGr1.value.foto == ''){
      this._meesageService.showError('Logo','Selecciona un logo de tu fundación')

    }
    if( /^\s*$/.test(this.formGr1.value.nombres) || /^\s*$/.test(this.formGr1.value.representante)){
     this._meesageService.showError('Formulario','Revisa el formulario, no se permite campos vacíos')
    }else{
      var n = this.formGr1.value.nombres.trim();
      var r = this.formGr1.value.representante.trim();
      this.formGr1.controls['nombres'].setValue(n);
      this.formGr1.controls['representante'].setValue(r);
      if(n.length < 3 && r.length < 10){
        this._meesageService.showError('Formulario','Revisa el formulario, el nombre de la fundación y representante no son válidos')  
      }else if(n.length < 3 && r.length >= 10){
        this._meesageService.showError('Formulario','Revisa el formulario, el nombre de la fundación no es válido')  
      }else if(n.length >= 3 && r.length < 10){
        this._meesageService.showError('Formulario','Revisa el formulario, Los nombres y apellidos del representante no son válidos')  

      }else{
        stepper.selectedIndex = 1;
      }
   

    }
  }
  if(op == '2'){
    if( /^\s*$/.test(this.formGr3.value.calleP) || /^\s*$/.test(this.formGr3.value.calleS ) || /^\s*$/.test(this.formGr3.value.barrio )){
      this._meesageService.showError('Formulario','Revisa el formulario, no se permite campos vacíos')  

     }else{
      var b = this.formGr3.value.barrio.trim();
      this.formGr3.controls['barrio'].setValue(b);
      if(b.length < 4 ){
        this._meesageService.showError('Formulario','Revisa el formulario, El barrio especificado no es válido')  
      }else if(this.direccionSelec == ''){
        this._meesageService.showError('Dirección','Selecciona tu dirección en el mapa')  
      }
      else{
        this.enviarEmailRF(stepper)
      }
     
     }
  }
 



}

limipiarForms(){
  this.formGr1.reset()
  this.formGr2.reset()
  this.formGr3.reset()
}

openDialogMap(): void {
  const dialogRef = this.dialog.open(MapCustomComponent, {
    width: '500px',
    height: '500px',
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result != ''){
      this.direccionSelec = result;
    }else{
      this.direccionSelec = ''
    }
  });
}
}
