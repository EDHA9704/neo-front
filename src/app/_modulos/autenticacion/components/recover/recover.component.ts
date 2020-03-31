import { Component, OnInit,ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
//import {PassValidator} from '../../../validators/age'

import { AuthenticationService,UserService } from '../../../../_shared/services';

import { MatStepper } from '@angular/material/stepper';
import { UsuarioFundacion } from '../../../../_models/usuarioFundacion';
import {Codigo} from '../../../../_models/codigo'
import {Router, ActivatedRoute, Params} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesService } from 'src/app/_shared/messages/messages.service';

declare var $:any;
@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css'],
  providers:[UserService]
})
export class RecoverComponent implements OnInit {
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public threeFormGroup: FormGroup;

  public vall;
  public vallE;

  public vall2;
  public vallE2;
  public vall3;
  public vallE3;

  public mensaje;
  public mensaje2;

  public user:UsuarioFundacion;
  public codi:Codigo;
  hide = true;
  @ViewChild('stepper', {static: true}) private myStepper: MatStepper;
  totalStepsCount: number;
  public isLinear;
  constructor(private _route:ActivatedRoute,
    private _router:Router,private _formBuilder: FormBuilder,private _usuarioService:UserService,private _meesageService:MessagesService) {
    this.isLinear = true;
    this.vall = null;
    this.vallE = null;
    this.vall2 = null;
    this.vallE2 = null;

    this.vall3 = null;
    this.vallE3 = null;

    this.user = new UsuarioFundacion("","","","","","","","","","","","","","","","","","","","","","","",0,"")
    this.codi = new Codigo("","","","","","")
   }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.secondFormGroup = this._formBuilder.group({
      codigo: ['', [Validators.required,Validators.pattern('[0-9]{4}')]]
    });
    this.threeFormGroup = this._formBuilder.group({
      password: ['', [Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/)]]
    });
  }
  ngAfterViewInit() {
    this.totalStepsCount = this.myStepper._steps.length;
  }

validarCorreo(stepper: MatStepper){
  this.user = new UsuarioFundacion("","","","","","","","","","","","","","","","","","","","","","","",0,"")
    var usuario = this.firstFormGroup.value;
    this._usuarioService.obtUsuarioCorreo(usuario).subscribe(
      response=>{
        console.log(response)
        if(response.usuario && response.n == '1'){

          this.user._id = response.usuario._id;
          this.user.correo = response.usuario.correo;
          this.user.nombreFundacion = response.usuario.nombreFundacion;
          
          this.enviarCodigoRecover(this.user,this.user._id,stepper);
        }
        
      },
      error =>{
        var errorMessage = <any>error;
        console.log(error)
        if(error.error.n == '2' ){
          this.vall = false;
          this.mensaje = 'No existe una cuenta asociada al correo electrónico.'
        }else{
          this.vall = false;
          this.mensaje = 'Algo salió mal, intentalo mas tarde...'
        
        }

      }
    )
    

   }


enviarCodigoRecover(usuario:UsuarioFundacion,id, stepper: MatStepper){
  
  this._usuarioService.enviarCodigoRecover(usuario,id).subscribe(
    response=>{
      console.log(response)
      if(response.codigo && response.n == '3'){
        this.vall = true;
        this.codi = response.codigo;
          setTimeout(() => {           // or do some API calls/ Async events
            stepper.next();
            this.vallE = true;
           }, 1);

      }


    },
    error=>{
      var errorMessage = <any>error;

      console.log(<any>error)
        this.vall = false;
        this.mensaje = 'Algo salió mal, intentalo mas tarde...'
      

    }
  )
}

verificarCodigo(stepper: MatStepper){
  var codiV = this.secondFormGroup.value;
 
  this._usuarioService.verificarCodigo(this.user._id,codiV.codigo,'recover').subscribe(
    response=>{
      if(response.n == '1'){
        this.vall2 = true;
        this.eliminarCodigo(stepper)
          setTimeout(() => {           // or do some API calls/ Async events
            stepper.next();
            this.vallE2 = true;
           }, 1);
      //  this.eliminarCodigo(stepper)
         

      }
    },
    error=>{

      if(error.error.n == '4' ){
        this.vall2 = false;
        this.mensaje2 = 'Código incorrecto.'
      }else{
        this.vall2 = false;
        this.mensaje2 = 'Algo salió mal, intentalo mas tarde...'
      
      }

    }
  )
}
eliminarCodigo(stepper: MatStepper){
 
  this._usuarioService.eliminarCodigo (this.codi._id).subscribe(
    response=>{
      if(response.n == '1'){
        

      }
    },
    error=>{
      var errorMessage = <any>error;

      console.log(<any>error)
      this.vall2 = false;
      this.mensaje2 = 'Algo salió mal, intentalo mas tarde...'
    }
  )
}
ela(stepper: MatStepper){
  
}
eliminarCodigoPrev(stepper: MatStepper){
  this._usuarioService.eliminarCodigo(this.codi._id).subscribe(
    response=>{
      if(response.n == '1'){
        
        this.vallE = null;
        this.vall2 = null;
        this.vallE2 = null;
        this.vall = null;
        //this.vallE = null;
        this.vall3 = null;
        this.vallE3 = null;
        this.codi = null;
        this.user = null;
      
        setTimeout(() => {           // or do some API calls/ Async events
          stepper.selectedIndex = 0;
         }, 2);
       


      }
    },
    error=>{
      var errorMessage = <any>error;

      console.log(<any>error)
      this.vall2 = false;
      this.mensaje2 = 'Algo salió mal, intentalo mas tarde...'
    }
  )
}
eliminarCodigoPrev2(stepper: MatStepper){
  this._usuarioService.eliminarCodigo(this.codi._id).subscribe(
    response=>{
      if(response.n == '1'){
        
        this.vallE = null;
        this.vall2 = null;
        this.vallE2 = null;
        this.vall = null;
        //this.vallE = null;
        this.vall3 = null;
        this.vallE3 = null;
        this.codi = null;
        this.user = null;
        setTimeout(() => {           // or do some API calls/ Async events
          this._router.navigate(['/autenticacion']);
         }, 2);
       


      }
    },
    error=>{
      var errorMessage = <any>error;

      console.log(<any>error)
      this.vall2 = false;
      this.mensaje2 = 'Algo salió mal, intentalo mas tarde...'
    }
  )
}

cambiarPassword(){
  var pss =  this.threeFormGroup.value;
  this.user.passwordFundacion = pss.password;

  this._usuarioService.cambiarPss(this.user,this.user._id).subscribe(
    response =>{

      if(response.usuario && response.n == '1'){
        this._meesageService.showSuccess('Actualizado','Se actualizó correctamente la contraseña')
       
        this._router.navigate(['/autenticacion']);

      }
      
    },
    error=>{
      console.log(<any>error)
      this._meesageService.showError('Error','No se pudo actualizar')
       
    }
  )
}
}
