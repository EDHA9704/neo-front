import { Component, OnInit, ViewChild } from '@angular/core';
import { Mascota } from 'src/app/_models/mascota';
import { MascotaService } from 'src/app/_shared/services/mascota.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from 'src/app/_shared/messages/messages.service';
import { environment } from '../../../../../environments/environment';
import { AuthenticationService, UserService } from 'src/app/_shared/services';
import { FormControl, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { UploadService } from 'src/app/_shared/services/upload.service';
import { UsuarioFundacion } from 'src/app/_models/usuarioFundacion';

declare var $:any
@Component({
  selector: 'app-mis-mascotas',
  templateUrl: './mis-mascotas.component.html',
  styleUrls: ['./mis-mascotas.component.scss']
})
export class MisMascotasComponent implements OnInit {
  @ViewChild('stepper', {static: true}) private myStepper: MatStepper;
  totalStepsCount: number;
  imageObj: File;
  nombre = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ]*$'), Validators.maxLength(20),Validators.minLength(3)]);
  otherVacunas = new FormControl('', [ Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ 0-9 ; : . , -]*$'), Validators.maxLength(50),Validators.minLength(2)]);
  especie = new FormControl('', [Validators.required]);
  sexo = new FormControl('', [Validators.required]);
  raza = new FormControl('', [Validators.required]);
  color = new FormControl('', [Validators.required]);
  tamanio = new FormControl('', [Validators.required]);
  esterilizado = new FormControl('', [Validators.required]);
  edad = new FormControl('', [Validators.required]);
  anios = new FormControl('', [Validators.required]);
  meses = new FormControl('', [Validators.required]);
  descripcion = new FormControl('', [Validators.required,Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9 ; : . , -]*$'),Validators.maxLength(500),Validators.minLength(15)]);
  ppy = new FormControl('', []);
  mul = new FormControl('', []);
  bro = new FormControl('', []);
  ant = new FormControl('', []);

  public taman = ["Todos","Pequeño","Mediano","Grande"];
  public sexoo = ["Todos","Macho","Hembra"];
  public edadd = ["Todos","Cachorro","Joven","Adulto"];
  public url;
  public next_pagee;
  public prev_pagee;
  public carga;
  public itemsMSC;
  public mensaje
  public idFun;
  public type;
  //variables para guardar las mascotas obtenidas de la fundacion
  public page;
  public total;
  public pages;
  public itemsPerPage;
  public pagesSelec = []
  public mascotas=[];
  public filtroBSQ = [];
  public filtroBTN;
  public imgCom;
  public bus;
  public fl;
  public fil;
  public select;
  public currentUser
  public nuevoReg
  public imgUN2:any;
  public imL2 = false;
  public mascota:Mascota;
  public loading = true;
  public advertencia
  getErrorMessage() {
    return this.nombre.hasError('required') ? 'El nombre es requerido' :
            this.nombre.hasError('pattern') ? 'No se acepta: símbolos, caracteres especiales, números':
            this.nombre.hasError('maxlength') ? 'Máximo 20 caracteres':
            this.nombre.hasError('minlength') ? 'Mínimo 5 caracteres':
            '';
  }
  getErrorMessageOTHER() {
    return this.otherVacunas.hasError('pattern') ? 'No se acepta: símbolos, caracteres especiales, números':
            this.otherVacunas.hasError('maxlength') ? 'Máximo 50 caracteres':
            this.otherVacunas.hasError('minlength') ? 'Mínimo 2 caracteres':
            '';
  }
  getErrorMessage2() {
    return this.especie.hasError('required') ? 'Especie requerida' :  
            '';
  }
  getErrorMessage3() {
    return this.sexo.hasError('required') ? 'Sexo requerido' :  
            '';
  }
  getErrorMessage4() {
    return this.raza.hasError('required') ? 'Raza requerida' :  
            '';
  }
  getErrorMessage5() {
    return this.color.hasError('required') ? 'Color requerido' :  
            '';
  }
  getErrorMessage6() {
    return this.tamanio.hasError('required') ? 'Tamaño requerido' :  
            '';
  }
  getErrorMessage7() {
    return this.esterilizado.hasError('required') ? 'Campo requerido' :  
            '';
  }
  getErrorMessage8() {
    return this.edad.hasError('required') ? 'Edad requerida' :  
            '';
  }
  getErrorMessage9() {
    return this.anios.hasError('required') ? 'Años requeridos' :  
            '';
  }
  getErrorMessage10() {
    return this.meses.hasError('required') ? 'Meses requeridos' :  
            '';
  }
  getErrorMessage11() {
    return this.descripcion.hasError('required') ? 'Descripción de la mascota requerida' :  
            this.descripcion.hasError('maxlength') ? 'Máximo 500 caracteres':
            this.descripcion.hasError('minlength') ? 'Mínimo 15 caracteres':
            '';
  }
  public fundacion:UsuarioFundacion;
  keyUrl
  fullUrl:string
  public registrando;
  constructor(private _route:ActivatedRoute,private router: Router,private _mascotaService:MascotaService,
    private _router:Router,private _messageService:MessagesService,private authenticationService: AuthenticationService,
    private _uploadService:UploadService,private _userService:UserService) { 
      this.currentUser = this.authenticationService.currentUserValue;
      this.fullUrl = this.router.url.toString()
      this.keyUrl = this.fullUrl.split('/')
      this.url = environment.apiUrl;
      this.page = 1;
      this.carga = true;
      this.itemsMSC = 0;
      this.bus = false;
      this.fl = false;
      this.fil = this._mascotaService.obtFiltro();
      this.filtroBSQ = this._mascotaService.obtFiltroMascotasFundacion();
    }

  ngOnInit() {
    this.actualPage2();
    $(document).ready(()=>{
      this.prob()
        });
      this.changeFiltro()
  }

  changeFiltro(){
    $(document).ready(()=>{
    $("#tamDrop").change(()=>{

      this.select = $("#tamDrop").val();
      this.filtroBSQD(this.select)
  });
  $("#sexoDrop").change(()=>{

    this.select = $("#sexoDrop").val();
    this.filtroBSQD(this.select)
});
$("#edadDrop").change(()=>{

  this.select = $("#edadDrop").val();
  this.filtroBSQD(this.select)
});
});  
  }
  actualPage2(){
    this.type = '';
    this.pagesSelec = [];
    this._route.params.subscribe(params =>{
      this.type= params['tipo'];
      this.idFun =this.keyUrl[2]
      this.obtFundacion(this.idFun)
      let page = +params['page'];
          this.page = page;
          if(!params['page']){
            page = 1;
            this.page = 1;
          }
          
          if(!page){
            page = 1;
          }else{
            this.next_pagee = page+1;
            this.prev_pagee = page-1;
    
            if(this.prev_pagee <= 0){
              this.prev_pagee = 1;
            }
          }
        
        if(this.type == 'busqueda'){
          this.filtroBTN = true;
          $(document).ready(()=>{
          this.filtroBSQ.forEach(elem => {
            if(elem.tipo == 'tam'){
              $("#tamDrop").val(elem.option)
            }
            if(elem.tipo == 'sexo'){
              $("#sexoDrop").val(elem.option)
            }
            if(elem.tipo == 'edad'){
              $("#edadDrop").val(elem.option)
            }
          });
        });
        }else{
          $(document).ready(()=>{
          $("#tamDrop").val('Todos')
          $("#sexoDrop").val('Todos')
          $("#edadDrop").val('Todos')
          })
          this.filtroBTN = false;
          this.loading = true
        }
    });
    
  }
  obtFundacion(id){
    this._userService.obtUsuario(id).subscribe(
      response=>{
        this.carga == false
        this.fundacion = response.usuario;
        this.changeFiltro()
        if(this.currentUser){
          if(this.type == 'busqueda'){
            this.buscarMascotas(this.page)
          }else{
            this.obtMascotas(this.page);
          }
        }else{
          if(this.type == 'busqueda'){
            this.buscarMascotas2(this.page)
          }else{
            this.obtMascotas2(this.page);
          }
        }
       
      },
      error=>{
        this.router.navigate(['**']);  
      }
    )
    
  
  }
  obtMascotas(page,adding=false){
    if(this.fundacion){
      this.loading = true
      this.pagesSelec = []
      this.mascotas = []
      this._mascotaService.obtMisMascotas(this.idFun,page).subscribe(
          response=>{
            this.carga = false;
            if(response.mascotas && response.n == '1'){
              $('.conL').fadeOut('fast');
              this.total= response.total;
              this.pages = response.pages;
              this.itemsPerPage = response.itemsPerPage;
              response.mascotas.forEach(ms => {
                var tem =  ms.fotos.filter(ph => ph.estado == 'activo' );
                this.mascotas.push({ms:ms,photo:tem[0]})
              });
              this.loading = false;
              $(document).ready(()=>{
              $(".content-grid-cards").addClass('visible')
              })
              for (let i = 1; i <= this.pages; i++) {
                this.pagesSelec.push(i)
              }
              this.advertencia =false;
              this.itemsMSC = this.mascotas.length;
              this.mensaje = response.message;
            }else{
            }
          },
          error=>{
            this.pagesSelec = []
      this.mascotas = []
            this.loading = false;
          this.carga = false;
           this.advertencia = true;
            var errorMessage = <any>error;
            if(errorMessage != null && error.error.n == '2'){
              this.mensaje = 'Lo sentimos, '+error.error.message;
            }else if(errorMessage != null && error.error.n == '3'){
              this.mensaje = error.error.message;
            }else{
              this.mensaje = 'Algo salio mal.'
            }
          }
        )
   
    }
  
  }
  obtMascotas2(page,adding=false){
    if(this.fundacion){
      this.loading = true
      this.pagesSelec = []
      this.mascotas = []
      this._mascotaService.obtMisMascotas2(this.idFun,page).subscribe(
          response=>{
            this.carga = false;
            if(response.mascotas && response.n == '1'){
              $('.conL').fadeOut('fast');
              this.total= response.total;
              this.pages = response.pages;
              this.itemsPerPage = response.itemsPerPage;
              response.mascotas.forEach(ms => {
                var tem =  ms.fotos.filter(ph => ph.estado == 'activo' );
                this.mascotas.push({ms:ms,photo:tem[0]})
              });
              this.loading = false;
              $(document).ready(()=>{
              $(".content-grid-cards").addClass('visible')
              })
              for (let i = 1; i <= this.pages; i++) {
                this.pagesSelec.push(i)
                
              }
              this.advertencia =false;
              
              this.itemsMSC = this.mascotas.length;
              this.mensaje = response.message;
            }else{
            }
          },
          error=>{
            this.pagesSelec = []
            this.mascotas = []
            this.loading = false;
          this.carga = false;
           this.advertencia = true;
            var errorMessage = <any>error;
            if(errorMessage != null && error.error.n == '2'){
              this.mensaje = 'Lo sentimos, '+error.error.message;
            }else if(errorMessage != null && error.error.n == '3'){
              this.mensaje = error.error.message;
            }else{
              this.mensaje = 'Algo salio mal.'
            }
          }
        )
   
    }
  
  }
  buscarMascotas(page,adding=false){
    this.loading = true;
    this.pagesSelec = []
    this.mascotas = []
    this._mascotaService.filtroMascotas2(this.idFun,this.filtroBSQ,page).subscribe(
      response=>{
        this.carga = false;
        if(response.mascotas && response.n == '1'){
          $(".carga").fadeOut("slow");
          this.total = response.total;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
          response.mascotas.forEach(ms => {
            var tem =  ms.fotos.filter(ph => ph.estado == 'activo' );
            this.mascotas.push({ms:ms,photo:tem[0]})
          });
          for (let i = 1; i <= this.pages; i++) {
            this.pagesSelec.push(i)
          }
          this.advertencia =false;
          this.loading = false;
          $(".content-grid-cards").addClass('visible')
          this.itemsMSC = this.mascotas.length;
        }
      },
      error=>{
        this.pagesSelec = []
      this.mascotas = []
        this.carga = false;
        $(".carga").fadeOut("slow");
        var errorMessage = <any>error;
       this.loading = false;
       this.advertencia = true;
        if(errorMessage != null && errorMessage.error.n == '2'){
          this.mensaje = 'Lo sentimos, '+error.error.message;
          this.mascotas = null;
          this._messageService.showError('Busqueda','No se encontro resultados')
         
        }else if(errorMessage != null && error.error.n == '5'){
          this.mensaje = 'No se ha elegigo filtros';
          this._messageService.showError('Busqueda','No se ha elegido filtros')
          this.mascotas = null;
        }
        
        else{
          this.mensaje = 'Algo salio mal, intentalo mas tarde'
          this._messageService.showError('Busqueda',this.mensaje)

          
        }
      }
    )
  }
  buscarMascotas2(page,adding=false){
    this.loading = true;
    this.pagesSelec = []
    this.mascotas = []
    this._mascotaService.filtroMascotas22(this.idFun,this.filtroBSQ,page).subscribe(
      response=>{
        this.carga = false;
        if(response.mascotas && response.n == '1'){
          $(".carga").fadeOut("slow");
          this.total = response.total;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
          response.mascotas.forEach(ms => {
            var tem =  ms.fotos.filter(ph => ph.estado == 'activo' );
            this.mascotas.push({ms:ms,photo:tem[0]})
          });
          for (let i = 1; i <= this.pages; i++) {
            this.pagesSelec.push(i)
          }
          this.advertencia =false;
          this.loading = false;
          $(".content-grid-cards").addClass('visible')
          this.itemsMSC = this.mascotas.length;
        }
      },
      error=>{
        this.pagesSelec = []
        this.mascotas = []
        this.carga = false;
        $(".carga").fadeOut("slow");
        var errorMessage = <any>error;
       this.loading = false;
       this.advertencia = true;
      
        if(errorMessage != null && errorMessage.error.n == '2'){
          this.mensaje = 'Lo sentimos, '+error.error.message;
          this.mascotas = null;
          this._messageService.showError('Busqueda','No se encontro resultados')
         
        }else if(errorMessage != null && error.error.n == '5'){
          this.mensaje = 'No se ha elegigo filtros';
          this._messageService.showError('Busqueda','No se ha elegido filtros')
          this.mascotas = null;
        }
        
        else{
          this.mensaje = 'Algo salio mal, intentalo mas tarde'
          this._messageService.showError('Busqueda',this.mensaje)

          
        }
      }
    )
  }
  verFoto(foto){
    $('#modalComprobante').modal('show')
    this.imgCom = foto;
  }
  cancelarBus(){
    this.bus = false;
    localStorage.removeItem('busquedaMascotasFnd');
    this._router.navigate(['/fundacion',this.idFun,'mascotas','todos','1']);
  }
  nuevoRegiistro(op){
    this.nuevoReg = op;
    $('#modalMascota').modal('show')
    $(document).ready(()=>{
      this.prob()
        });
  }
  busc(){
    this.bus = true;
  }
  filtroBSQD(option){
    this.pagesSelec = []
    var optionFinal = option;
    if(optionFinal == 'Pequeño' || optionFinal == 'Mediano' || optionFinal == 'Grande'){
      if(this.filtroBSQ == null){
        this.filtroBSQ = [];
        this.filtroBSQ.push({tipo:'tam',option:optionFinal})
      }else{
       var ok = false;
        this.filtroBSQ.forEach(fl => {
          if(fl.tipo == 'tam'){
            ok = true;
            fl.option = optionFinal;
          }
        });
        if(ok == false){
          this.filtroBSQ.push({tipo:'tam',option:optionFinal})
        }
      }

      localStorage.setItem('busquedaMascotasFnd', JSON.stringify(this.filtroBSQ));
    }

    if(optionFinal == 'Macho' || optionFinal == 'Hembra'){
      if(this.filtroBSQ == null){
        this.filtroBSQ = [];
        this.filtroBSQ.push({tipo:'sexo',option:optionFinal})
      }else{
        var ok2= false;
        this.filtroBSQ.forEach(fl => {
          if(fl.tipo == 'sexo'){
            ok2 = true;
            fl.option = optionFinal;
          }
        });
        if(ok2 == false){
          this.filtroBSQ.push({tipo:'sexo',option:optionFinal})
        }
      }
      localStorage.setItem('busquedaMascotasFnd', JSON.stringify(this.filtroBSQ));
    }
    if(optionFinal == 'Cachorro' || optionFinal == 'Joven' || optionFinal == 'Adulto'){
      
      if(this.filtroBSQ == null){
       
        this.filtroBSQ = [];
        this.filtroBSQ.push({tipo:'edad',option:optionFinal})
      }else{
       var ok = false;
        this.filtroBSQ.forEach(fl => {
          if(fl.tipo == 'edad'){
            ok = true;
            fl.option = optionFinal;
          }
        });

        if(ok == false){
          this.filtroBSQ.push({tipo:'edad',option:optionFinal})
        }
      }
      localStorage.setItem('busquedaMascotasFnd', JSON.stringify(this.filtroBSQ));
    }
      if(this.type == 'busqueda'){
        this.buscarMascotas(this.page)
      }
    this._router.navigate(['/fundacion',this.idFun,'mascotas','busqueda','1']);
  }

  
  cancelarReg(form){
    this.resets();
    this.filesToUpload2 = undefined;
  }
  resets(){
    $("#RGF")[0].reset();
    this.sexo.setValue(null)
    this.anios.setValue(null)
    this.meses.setValue(null)
    this.esterilizado.setValue(null)
    this.color.setValue(null)
    this.tamanio.setValue(null)
    this.edad.setValue(null)
    this.ppy.setValue(null)
    this.mul.setValue(null)
    this.ant.setValue(null)
    this.bro.setValue(null)
    $("#RGF2")[0].reset();
    $("#RGF3")[0].reset();
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
   registrarMascota(stepper: MatStepper){
    this.mascota = new Mascota("","","","","","","","","","","","","","","","","","","","","");
    this.mascota.nombre = this.nombre.value;
    this.mascota.nombreFundacion = this.fundacion.nombreFundacion
    if(this.nuevoReg == 'f'){
      this.mascota.especie = 'Felino';
      this.mascota.vpp = this.ppy.value;
      this.mascota.va = this.ant.value;
    }else{
      this.mascota.especie = 'Canino';
      this.mascota.vpp = this.ppy.value;
      this.mascota.vm = this.mul.value;
      this.mascota.vb = this.bro.value;
      this.mascota.va = this.ant.value;
    }
    this.mascota.sexo = this.sexo.value;
    this.mascota.raza = this.raza.value;
    this.mascota.color = this.color.value;
    this.mascota.tamanio = this.tamanio.value;
    this.mascota.esterilizado = this.esterilizado.value;
    this.mascota.edadT = this.edad.value;
    this.mascota.anios = this.anios.value;
    this.mascota.meses = this.meses.value;
    this.mascota.descripcion = this.descripcion.value;
    this.mascota.otherVacunas = this.otherVacunas.value;

    if(this.mascota.nombre == "" || this.mascota.sexo == "" || this.mascota.raza == "" ||
    this.mascota.color == "" || this.mascota.tamanio == "" || this.mascota.esterilizado== "" ||
    this.mascota.edadT == "" || this.mascota.anios== "" || this.mascota.meses== "" ||
    this.mascota.descripcion== ""
    ){
      this._messageService.showError('Formulario','Por favor, llena todos los campos')
    }else{
      if(this.anios.value == 0 && this.meses.value == 0){
        stepper.selectedIndex = 1;
        this._messageService.showError('Formulario','La edad de la mascota debe ser mayor a cero')
      }else{
    if(this.filesToUpload2 != undefined){
      this.registrando = true;
      this._messageService.showInfo('Formulario','Procesando registro') 
       this._mascotaService.registerMascota(this.mascota, this.idFun).subscribe(
         response =>{
           if(response.mascota && response.mascota._id && response.n == '1'){
            const imageForm = new FormData();
            imageForm.append('image', this.imageObj);
            this._uploadService.imageUpload(imageForm,'subir-foto-mascota-nueva/',response.mascota._id).subscribe(res => {
              this.registrando = false;
              $('#modalMascota').modal('hide')
                   this._messageService.showSuccess('Mascota','Registro exitoso')
                   this.filesToUpload2 = undefined;
                   this.imL2 = false;
                  this.obtMascotas(this.idFun);
                  this.cancelarReg(stepper)
            });
         
           }else if(response.n == '5'){
            this.registrando = false;
               this._messageService.showError('Registro',response.message)

           }else{
            this.registrando = false;
            this._messageService.showError('Registro',response.message)
           }
         },
         error =>{
          this.registrando = false;
           if(error.error.n == '3' || error.error.n == '2'){
            this._messageService.showError('Registro',error.error.message)
           }else{
            this._messageService.showError('Registro','Algo salio mal, inténtalo de nuevo')
           }
         }
       );
 
     }else{
      this._messageService.showError('Foto mascota','Selecciona una imagen')
       stepper.selectedIndex = 0;
     }
      }
  }
  }
  prob(){
    $("#nombre").keyup(()=>{
         
      this.nombre.setValue(this.limpiarCampo(this.nombre.value));
}); 
$("#vacunas").keyup(()=>{
  this.otherVacunas.setValue(this.limpiarCampo(this.otherVacunas.value));
}); 
$("#descripcion").keyup(()=>{
  this.descripcion.setValue(this.limpiarCampo(this.descripcion.value));
}); 
      $("#nmbr").fadeOut("fast")
      $("#nmbr2").fadeOut("fast")


  }
  limpiarCampo(text){
    var textFin = text.replace(/([\\ \\]+(?=[\\ \\])|^\\s+|\\s+$)/g, '');
    text = textFin;
    return text;
  }

  redirectMascota(nombre,id,idr){
    this._router.navigate(['/perfil/mascota/',idr,'fund',nombre,id]); 
  }
 public croppedImage
 public nameCropFoto
  subirFoto(id){
    var body = {
      image:this.croppedImage,
      name:this.nameCropFoto
    }
    this._mascotaService.registerFotoMascota(body,id).subscribe(
      response=>{
        this.croppedImage = ''
      },
      error=>{
        this._messageService.showError('Error','No se pudo guardar la imagen')
      }
    )
  
  }
}
