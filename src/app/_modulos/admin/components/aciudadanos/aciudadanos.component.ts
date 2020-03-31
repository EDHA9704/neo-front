import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService, AuthenticationService } from '../../../../_shared/services';

import {Router, ActivatedRoute, Params} from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {UsuarioFundacion} from '../../../../_models/usuarioFundacion';
import { environment } from '../../../../../environments/environment'; 
import { MessagesService } from 'src/app/_shared/messages/messages.service';
import { FormControl, Validators } from '@angular/forms';
import { UsuarioCiudadano} from 'src/app/_models/usuarioCiudadano';
declare var $:any;
@Component({
  selector: 'app-aciudadanos',
  templateUrl: './aciudadanos.component.html',
  styleUrls: ['./aciudadanos.component.scss'],
  providers:[UserService]
})
export class AciudadanosComponent implements OnInit {
  public fundaciones:any;
  public url;
  public identity;
  public token;
  public usuarioCiudadano:UsuarioCiudadano;
  public carga;
  public usuarioCiudadano2:any;
  maxDate = new Date();
  minDate = new Date(1980, 0, 1);
  displayedColumns: string[] = ['nombres','correo','estado','accion'];
 

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
 // displayedColumns: string[] = ['nombre'];
  //dataSource = ELEMENT_DATA;
  dataSource:any;
   
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  public currentUser;
  public idEliminar:any;


  nombres = new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z áéíóúÁÉÍÓÚñÑ]+$'), Validators.maxLength(25),Validators.minLength(4)]);
  apellidos = new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z áéíóúÁÉÍÓÚñÑ]+$'), Validators.maxLength(25),Validators.minLength(4)]);
  fechaNacimiento = new FormControl('', [Validators.required]);
  correo2 = new FormControl('', [Validators.required, Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')]);
  id = new FormControl('', [Validators.required]);

  telefono = new FormControl('', [Validators.required,Validators.maxLength(9),Validators.minLength(9),Validators.pattern('[0-9]+$')]);
  celular = new FormControl('', [Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern('[0-9]+$')]);
 
  public actualizarFunda = false;
  public direccionSelec:any = ''
  getErrorMessage() {
    return this.nombres.hasError('required') ? 'El nombre es requerido' :
    this.nombres.hasError('pattern') ? 'No se admite: símbolos, caracteres especiales o números':
            this.nombres.hasError('maxlength') ? 'Máximo 25 caracteres':
            this.nombres.hasError('minlength') ? 'Mínimo 4 caracteres':
            '';
  }
  getErrorMessage2() {
    return this.apellidos.hasError('required') ? 'Los apellidos son requeridos' :
    this.apellidos.hasError('pattern') ? 'No se admite: símbolos, caracteres especiales o números':
            this.apellidos.hasError('maxlength') ? 'Máximo 25 caracteres':
            this.apellidos.hasError('minlength') ? 'Mínimo 4 caracteres':
            '';
  }
  getErrorMessage3() {
    return this.fechaNacimiento.hasError('required') ? 'Fecha de fundación requerida' :  
            '';
  }
  
  
  getErrorMessage4() {
    return this.correo2.hasError('required') ? 'Correo requerido' :  
            this.correo2.hasError('pattern') ? 'Ingresa un correo válido':
            '';
  }
 
  getErrorMessage5() {
    return this.telefono.hasError('required') ? 'Teléfono requerido' : 
    this.telefono.hasError('maxlength') ? 'Máximo 9 caracteres':
    this.telefono.hasError('minlength') ? 'Mínimo 9 caracteres': 
    this.telefono.hasError('pattern') ? 'Número no válido':   

            '';
  }
  getErrorMessage9() {
    return this.celular.hasError('required') ? 'Celular requerido' : 
    this.celular.hasError('maxlength') ? 'Máximo 10 caracteres':
    this.celular.hasError('minlength') ? 'Mínimo 10 caracteres': 
    this.celular.hasError('pattern') ? 'Número no válido':   

            '';
  }
  public edFun
  constructor(private _route:ActivatedRoute,
    private _router:Router, private _userService:UserService,private authenticationService: AuthenticationService,
    private _messageService:MessagesService) { 
      this.currentUser = this.authenticationService.currentUserValue;
      this.url = environment.apiUrl;
      this.carga = true;
    }

  ngOnInit() {
    this._route.params.subscribe(params =>{

        this.obtCiudadanos()
      

    });
  }
  obtCiudadanos(){
    
    this._userService.obtUsuariosRolSP('3').subscribe(
      response=>{
        if(response.usuarios && response.n == '1'){
          this.carga = false;
            this.fundaciones = response.usuarios;
            this.dataSource = new MatTableDataSource<UsuarioFundacion>(this.fundaciones);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            console.log(this.fundaciones)
        }
      },
      error=>{
        this.carga = false;
        console.log(<any>error)
      }
    )
  }

  verificarEliminarCiudadano(id){
    $('#modalValidEliminarFUN').appendTo("body")
     $('#modalValidEliminarFUN').modal('show');
     this.idEliminar = id;
   }
  
   eliminarCiudadano(){
     this._userService.eliminarCiudadano(this.idEliminar).subscribe(
       response=>{ 
         if(response.n == '1'){
          this._messageService.showSuccess('Ciudadano','Se eliminó correctamente al ciudadano')
           this.obtCiudadanos()
           $('#modalValidEliminarFUN').modal('hide')
         }
       },
       error=>{
        this._messageService.showError('Error','No se pudo eliminar al ciudadano')
  
       }
     )
   }
   editarVol(user){
    $('#modalEditFun').appendTo("body")
    this.edFun = true
  
   this.usuarioCiudadano= user;
   this.id.setValue(user._id)
   this.obtenerCiudadano(user._id);
   console.log(this.usuarioCiudadano2)

   this.nombres.setValue(user.nombres);
   this.apellidos.setValue(user.apellidos);


   var temDate = user.fechaNacimiento.split("/")
   console.log(temDate)
   if(temDate[0] != '' && temDate[1] != null && temDate[0] != undefined){
    var temDate2 = temDate[0]+'/'+temDate[1]+'/'+temDate[2]
    var temdateFin = new Date(temDate2)

   this.fechaNacimiento.setValue(temdateFin)
   }else{
    var temDate = user.fechaNacimiento.split("-")
    var temDia = temDate[2].split('T')

    if(temDate[0] != '' && temDate[0] != null && temDate[0] != undefined){
      var temDate2 = temDate[1]+'/'+temDia[0]+'/'+temDate[0]
      var temdateFin = new Date(temDate2)
      this.fechaNacimiento.setValue(temdateFin)
    }else{
      var temdateFin = new Date(user.fechaNacimiento)
      this.fechaNacimiento.setValue(temdateFin)
    }
    
   }
   console.log(temdateFin)
   this.fechaNacimiento.setValue(temdateFin)
   this.correo2.setValue(user.correo)
   this.telefono.setValue(user.telefono)
   this.celular.setValue(user.celular)
  
   $('#modalEditFun').modal('show');
   $(document).ready(()=>{
   
    this.prob()
          
      });

  } 
  obtenerCiudadano(id){
    this._userService.obtUsuario(id).subscribe(
      response=>{
        this.usuarioCiudadano2 = response.usuario;
        console.log(this.usuarioCiudadano2)
      },
      error=>{
        console.log(<any>error)
      }
    )
  }
  prob(){

    $("#nombres").keyup(()=>{
      this.nombres.setValue(this.limpiarCampo(this.nombres.value));
  }); 
  $("#apellidos").keyup(()=>{
    this.apellidos.setValue(this.limpiarCampo(this.apellidos.value));
}); 



  }
  limpiarCampo(text){

    var textFin = text.replace(/([\\ \\]+(?=[\\ \\])|^\\s+|\\s+$)/g, '');
  
    text = textFin;
  
    return text;
  
  }
  async actualizarCiudadano(){
    this.actualizarFunda = true;
    // $('#modalEditFun').modal('hide');
    // console.log(this.fechaFunda.value)
     this.usuarioCiudadano.nombres= this.nombres.value.trim();
     this.usuarioCiudadano.apellidos= this.apellidos.value.trim();
     var fec = new Date( this.fechaNacimiento.value);
     var fechaFin = fec.toLocaleDateString();
     this.usuarioCiudadano.fechaNacimiento = fechaFin;
     this.usuarioCiudadano.correo = this.correo2.value.trim();
    
     this.usuarioCiudadano.telefono = this.telefono.value;
     this.usuarioCiudadano.celular = this.celular.value;
     this.usuarioCiudadano._id = this.id.value;
  

  
    this._userService.actualizarUsuarioCiudadano(this.usuarioCiudadano,this.usuarioCiudadano._id).subscribe(
      res=>{
        this.actualizarFunda = false;
        console.log(res)
        if(res.n == '1'){
          this.obtCiudadanos()
          this._messageService.showSuccess('Ciudadano','Datos actualizados correctamente')
         
          $('#modalEditFun').modal('hide');
        }else if(res.n == '2'){
          this._messageService.showError('Error','El correo se encuentra registrado en otra cuenta')
        }else{
          this._messageService.showError('Error','No se pudo actualizar los datos del ciudadano')
        }
        
      },
      err=>{
        this.actualizarFunda = false;
        this._messageService.showError('Error','No se pudo actualizar los datos del ciudadano')
        console.log(<any>err)
      }
    )
  
    
    }
}
