import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/_shared/services';
import { SwiperComponent } from 'ngx-useful-swiper';
import { Mascota } from 'src/app/_models/mascota';
import { MascotaService } from 'src/app/_shared/services/mascota.service';
import {environment} from '../../../../../environments/environment'
import { FormControl, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/_shared/messages/messages.service';
declare var $:any;
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UploadService } from 'src/app/_shared/services/upload.service';
import { CommunicationService } from 'src/app/_shared/communications/communication.service';
import { NgxUiLoaderService} from 'ngx-ui-loader'; // Import NgxUiLoaderService
@Component({
  selector: 'app-perfil-mascota',
  templateUrl: './perfil-mascota.component.html',
  styleUrls: ['./perfil-mascota.component.scss']
})
export class PerfilMascotaComponent implements OnInit {
  public name;
  public idFun;
  public idM;
  public mascota:any;
  public fotosMascota:Mascota[];
  public images= [];
  public currentUser;
  public permission = false;
  public mscEstado;
  public mensaje;
  public url;
  public imageReady =''
  @ViewChild('swiperThumbs') public swiperThumbs: SwiperComponent;
  @ViewChild('swiperGallery') public swiperGallery: SwiperComponent;
  public config: Object = {
   
};
  public config_thumbs: any = {
  
   
      thumbs: this.images,
      slidesPerView: 3.5,
      spaceBetween: 10,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
     
};
public config_gallery: any = {
    lazyLoading: true,
    spaceBetween: 0,
    zoom: true,
    loop:true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
};
especie = new FormControl('', [Validators.required]);
  nombre = new FormControl('', [Validators.required,Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ]+$'), Validators.maxLength(15),Validators.minLength(2)]);
  otherVacunas = new FormControl('', [ Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ 0-9 ; : . , -]*$'), Validators.maxLength(50),Validators.minLength(2)]);
  sexo = new FormControl('', [Validators.required]);
  raza = new FormControl('', [Validators.required]);
  color = new FormControl('', [Validators.required]);
  tamanio = new FormControl('', [Validators.required]);
  esterilizado = new FormControl('', [Validators.required]);
  edadT = new FormControl('', [Validators.required]);
  anios = new FormControl('', [Validators.required]);
  meses = new FormControl('', [Validators.required]);
  descripcion = new FormControl('', [Validators.required,Validators.maxLength(500),Validators.minLength(25),Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ : ; , . -]+$')]);
  ppy = new FormControl('', []);
  mul = new FormControl('', []); 
  bro = new FormControl('', []);
  ant = new FormControl('', []);
  ant2 = new FormControl('', []);

  ppy2 = new FormControl('', []);
  imageObj: File;
  imageUrl: string;
  public subiendoImage:any = false;
  getErrorMessage() {
    return this.especie.hasError('required') ? 'Especie requerida' :  
            '';
  }
  getErrorMessage2() {
    return this.nombre.hasError('required') ? 'El nombre es requerido' :
    this.nombre.hasError('pattern') ? 'No se admite: símbolos, caracteres especiales o números':
            this.nombre.hasError('maxlength') ? 'Máximo 15 caracteres':
            this.nombre.hasError('minlength') ? 'Mínimo 2 caracteres':
            '';
  }
  getErrorMessageOTHER() {
    return this.otherVacunas.hasError('pattern') ? 'No se acepta: símbolos, caracteres especiales, números':
            this.otherVacunas.hasError('maxlength') ? 'Máximo 50 caracteres':
            this.otherVacunas.hasError('minlength') ? 'Mínimo 2 caracteres':
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
    return this.edadT.hasError('required') ? 'Edad requerida' :  
            '';
  }
  getErrorMessage9() {
    return this.anios.hasError('required') ? 'Edad en años requerido' : 
            '';
  }
  getErrorMessage10() {
    return this.meses.hasError('required') ? 'Meses requeridos' : 
     '';
  }
  getErrorMessage11() {
    return this.descripcion.hasError('required') ? 'Descripción requerida' :  
            this.descripcion.hasError('pattern') ? 'No se admite: símbolos o caracteres especiales':
            this.descripcion.hasError('maxlength') ? 'Máximo 500 caracteres':
            this.descripcion.hasError('minlength') ? 'Describe mejor a la mascota':
            '';
  }
  keyUrl
  fullUrl:string
  constructor(private _route:ActivatedRoute,private _router:Router,
    private authenticationService: AuthenticationService,private _mascotaService:MascotaService,
    private _messageService:MessagesService,private _uploadService:UploadService,
    private _comunicationService:CommunicationService,private ngxService: NgxUiLoaderService) {
      this.ngxService.startLoader('loader-02');
    this.currentUser = this.authenticationService.currentUserValue;
    this.url = environment.apiUrl;
    
   }

  ngOnInit() {
    this._comunicationService.reload.subscribe(res=>{
      if(res == true){

        this.loadPage()
        $( document ).ready(()=> {
          if(this.keyUrl[4] == 'home'){
            $(".main").addClass('mainclean')
          
          }else{
            $(".main").removeClass('mainclean')
          }
      });
      }
    })
    this.loadPage();
    this.fullUrl = this._router.url.toString()
    this.keyUrl = this.fullUrl.split('/')
 
    $( document ).ready(()=> {
      if(this.keyUrl[4] == 'home'){
        $(".main").addClass('mainclean')
      
      }else{
        $(".main").removeClass('mainclean')
      }
  });
    
  }
  obtMascota(id){
    this.images = []
     this._mascotaService.obtMascota(id).subscribe(
       response =>{
         if(response.mascota && response.n == '1'){
          this.ngxService.stopLoader('loader-02');
           this.mascota= response.mascota;
           this._comunicationService.perfilFundacionSelec(this.mascota.responsable.logo)
          $( document ).ready(()=> {
            if(this.keyUrl[4] == 'fund'){
              $(".mascota-header").addClass('headerName')
            
            }else{
              $(".mascota-header").removeClass('headerName')
            }
        });
           var con = 0;
           this.mascota.fotos.forEach(element => {
             con++;
             var imag = {
               image:'',
               _id:'',
               name:''
             }
             imag.image = "https://fundacionesbckimg.s3.us-east-2.amazonaws.com/"+element.name;
             imag._id = element._id;
             imag.name = element.name;
             this.images.push(imag)
             
           });
           this.mscEstado = response.mascota.estado;
           this.mensaje = response.message;
         }
       },
       error=>{
         var errorMessage = <any>error;
         this._router.navigate(['**']);  
           if(errorMessage != null && error.error.n == '2'){
             this.mensaje = 'La mascota ya no existe en el sistema.';
           }else{
             this.mensaje = 'Algo salio mal, intentalo mas tarde.'
           }
       }
     );
   }
 
    
   loadPage(){
     this._route.params.subscribe(params =>{
      this.idM = params['idM'];
      this.idFun = params['id'];
      this.name = params['mascota']
      if(this.currentUser && this.currentUser.usuario._id == this.idFun){
        this.permission = true;
      }else{
        this.permission = false;
      }
       this.obtMascota(this.idM);
     })
   }
   editarModal(){
    $('#mdalEditar').modal('show');
    this.especie.setValue(this.mascota.especie)
            this.nombre.setValue(this.mascota.nombre)
            this.sexo.setValue(this.mascota.sexo)
            this.raza.setValue(this.mascota.raza)
            this.color.setValue(this.mascota.color)
            this.esterilizado.setValue(this.mascota.esterilizado)
            this.tamanio.setValue(this.mascota.tamanio)
            this.edadT.setValue(this.mascota.edadT)
            this.anios.setValue(this.mascota.anios)
            this.meses.setValue(this.mascota.meses)
            this.otherVacunas.setValue(this.mascota.otherVacunas)
            this.descripcion.setValue(this.mascota.descripcion)
            $(document).ready(()=>{
              this.prob()
                });
            if(this.especie.value == 'Canino'){
              if(this.mascota.vacunas.Puppy == true){
                this.ppy2.setValue(true)
              }
              if(this.mascota.vacunas.Multiple == true){
                this.mul.setValue(true)
              }
              if(this.mascota.vacunas.Antirrabica == true){
                this.ant2.setValue(true)
              }
              if(this.mascota.vacunas.Bronchicine == true){
                this.bro.setValue(true)
              }
            }else{
              if(this.mascota.vacunas.TrFelina == true){
                this.ppy.setValue(true)
              }
              if(this.mascota.vacunas.Antirrabica == true){
                this.ant.setValue(true)
              }
            }
  }
  prob(){
    $("#nombre").keyup(()=>{
      this.nombre.setValue(this.limpiarCampo(this.nombre.value));
}); 
$("#descripcion").keyup(()=>{
  this.descripcion.setValue(this.limpiarCampo(this.descripcion.value));
}); 
     
  }
  limpiarCampo(text){
    var textFin = text.replace(/([\\ \\]+(?=[\\ \\])|^\\s+|\\s+$)/g, '');
    text = textFin;
    return text;
  }
  restablecerDatos(){
    this._route.params.subscribe(params =>{
      let id = params['idM'];
      this.especie.setValue(this.mascota.especie)
          this.nombre.setValue(this.mascota.nombre)
          this.sexo.setValue(this.mascota.sexo)
          this.raza.setValue(this.mascota.raza)
          this.color.setValue(this.mascota.color)
          this.esterilizado.setValue(this.mascota.esterilizado)
          this.tamanio.setValue(this.mascota.tamanio)
          this.edadT.setValue(this.mascota.edadT)
          this.anios.setValue(this.mascota.anios)
          this.meses.setValue(this.mascota.meses)
          this.descripcion.setValue(this.mascota.descripcion)
    })
  }
  actualizarMascota(){
    this.mascota.especie = this.especie.value;
    this.mascota.nombre = this.nombre.value;
    this.mascota.sexo = this.sexo.value;
    this.mascota.color = this.color.value;
    this.mascota.raza = this.raza.value;
    this.mascota.esterilizado = this.esterilizado.value;
    this.mascota.edadT = this.edadT.value;
    this.mascota.anios = this.anios.value;
    this.mascota.meses = this.meses.value;
    this.mascota.descripcion = this.descripcion.value;
    this.mascota.otherVacunas = this.otherVacunas.value
    if(this.mascota.especie == 'Felino'){
      this.mascota.vpp = this.ppy.value;
      this.mascota.va = this.ant.value;
    }else{
      this.mascota.vpp = this.ppy2.value;
      this.mascota.vm = this.mul.value;
      this.mascota.vb = this.bro.value;
      this.mascota.va = this.ant2.value;
    }

    if(this.anios.value == 0 && this.meses.value == 0){
      this._messageService.showError('Edad','La edad de la mascota no puede ser 0 años 0 meses')
    }else{
      this._mascotaService.actualizarMascota(this.mascota,this.currentUser.usuario._id,).subscribe(
        response=>{
  
          if(response.mascota && response.n == '1'){
            this._messageService.showSuccess('Mascota','Datos actualizados')
            this.loadPage()
            $('#mdalEditar').modal('hide');
          }else{
            this._messageService.showError('Error','No se pudo actualizar, inténtalo de nuevo')
          }
        }, 
        error=>{
          this._messageService.showError('Error','No se pudo actualizar, inténtalo de nuevo')
        }
      );
    }
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';
  public nameCropFoto:any=''
  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
      this.nameCropFoto  = event.target.files[0].name
      this.imageReady = 'load'
      window.scrollTo({ top: 0, behavior: 'smooth' });

  }
  imageCropped(event: any) {
    console.log(event)
      this.croppedImage = event.base64;
      const FILE = event.file;
      this.imageObj = FILE;
  }

  cropperReady() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
      this.imageReady= 'ok';
  }

  subirFoto(){
    this.subiendoImage = true
    var body = {
      image:this.croppedImage,
      name:this.nameCropFoto
    }
    const imageForm = new FormData();
        imageForm.append('image', this.imageObj);
        this._uploadService.imageUpload(imageForm,'subir-foto-mascota/',this.idM).subscribe(res => {
          this.imageUrl = res['image'];
          this.obtMascota(this.idM)
          this.subiendoImage =false
          this.croppedImage = ''
          this.imageReady = ''
          this._messageService.showSuccess('Mascota','Imagen guardada.')
  
        });
   
  }
  //establecer como foto principal de la mascota
 fotoPrincipalMascota(id,idfoto){
  this._mascotaService.establecerFTM(id,idfoto).subscribe(
    response=>{
      if(!response.mascota){
      }else{
        this._messageService.showSuccess('Perfil','Foto establecida como principal')
        this.obtMascota(this.idM)
      }
    }, 
    error=>{
      this._messageService.showError('Error','No se pudo actualizar, inténtalo nuevamente')

    }
  );
}
eliminarFotoMascota(mid,id,path){
  this._mascotaService.eliminarFotoMascota(mid,id,path).subscribe(
    response=>{
      if(response.n == '1'){
        this._messageService.showSuccess('Perfil','Imagen eliminada')
        this.obtMascota(this.idM);
      }else if(response.n == '5'){
        this._messageService.showError('Error','La imagen de perfil ni se puede eliminar')
      }
    },
    error=>{
      this._messageService.showError('Error','No se pudo actualizar, inténtalo nuevamente')
    }
  )

}
eliminarEstadoMascota(){
  this._mascotaService.eliminarMascotaEstado(this.mascota,this.idM).subscribe(
    response=>{
      if(response.mascota && response.n == '1'){
        this._messageService.showSuccess('Mascota','Mascota eliminada correctaente')
        this._router.navigate([this.name,this.idFun,'mascotas','todos','1']);
      }else if(response.n == '4'){
        this._messageService.showError('Permisos','No tienes permisos para esta acción')
      }
    }, 
    error=>{
      if((error != null && error.error.n == '2')){
        this._messageService.showError('Error','La mascota no existe')
      }else{
        this._messageService.showError('Error','Algo salió mal, inténtalo nuevamente')

      }
    }
  );
}
}
