import { Component, OnInit, DoCheck, ViewChild } from '@angular/core';
import {environment} from '../../../../../environments/environment'
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from 'src/app/_shared/services/upload.service';
import { DonacionService } from 'src/app/_shared/services/donacion.service';
import { FormControl, Validators } from '@angular/forms';
import { Donacion } from 'src/app/_models/donacion';
import { UserService, AuthenticationService } from 'src/app/_shared/services';
import { MatStepper } from '@angular/material/stepper';
import { MessagesService } from 'src/app/_shared/messages/messages.service';
declare var $:any
@Component({
  selector: 'app-mis-donaciones',
  templateUrl: './mis-donaciones.component.html',
  styleUrls: ['./mis-donaciones.component.scss']
})
export class MisDonacionesComponent implements OnInit,DoCheck {
  @ViewChild('stepper', {static: true}) private myStepper: MatStepper;
  public carga;
  public mensaje;
  public url;
  public donaciones:any;
  public donacion:Donacion;
public page;
public next_page;
public prev_page;
public imgCom;
public type;
public pagesSelec = []
public total;
public pages;
public itemsPerPage;
public idFun

public tipoFL = ["Todos","Económica","Producto"];
public filtroBTN;
public select;
public filtroBSQ = [];
public tipE;
public tipP
public formSelect;
public imgUN2:any;
public userSelect:any
  public imL2 = false;
  public usuarios=[];
  public currentUser
  public fundacion:any
  public validPermission = false
//DONACION SELECCIONADA
public donacionSelect:any;
rgxPass  = new RegExp("([0-9]{7})")
rgxPass2  = new RegExp("([0-9]{10})")
myControl = new FormControl();
nombres = new FormControl('', [Validators.required, Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ]*$'), Validators.maxLength(25),Validators.minLength(4)]);
  apellidos = new FormControl('', [Validators.required,Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ]*$'), Validators.maxLength(40),Validators.minLength(4)]);
  cedula = new FormControl('', [Validators.required,Validators.maxLength(10),Validators.minLength(10)]);
  telefono = new FormControl('', [Validators.required,Validators.maxLength(9),Validators.minLength(9),Validators.pattern('[0-9]*$')]);
  celular = new FormControl('', [Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern('[0-9]*$')]);
  direccion = new FormControl('', [Validators.required,Validators.maxLength(300),Validators.minLength(5)]);
  correo = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')]);

  cantidad = new FormControl('', [Validators.required,Validators.maxLength(10), Validators.pattern('[0-9]*$')]);
  descripcion = new FormControl('', [Validators.required, Validators.maxLength(300), Validators.minLength(5), Validators.pattern('[a-z A-Z 0-9 áéíóúÁÉÍÓÚñÑ . , : ; -]*$')]);
  nombreProducto = new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(3), Validators.pattern('[a-z A-Z 0-9 áéíóúÁÉÍÓÚñÑ]*$')]);


  getErrorMessage() {
    return this.nombres.hasError('required') ? 'Ingresa al menos un nombre' :
    this.nombres.hasError('pattern') ? 'No se admite: símbolos, caracteres especiales o números':
            this.nombres.hasError('maxlength') ? 'Máximo 25 caracteres':
            this.nombres.hasError('minlength') ? 'Nombre no válido':
            '';
  }
  getErrorMessage2() {
    return this.apellidos.hasError('required') ? 'Ingresa al menos un apellido' :  
    this.apellidos.hasError('pattern') ? 'No se admite: símbolos, caracteres especiales o números':
            this.apellidos.hasError('maxlength') ? 'Máximo 40 caracteres':
            this.apellidos.hasError('minlength') ? 'Apellidos no válidos':
            '';
  }
  getErrorMessage3() {
    return this.cedula.hasError('required') ? 'Cédula requerida' : 
            this.cedula.hasError('maxlength') ? 'Cédula no válida':
            this.cedula.hasError('minlength') ? 'Cédula no válida':
            '';
  }
  
  
  getErrorMessage9() {
    return this.telefono.hasError('required') ? 'Teléfono requerido' : 
    this.telefono.hasError('maxlength') ? 'Teléfono no válido':
    this.telefono.hasError('minlength') ? 'Teléfono no válido': 
    this.telefono.hasError('pattern') ? 'Teléfono no válido':     
            '';
  }
  getErrorMessage10() {
    return this.celular.hasError('required') ? 'Celular requerido' : 
    this.celular.hasError('maxlength') ? 'Celular no válido':
    this.celular.hasError('minlength') ? 'Celular no válido': 
    this.celular.hasError('pattern') ? 'Celular no válido':   

            '';
  }
  getErrorMessage11() {
    return this.direccion.hasError('required') ? 'Dirección requerida' :  
            this.direccion.hasError('maxlength') ? 'Máximo 300 caracteres':
            this.direccion.hasError('minlength') ? 'Especifica mejor la dirección':
            '';
  }
  getErrorMessage12() {
    return this.correo.hasError('required') ? 'Correo requerido' :  
    this.correo.hasError('pattern') ? 'Ingresa un correo válido':
    '';
  }

  getErrorMessage13() {
    return this.cantidad.hasError('required') ? 'Cantidad de dinero requerido' :
    this.cantidad.hasError('pattern') ? 'Cantidad no valida':
            this.cantidad.hasError('maxlength') ? 'Cantidad no valida':
            '';
  }
  getErrorMessage14() {
    return this.descripcion.hasError('required') ? 'Descripción requerida' :  
    this.descripcion.hasError('pattern') ? 'No se admite: símbolos o caracteres especiales':
            this.descripcion.hasError('maxlength') ? 'Máximo 300 caracteres':
            this.descripcion.hasError('minlength') ? 'Describe mejor la donación':
            '';
  }
  getErrorMessage15() {
    return this.nombreProducto.hasError('required') ? 'Nombre del producto requerido' : 
    this.nombreProducto.hasError('pattern') ? 'No se admite: símbolos o caracteres especiales':

            this.nombreProducto.hasError('maxlength') ? 'Máximo 100 caracteres':
            this.nombreProducto.hasError('minlength') ? 'Especifica mejor el nombre':
            '';
  }
  imageObj: File;
  keyUrl
  fullUrl:string
  public loading = true;
  public advertencia;
  constructor(private _route:ActivatedRoute,
    private _router:Router,private _uploadService:UploadService,private router: Router,
    private _donacionService:DonacionService,
    private _userService:UserService,private _messageService:MessagesService,private authenticationService: AuthenticationService) { 
    this.url = environment.apiUrl;
    this.fullUrl = this.router.url.toString()
    this.keyUrl = this.fullUrl.split('/')
    this.page = 1;
    this.carga = true;
    this.imgCom ='';
    this.filtroBSQ = this._donacionService.obtFiltroDonacion();
    this.formSelect = false;
    this.currentUser = this.authenticationService.currentUserValue;
    this.userSelect =""
  }

  ngOnInit() {
    this.actualPage2();
    this.changeFiltros()
  }
  ngDoCheck(){
      this.filtroBSQ = this._donacionService.obtFiltroDonacion();
  }
  changeFiltros(){
    $(document).ready(()=>{
      $("#tamDrop").change(()=>{
  
        this.select = $("#tamDrop").val();
        this.filtroBSQD(this.select)
    });
  
  
  }); 
  }
  actualPage2(){
    this.type = '';
    this.pagesSelec = []
    this._route.params.subscribe(params =>{
     
      let tipo = params['tipo'];
      this.type = tipo;
      console.log(this.keyUrl)
      this.idFun = this.keyUrl[2]

      this.obtFundacion(this.idFun)
      if(this.currentUser && this.currentUser.usuario && this.currentUser.usuario._id == this.idFun){
        this.validPermission = true;
        let page = +params['page'];
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
          
          if(this.type == 'busqueda'){
            this.filtroBTN = true;
            //devolver listado de usuarios
            console.log(this.filtroBSQ)
           
            $(document).ready(()=>{
            this.filtroBSQ.forEach(elem => {
              if(elem.tipo == 'tipo'){
                $("#tamDrop").val(elem.option)
              }
    
            });
          });
          }else{
            $(document).ready(()=>{
            $("#tamDrop").val('Todos')
          });
            this.filtroBTN = false;
            //devolver listado de usuarios
            
          }
      }
  
    });
    
  }
  obtFundacion(id){

    this._userService.obtUsuario(id).subscribe(
      response=>{
        console.log("entro")
        
        this.carga == false
        this.fundacion = response.usuario;
        if(this.currentUser && this.currentUser.usuario._id == this.idFun){
          if(this.type == 'busqueda'){
            this.buscarDonaciones(this.page)
          }else{
            this.obtDonaciones(this.page);
          }
        }
       
        this.changeFiltros()
      },
      error=>{
        this.router.navigate(['**']);  
        console.log(<any>error);
      }
    )
    

  }
  obtDonaciones(page){
    this.loading = true;
    this.pagesSelec = []
    this.donaciones = []
    this._donacionService.obtDonaciones(this.idFun,page).subscribe(
      response =>{
        this.carga = false;
        this.donaciones = response.donaciones;
        console.log(this.donaciones)
        this.total = response.total;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
          for (let i = 1; i <= this.pages; i++) {
            this.pagesSelec.push(i)
            
          }
          this.advertencia = false;
          this.loading = false;
         $(document).ready(()=>{
         $(".content-grid-cards").addClass('visible')
         })
        
      },
      error=>{
        this.pagesSelec = []
        this.donaciones = []
        this.carga = false;
      
        this.loading = false;
        this.advertencia = true;
        var errorMessage = <any>error;
          console.log(errorMessage)
         
          if(errorMessage != null && error.error.n == '2'){
          
            this.mensaje = 'Lo sentimos, no existe donaciones registradas';
          }else if(errorMessage != null && error.error.n == '3'){
           
            this.mensaje = error.error.message;
          }else{
         
            this.mensaje = 'Algo salio mal, intentalo mas tarde'
          }
      }
    )
  }
  buscarDonaciones(page,adding=false){
    this.loading = true;
   this.pagesSelec = []
   this.donaciones = []
    this._donacionService.filtroDonaciones(this.idFun,this.filtroBSQ,page).subscribe(
      response=>{
        this.carga = false;
        if(response.donaciones && response.n == '1'){
          

          
          $(".carga").fadeOut("slow");
         
         // this.fotos = response.fot;
          this.total = response.donaciones.length;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
          this.donaciones = response.donaciones;
          this.advertencia = false;
          this.loading = false;
         $(document).ready(()=>{
         $(".content-grid-cards").addClass('visible')
         })
          for (let i = 1; i <= this.pages; i++) {
            this.pagesSelec.push(i)
            
          }
          //this.obtFotos(response.mascotas._id, page);
          
        }
      },
      error=>{
        this.pagesSelec = []
        this.donaciones = []
        this.loading = false;
        this.advertencia =true;
        this.carga = false;
        $(".carga").fadeOut("slow");
        var errorMessage = <any>error;
       
        
        if(errorMessage != null && error.error.n == '2'){
          this.mensaje = 'Lo sentimos, '+error.error.message;
         
         
        }else if(errorMessage != null && error.error.n == '5'){
          this.mensaje = 'No se ha elegigo filtros';
         
         
        }
        
        else{
  
         
          this.mensaje = 'Algo salio mal, intentalo mas tarde'
         
          
        }
      }
    )
  }
  filtroBSQD(option){

    
    var optionFinal = option;
    if(optionFinal == 'Económica' || optionFinal == 'Producto'){
      
      if(this.filtroBSQ == null){
       
        this.filtroBSQ = [];
        this.filtroBSQ.push({tipo:'tipo',option:optionFinal})
        
      }else{
       var ok = false;
        this.filtroBSQ.forEach(fl => {
          if(fl.tipo == 'tipo'){
            ok = true;
            fl.option = optionFinal;
          }
  
        });

        if(ok == false){
          this.filtroBSQ.push({tipo:'tipo',option:optionFinal})
        }
      }

      localStorage.setItem('busquedaDonaciones', JSON.stringify(this.filtroBSQ));
    }

    if(this.type == 'busqueda'){
      this.buscarDonaciones(this.page)
    }

    this._router.navigate(['/fundacion',this.idFun,'donaciones','busqueda','1']);
    
    

  }
  cancelarBus(){ 
    localStorage.removeItem('busquedaDonaciones');
    this._router.navigate(['/fundacion',this.idFun,'donaciones','todos','1']);
  }
  verComprobante(comprobante){
    $('#modalComprobante').modal('show')
    this.imgCom =comprobante;
    console.log(comprobante)

  }
  prob2(){

    $("#cedula").keyup(()=>{
      $("#nmbr4").fadeOut("fast")
      this.cedula.setValue(this.limpiarCampo(this.cedula.value));

  }); 
  $("#nombres").keyup(()=>{
    this.nombres.setValue(this.limpiarCampo(this.nombres.value));


}); 
$("#apellidos").keyup(()=>{
   
  this.apellidos.setValue(this.limpiarCampo(this.apellidos.value));
 }); 
$("#correo").keyup(()=>{
   
this.correo.setValue(this.limpiarCampo(this.correo.value));
}); 
$("#direccion").keyup(()=>{
   
this.direccion.setValue(this.limpiarCampo(this.direccion.value));
}); 
$("#direccion").keyup(()=>{
   
  this.direccion.setValue(this.limpiarCampo(this.direccion.value));
  }); 
  $("#descripcion1").keyup(()=>{
   
    this.descripcion.setValue(this.limpiarCampo(this.descripcion.value));
    }); 
    $("#descripcion2").keyup(()=>{
   
      this.descripcion.setValue(this.limpiarCampo(this.descripcion.value));
      }); 
   

  }
  limpiarCampo(text){

    var textFin = text.replace(/([\\ \\]+(?=[\\ \\])|^\\s+|\\s+$)/g, '');
  
    text = textFin;
  
    return text;
  
  }
  mostrarTab1(){
    $('#nav-tab a[href="#nav-home"]').tab('show');
    this.formSelect = false;
    $("#RGDO")[0].reset();
  }
  mostrarTab2(){
    $('#nav-tab a[href="#nav-profile"]').tab('show');
    this.userSelect = ''
    this.formSelect = true;
  }
  selectTipo(tipo){
    this.donacion = new Donacion("","","","","","","","","","","","","","");

    $("#modalDonacion").modal("show")
  
    if(tipo == 'econ'){
      this.tipE = true;
      this.tipP = false;
      $(document).ready(()=>{
        this.prob2()
              
          });

    }
    if(tipo == 'prod'){
      $(document).ready(()=>{
        this.prob2()
              
          });
      this.tipE = false;;
      this.tipP = true;
 
      
    }
    
    
  }
  prob(event){
  
   
    this.obtnerUsuarioApellidos();
     console.log("hola")


 }
 obtnerUsuarioApellidos(){
  this.usuarios=[];
  const apels = this.myControl.value;


  if(apels != ''){
    $("#busquedaUsers").fadeIn("slow");
    this._userService.obtUsuariosByApellidos(apels).subscribe(
      response=>{


     this.usuarios = response.usuarios

      },
      error=>{
        console.log(<any>error)
      }
    )
  }else{
    
   // $("#busquedaUsers").fadeOut("fast");
  }

}
seleccionarUsuario(user){
    
  this.userSelect = user;

}
eliminarSeleccion(){
  this.userSelect = '';
}

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

 async registrarDonacion(stepper: MatStepper){

  var valido = await this.validarRegistro()
  if(valido == 'ok'){
    var donacionPost = await this.prepareData()
    this._donacionService.registerDonacion(donacionPost,donacionPost.tipo).subscribe(
      response=>{
 
        if(response.donacion && response.n == '1'){
          const imageForm = new FormData();
          imageForm.append('image', this.imageObj);
          this._uploadService.imageUpload(imageForm,'subir-comprobante/',response.donacion._id).subscribe(res => {
            
            this._messageService.showSuccess('Donación','Registro exitoso')
            this.userSelect = "";
            this.actualPage2()
            $("#modalDonacion").modal("hide")
            $("#RGDO")[0].reset();
            $("#RGF2")[0].reset();
            stepper.selectedIndex = 0;
            this.filesToUpload2 = undefined;
            this.imL2 = false;
          });
          /*this._uploadService.makeGileRequest(this.url+'subir-comprobante/'+response.donacion._id,[],this.filesToUpload2,'comprobante')
          .then((result:any)=>{
            //alert('si')
             if(result.n == '1'){
              //form.reset();
              
              this._messageService.showSuccess('Donación','Registro exitoso')
              this.userSelect = "";
              this.actualPage2()
              $("#modalDonacion").modal("hide")
              $("#RGDO")[0].reset();
              $("#RGF2")[0].reset();
              stepper.selectedIndex = 0;
              this.filesToUpload2 = undefined;
              this.imL2 = false;
            
            }
           
          });*/
        }
      
       
         
      },
      error=>{
        console.log(<any>error)
        this._messageService.showError('Donación','Algo salio mal, inténtalo de nuevo')
      
      }
    )
  }else if(valido == 'eUser'){
    stepper.selectedIndex = 0;
    this._messageService.showError('Usuario','Selecciona al usuario que realizó la donación')
  }else if(valido == 'eCedula'){
    stepper.selectedIndex = 0;
    this._messageService.showError('Cédula','El número de cédula no es válido')
  }
  else{
    stepper.selectedIndex = 1;
    this._messageService.showError('Foto','Selecciona una foto que válide la donación')
  }


    }
  async  validarRegistro(){


    if(this.formSelect == true){
      if(this.nombres.valid && this.apellidos.valid && this.cedula.valid && this.telefono.valid
      &&  this.celular.valid && this.direccion.valid && this.correo.valid){

        var vlCedula = await this.validarCedula(this.cedula.value)

        if(vlCedula == true){
          if(this.filesToUpload2 != undefined && this.filesToUpload2.length > 0){
            return 'ok'
          }else{
            return 'eFoto' 
          }
        }else{
          return 'eCedula'
        }
        
      }else{
        return 'eUser'
      }
    }
    if(this.formSelect == false){
      if(this.userSelect != ''){
        if(this.filesToUpload2 != undefined && this.filesToUpload2.length > 0){
          return 'ok'
        }else{
          return 'eFoto' 
        }
      }else{
        return 'eUser'
      }
    }

    }
  async prepareData(){
    if(this.tipE == true){
      this.donacion.tipo = 'Económica'
      this.donacion.cantidad = this.cantidad.value;
      this.donacion.descripcion = this.descripcion.value;
    }else{
      this.donacion.tipo = 'Producto'
      this.donacion.nombreProducto = this.nombreProducto.value;
      this.donacion.descripcion = this.descripcion.value;
    }

    if(this.formSelect == false){
      this.donacion.donante = this.userSelect._id;
    }else if(this.formSelect == true){
      this.donacion.nombres = this.nombres.value;
      this.donacion.apellidos = this.apellidos.value;
      this.donacion.cedula = this.cedula.value;
      this.donacion.direccion = this.direccion.value;
      this.donacion.telefono = this.telefono.value;
      this.donacion.celular = this.celular.value;
    }
    return this.donacion
  }

 async validarCedula(ced) {
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
}
