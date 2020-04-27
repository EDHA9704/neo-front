import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UsuarioFundacion } from 'src/app/_models/usuarioFundacion';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from 'src/app/_shared/services/mascota.service';
import { UploadService } from 'src/app/_shared/services/upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Historia } from 'src/app/_models/historia';
import { PortadaFundacion } from 'src/app/_models/portadaFundacion';
declare var $:any;
import { environment } from '../../../../../environments/environment';
import { AuthenticationService, UserService } from '../../../../_shared/services';
import { FundacionService } from 'src/app/_shared/services/fundacion.service';
import { MessagesService } from 'src/app/_shared/messages/messages.service';
import { SwiperComponent} from 'ngx-useful-swiper';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({ 
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss']
})
export class NosotrosComponent implements OnInit {
  mensaje1 = new FormControl('', [Validators.maxLength(30),Validators.minLength(3)]);
  mensaje2 = new FormControl('', [Validators.maxLength(50),Validators.minLength(3)]);
  getErrorMessage() {
    return  this.mensaje1.hasError('maxlength') ? 'Máximo 30 caracteres':
            this.mensaje1.hasError('minlength') ? 'Mínimo 6 caracteres':
            '';
  }
  getErrorMessage2() {
    return  this.mensaje2.hasError('maxlength') ? 'Máximo 30 caracteres':
            this.mensaje2.hasError('minlength') ? 'Mínimo 6 caracteres':
            '';
  }
  public usuarioFundacion:UsuarioFundacion;
  public url;
 
  public token;
 public valid
  public imgUN2:any;
  public imL2 = false;
  public historia:Historia;
  public historiasF=[];
  public idF;
  public lgtHI;

  //variables para guardar las portaas
  public portadasFundacion:UsuarioFundacion[];
  public portada:PortadaFundacion;
  public p;
  public hh = [];

  public advertenciaNewPor 
  public statusNewPor 
  public mensajeNewPor
  public imgUN3:any;
  public imL3 = false;
  public largeHS
  config: any = {
    
    slidesPerView: 3,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
  };
  config2: any = {
    
    slidesPerView: 1,
      spaceBetween: 0,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
  };
  currentUser;
  imageObj: File;
imageUrl: string;
imageObj2: File;
imageUrl2: string;
public stUpload = false;
public carga = false;
public cargaPortads = false;
  keyUrl
  fullUrl:string

  constructor(private _route:ActivatedRoute,
    private _router:Router, 
    private _mascotaService:MascotaService,/*private _usuarioService:UsuarioService ,*/
    private _uploadService:UploadService, 
    private authenticationService: AuthenticationService,private userService:UserService,
    private _fundacionService:FundacionService,private router: Router,private _messageService:MessagesService,
    private ngxService: NgxUiLoaderService) {
      this.ngxService.startLoader('loader-02');
      this.url = environment.apiUrl;
      this.currentUser = this.authenticationService.currentUserValue;
      this.historia = new Historia("","","","");
      this.portada = new PortadaFundacion("","","","","")
      this.lgtHI = false;
     }

  ngOnInit() {
    this.loadPage()
    $( document ).ready(()=> {
      this.toggle()
      if($( window ).width() <= 720){
        this.largeHS = false;
      }else{
        this.largeHS = true;
      }
      
  });
  $(document).ready(($)=>{
    $(window).resize(()=>{
      if($( window ).width() <= 720){
        this.largeHS = false;
      }else{
        this.largeHS = true;
      }
});
  }); 
  }
  loadPage(){
    this.fullUrl = this.router.url.toString()
    this.keyUrl = this.fullUrl.split('/')
    this.idF = this.keyUrl[2];    
    this.obtFundacion2()
    this.obtenerHistorias(this.idF);
    this.obtPortadasFundacion(this.idF)
      if(this.currentUser && this.currentUser.usuario._id == this.idF){
       this.valid = true;
    }else{
      this.valid = false;
    }
  }
  toggle(){
    const selectElement = (s:any) => document.querySelector(s)
    selectElement('.open').addEventListener('click',()=>{
      selectElement('.nav-list').classList.add('active')
    })
    selectElement('.close').addEventListener('click',()=>{
      selectElement('.nav-list').classList.remove('active')

    })
  }
  obtFundacion2(){

    this.userService.obtUsuario(this.idF).subscribe(
      response=>{
        this.usuarioFundacion = response.usuario;
        this.ngxService.stopLoader('loader-02');
        this.carga = true
      },
      error=>{
        this.router.navigate(['**']);  
      }
    )
  }
  nuevaHI(){
    if((this.historia.titulo.length >= 4 && this.historia.titulo.length <= 25) && (this.historia.descripcion.length >= 15 && this.historia.descripcion.length <= 1000)){
      if((this.filesToUpload2 != undefined && this.filesToUpload2 != null)){
        this._messageService.showInfo('Historia','Procesando')
        this.stUpload = true;
        this._fundacionService.registerHistoria(this.historia,this.currentUser.usuario._id).subscribe(
          response=>{
            if(response.historia && response.n == '1'){
              const imageForm = new FormData();
              imageForm.append('image', this.imageObj2);
              this._uploadService.imageUpload(imageForm,'subir-foto-historia/',response.historia._id).subscribe(res => {
                this._messageService.showSuccess('Historia','Registro exitoso')
                  this.loadPage();
                  this.filesToUpload2 = undefined;
                  this.imL2 = false; 
                  $("#modalHI").modal('hide')
                 this.historia = new Historia("","","","");
                  this.stUpload = false;
              });
          }
          },
          error=>{
                  this._messageService.showError('Historia','Algo salio mal, intentalo de nuevo')
          }
        )
      }else{
        this._messageService.showError('Historia','Selecciona una foto para la historia')
      }
    
    }else{
      this._messageService.showError('Historia','No cumple con el número de caracteres')
    }
  }
  public filesToUpload2: Array<File>;
  urls2 = new Array<string>();
  fileChangeEvent2(event: any){
    const FILE = (event.target as HTMLInputElement).files[0];
    this.imageObj2= FILE;
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
  }
  obtenerHistorias(id){
    this.historiasF = []
    this._fundacionService.obtHistoriasFundacion(id).subscribe(
      response=>{
        if(response.historias && response.n == '1'){
            this.historiasF = response.historias;
            if(response.historias.length == 7 ){
              this.lgtHI = true;
            }else{
              this.lgtHI = false;
            }
        }
      },
      error=>{
      }
    )
  }
  eliminarPortada(id,file){
    if(this.portadasFundacion.length > 1){
      this._fundacionService.eliminarLogo(id,file,'FP').subscribe(
        response=>{
         this.loadPage();
        }
      ),
      error=>{
      }
    }else{
      this._messageService.showError('Error','Debe quedar al menos una portada')
    }
 
  }
 

  eliminarHistoria(id,image){
    this._fundacionService.eliminarHistoria(id,image).subscribe(
      response=>{
        if(response.n == '1')
        this._messageService.showSuccess('Historia','Historia eliminada')

        this.loadPage();
      },
      error=>{
        this._messageService.showSuccess('Historia','Algo salio mal, intentalo de nuevo')

      }
    )
  }
  obtPortadasFundacion(id){
    this._fundacionService.obtPortadasFundacion(id).subscribe(
      response =>{
        if(response.portadasFundacion){
         
          this.portadasFundacion= response.portadasFundacion;
          this.cargaPortads = true
        if(this.p == 1){
          for(var i=0; i < this.portadasFundacion.length; i++){

            this.hh.push({
              "numero":i
            })
            this.p++;
          }
        }
        }else{
        }
      },
      error=>{
        this.portadasFundacion = []
        this.cargaPortads = true
      }
    );
  }

  registrarPortada(form){
    if(this.filesToUpload3 != undefined){
      this.advertenciaNewPor = true;
      this.statusNewPor = 'procesando';
      this.stUpload = true;
      this._messageService.showInfo('Portada','Procesando')
      this.portada.mensaje1 = '';
      this.portada.mensaje2 = this.mensaje2.value;
      this._fundacionService.registerPortada(this.portada, this.idF).subscribe(
        response =>{
          if(response.portada && response.portada._id && response.n == '1'){
            const imageForm = new FormData();
            imageForm.append('image', this.imageObj);
            this._uploadService.imageUpload(imageForm,'subir-portada-fundacion/',+this.idF+'/'+response.portada._id).subscribe(res => {
              this.imageUrl = res['image'];
              this._messageService.showSuccess('Portada','Se subió la portada correctamente')
              this.statusNewPor='success';
              this.loadPage()
              $("#exampleModal").modal('hide')
              $("#mdalPOR")[0].reset();
              this.filesToUpload3 = undefined;
              this.imL3 = false;
              this.stUpload = true;
             
            });
          }else if(response.n == '5'){
            this.statusNewPor='error';
              this.mensajeNewPor = response.message;
              this.filesToUpload3 = undefined;
              form.reset();
              setTimeout(()=>{ this.advertenciaNewPor = false;}, 5000);
          }else{
            this.statusNewPor='error';
              this.mensajeNewPor = 'Algo salió mal.';
              this.filesToUpload3 = undefined;
              form.reset();
              setTimeout(()=>{ this.advertenciaNewPor = false;}, 5000);
          }
        },
        error =>{
          if(error.error.n == '4' || error.error.n == '3' || error.error.n == '2'){
            this.statusNewPor='error';
            this.mensajeNewPor = error.error.message;
            this.filesToUpload3 = undefined;
            form.reset();
            setTimeout(()=>{ this.advertenciaNewPor = false;}, 5000);
        }else{
          this.statusNewPor='error';
          this.mensajeNewPor ='ERROR';
          this.filesToUpload3 = undefined;
          form.reset();
          setTimeout(()=>{ this.advertenciaNewPor = false;}, 5000);
        }
        }
      );
    }else{
      this.statusNewPor= 'error';
      this.mensajeNewPor = 'Por favor, debes subir una foto para tu portada';
      setTimeout(()=>{ this.advertenciaNewPor = false;}, 5000);
    }
    
   }
      public filesToUpload3: Array<File>;
      urls3 = new Array<string>();
      fileChangeEvent3(event: any){
        const FILE = (event.target as HTMLInputElement).files[0];
        this.imageObj = FILE;
        this.filesToUpload3 = <Array<File>>event.target.files;
         let files = <Array<File>>event.target.files;
        this.urls3 = [];
         if (files) {
          for (let file of files) {
            let reader = new FileReader();
            reader.onload = (e: any) => {
              this.urls3.push(e.target.result);
              this.imgUN3 = e.target.result;
              this.imL3 = true;
            }
            reader.readAsDataURL(file);
          }
        }
         if(this.filesToUpload3 != undefined){
          this.imL3 = false;
        }
      }
}
