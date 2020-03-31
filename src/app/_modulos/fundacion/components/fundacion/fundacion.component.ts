import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Historia } from 'src/app/_models/historia';
import { PortadaFundacion } from 'src/app/_models/portadaFundacion';
import { UsuarioFundacion } from 'src/app/_models/usuarioFundacion';
import { CommunicationService } from 'src/app/_shared/communications/communication.service';
import { environment } from '../../../../../environments/environment';
import { AuthenticationService, UserService } from '../../../../_shared/services';

declare var $:any;
@Component({
  selector: 'app-fundacion',
  templateUrl: './fundacion.component.html',
  styleUrls: ['./fundacion.component.scss']
})
export class FundacionComponent implements OnInit, OnDestroy{
  mensaje1 = new FormControl('', [Validators.maxLength(30),Validators.minLength(3)]);
  mensaje2 = new FormControl('', [Validators.maxLength(500),Validators.minLength(3)]);
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
  currentUser;
  imageObj: File;
imageUrl: string;
imageObj2: File;
imageUrl2: string;
public stUpload = false;
public carga = false;
public idFun
keyUrl
  fullUrl:string
  constructor(
    private authenticationService: AuthenticationService,private userService:UserService,
    private router: Router,private _communcationService:CommunicationService) {
      this.url = environment.apiUrl;
      this.currentUser = this.authenticationService.currentUserValue; 
      this.fullUrl = this.router.url.toString()
      this.keyUrl = this.fullUrl.split('/')
     }
 ngOnDestroy(){
 
 }
  ngOnInit() {
    this.idFun =this.keyUrl[2]
    this.obtFundacion2()
   
  }
  loadPage(){
  
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
 
    this.userService.obtUsuario(this.idFun).subscribe(
      response=>{
        console.log(response)
        /*$(document).ready(()=>{
          this.prob()
                
            });*/
       
        this.usuarioFundacion = response.usuario;
        this._communcationService.perfilFundacionSelec(this.usuarioFundacion.logo)
        //localStorage.setItem('photoFF', response.usuario.logo);
        this.carga = true
      },
      error=>{
        //this.router.navigate(['**']);  
      }
    )
  }
 
} 
