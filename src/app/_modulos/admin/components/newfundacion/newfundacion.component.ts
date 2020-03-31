import { Component, OnInit,ViewChild, DoCheck } from '@angular/core';
import {UsuarioFundacion} from '../../../../_models/usuarioFundacion';
import {Mail} from '../../../../_models/mail';
import { UserService, AuthenticationService,} from '../../../../_shared/services';
import { UploadService } from 'src/app/_shared/services/upload.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormControl, Validators,FormBuilder,FormGroup} from '@angular/forms';
declare var $:any;
import { MatStepper } from '@angular/material/stepper';
import { environment } from '../../../../../environments/environment'; 
import { MessagesService } from 'src/app/_shared/messages/messages.service';
import {MapCustomComponent} from 'src/app/_shared/components/map-custom/map-custom.component'

@Component({
  selector: 'app-newfundacion',
  templateUrl: './newfundacion.component.html',
  styleUrls: ['./newfundacion.component.css'],
  providers:[UserService,UploadService,MatSnackBar]
})
export class NewfundacionComponent implements OnInit {
  public statusValid;
  isLinear = true;
  formGr1: FormGroup;
  formGr2: FormGroup;
  formGr3:FormGroup;
  public imgUN2:any;
  public mail:Mail;
  public imL2 = false;
  public url;
  public newF;
  public identity;
  public valid;
  public token;
  public usuarioFundacion:UsuarioFundacion;
  imageObj: File;
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
  hide = true; 
  hide2 = true;
  public direccionSelec:any = ''
  constructor(private _formBuilder: FormBuilder, private _route:ActivatedRoute,public dialog: MatDialog,
    private _router:Router,private _usuarioService:UserService,private _uploadService:UploadService,private _messageService:MessagesService) {
      
      this.url = environment.apiUrl;
    this.mail = new Mail("","","","","","");
    this.usuarioFundacion = new UsuarioFundacion(
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "", "",
      0,
      ""
 
    )
   }
   get f() { return this.formGr1.controls; }
   get f2() { return this.formGr2.controls; }
   get f3() { return this.formGr3.controls; }
 
   ngAfterViewInit() {
    this.totalStepsCount = this.myStepper._steps.length;
  }
  ngOnInit() {
   
    $(document).ready(()=>{
      this.prob()
            
        });
      
        this.formGr1 = this._formBuilder.group({
          nombres : ['', [Validators.required, Validators.pattern('[a-z A-Z áéíóúÁÉÍÓÚñÑ]+$'), Validators.maxLength(20),Validators.minLength(3)]],
        fechaFunda :['', [Validators.required]],
        representante:['', [Validators.required, Validators.pattern(this.rg), Validators.maxLength(50),Validators.minLength(10)]],
      
        });
        this.formGr2 = this._formBuilder.group({
          correo2 : ['', [Validators.required, Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')]],
          password2:['', [Validators.required, Validators.maxLength(30),Validators.minLength(8), Validators.pattern(this.rgxPass2)]],
          telefono :['', [Validators.required,Validators.maxLength(9),Validators.minLength(9),Validators.pattern('[0-9]+$')]],
          celular :['', [Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern('[0-9]+$')]]
      
      
        });
        this.formGr3 = this._formBuilder.group({
        
          sector : ['', [Validators.required]],
          barrio : ['', [Validators.required,Validators.maxLength(50),Validators.minLength(4),Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ , . -]+$')]],
         // calleP : ['', [Validators.required,Validators.maxLength(50),Validators.minLength(4),Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ , . -]+$')]],
          //calleS : ['', [Validators.required,Validators.maxLength(50),Validators.minLength(4),Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ , . - ]+$')]]
      
        });
  }
  
  prob(){

    $("#nombre").keyup(()=>{
      $("#nmbr").fadeOut("fast")
      this.formGr1.controls['nombres'].setValue(this.limpiarCampo(this.formGr1.value.nombres));

  
  }); 
  $("#representante").keyup(()=>{
     
    this.formGr1.controls['representante'].setValue(this.limpiarCampo(this.formGr1.value.representante));
   }); 
$("#barrio").keyup(()=>{
     
  this.formGr3.controls['barrio'].setValue(this.limpiarCampo(this.formGr3.value.barrio));
}); 
$("#calleP").keyup(()=>{
     
  this.formGr3.controls['calleP'].setValue(this.limpiarCampo(this.formGr3.value.calleP));
}); 
$("#calleS").keyup(()=>{
     
  this.formGr3.controls['calleS'].setValue(this.limpiarCampo(this.formGr3.value.calleS));
}); 
  $("#correo2").keyup(()=>{
    $("#corr").fadeOut("fast")

}); 

  }

  registrarFundacion(stepper: MatStepper){
    if(this.direccionSelec != ''){
      this.usuarioFundacion.nombreFundacion = this.formGr1.value.nombres;
      var fec = new Date( this.formGr1.value.fechaFunda);
      var fechaFin = fec.toLocaleDateString();
      this.usuarioFundacion.fechaFundacion = fechaFin;
      this.usuarioFundacion.representante = this.formGr1.value.representante;
    
      this.usuarioFundacion.correoCuenta = this.formGr2.value.correo2;
      this.usuarioFundacion.passwordFundacion = this.formGr2.value.password2;
      this.usuarioFundacion.telefono = this.formGr2.value.telefono;
      this.usuarioFundacion.celular = this.formGr2.value.celular;
      this.usuarioFundacion.sector = this.formGr3.value.sector;
      this.usuarioFundacion.barrio = this.formGr3.value.barrio;
      this.usuarioFundacion.direccionMap = this.direccionSelec;
     // this.usuarioFundacion.calleP = this.formGr3.value.calleP;
     // this.usuarioFundacion.calleS = this.formGr3.value.calleS;
    
    
     
    
      this._usuarioService.validarUsuarioF(this.usuarioFundacion).subscribe(
        response=>{
    
          if(response.n == '6'){
            this._usuarioService.registerFundacion(this.usuarioFundacion,'admin').subscribe(
              response =>{
              // this.usuarioFundacion2 = response.usuario;
                if(response.usuario && response.usuario._id && response.n == '1'){ 
                  var as = "RGFADMIN";
                  this.mail.idFundacion = response.usuario._id;
                  this.mail.asunto = as;
                  this.mail.idFundacion = response.usuario._id;
                  this.mail.nombreFundacion = response.usuario.nombreFundacion;
                  this.mail.contraseniaFundacion = this.usuarioFundacion.passwordFundacion;
                  this.mail.correoFundacion = this.usuarioFundacion.correo;
                  console.log(this.mail)
                  if(this.filesToUpload2 != undefined){
        
    
                    const imageForm = new FormData();
                imageForm.append('image', this.imageObj);
                this._uploadService.imageUpload(imageForm,'subir-foto-fundacion/',response.usuario._id).subscribe(res => {
                  
                  this._usuarioService.enviarEmail(this.mail).subscribe(
                    res=>{
                      
                      if(res.n == '3'){
                        
                       this.filesToUpload2 = undefined;
                       stepper.selectedIndex = 0;
                       this.resets()
                       this._messageService.showSuccess('Registro','Registro exitoso, se envió un correo con los accesos al sistema web para la fundación.')
                     
                      this.imL2 = false;
                      this.imgUN2 = undefined;
                      }else{
                        this._messageService.showError('Error','No se pudo enviar el correo de notificación')
    
                      }
    
                    },
                    err=>{
                      this._messageService.showError('Error','No se pudo enviar el correo de notificación')
                    }
                  )
                });
    
                  }else{
                    this._usuarioService.enviarEmail(this.mail).subscribe(
                      res=>{
                        
                        if(res.n == '3'){
                          
                         this.filesToUpload2 = undefined;
                         stepper.selectedIndex = 0;
                         this.resets()
    
                                            this._messageService.showSuccess('Registro','La fundación se registro exitosamente, se envió un correo.')
    
                        this.imL2 = false;
                        this.imgUN2 = undefined;
                        }else{
                          this._messageService.showError('Error','No se pudo enviar el correo de notificación')
    
                        }
    
                      },
                      err=>{
                        this._messageService.showError('Error','No se pudo enviar el correo de notificación')
    
                      }
                    )
                   
                   
                 
                  }
                    
                   
                  
                
                }else if(response.n == '4'|| response.n == '6'){
                  this._messageService.showError('Error',response.message)
    
                }else {
                  this._messageService.showError('Error','No se pudo procesar el registro')
    
        
                }
              },
              error =>{
                this._messageService.showError('Error','No se pudo procesar el registro')
    
                
              }
            );
          }else if(response.n == '5'){
            stepper.selectedIndex = 0;
            this.statusValid = 'errorNombre';
          }else if(response.n == '2'){
            stepper.selectedIndex = 0;
            this.statusValid = 'errorNC';
    
          }else if(response.n == '3'){
            stepper.selectedIndex = 1;
            this.statusValid = 'errorCorreo'
          }
        },
        error=>{
          this.statusValid = 'errorValidar'
    
        }
      )
    }else{
      this._messageService.showError('Error','Selecciona tu la dirección de la fundación en el mapa')
    }
 
    
   
   
  }

   //para fundaciones
   public filesToUpload2: Array<File>;
   urls2 = new Array<string>();
   fileChangeEvent2(event:any){
    const FILE = (event.target as HTMLInputElement).files[0];
    this.imageObj= FILE;
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
      this._messageService.showError('Error','Solo se permite subir fotos.')
    }
     
   }
   limpiarCampo(text){

    var textFin = text.replace(/([\\ \\]+(?=[\\ \\])|^\\s+|\\s+$)/g, '');
  
    text = textFin;
  
    return text;
  
  }
  validarNextStep(op,stepper: MatStepper){


   
   
    if(op == '1'){
     
      if( /^\s*$/.test(this.formGr1.value.nombres) || /^\s*$/.test(this.formGr1.value.representante)){
       
       this.statusValid = 'errorCampos'
        
  
      }else{
        
        this.statusValid = '';

        var n = this.formGr1.value.nombres.trim();
        var r = this.formGr1.value.representante.trim();
        this.formGr1.controls['nombres'].setValue(n);
        this.formGr1.controls['representante'].setValue(r);
        if(n.length < 3 && r.length < 10){
          this.statusValid = 'errorCampos2T'
        }else if(n.length < 3 && r.length >= 10){
          this.statusValid = 'errorCampos2N'
        }else if(n.length >= 3 && r.length < 10){
          this.statusValid = 'errorCampos2R'
        }else{
          this.statusValid == '';
          stepper.selectedIndex = 1;
        }
     
  
      }
    }
    if(op == '2'){
      if( /^\s*$/.test(this.formGr3.value.barrio )){
       
        this.statusValid = 'errorCamposFR2'
         
   
       }else{

        this.statusValid = '';
        var b = this.formGr3.value.barrio.trim();
       // var cp = this.formGr3.value.calleP.trim();
       // var cs = this.formGr3.value.calleS.trim();

        this.formGr3.controls['barrio'].setValue(b);
       

       
        if(b.length < 4){
          this.statusValid = 'errorCamposFR2E'
        }else{
          this.statusValid == '';
          this.registrarFundacion(stepper)
        }
       
       }
    }
   

  

  }
  resets(){
    this.formGr1.reset();
                this.formGr2.reset();
                this.formGr3.reset();
            
  }
  openDialogMap(): void {
    const dialogRef = this.dialog.open(MapCustomComponent, {
      width: '500px',
      height: '500px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
  
      if(result != ''){
        this.direccionSelec = result;
        this.usuarioFundacion.direccionMap = this.direccionSelec;
      }else{
        this.direccionSelec = ''
      }
      console.log('The dialog was closed',result);
      
    });
  }
}
