import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from 'src/app/_shared/services';
import { NotificacionService } from 'src/app/_shared/services/notificacion.service';
import { environment } from '../../../../environments/environment';
import { CommunicationService } from 'src/app/_shared/communications/communication.service';
import $ from "jquery";
@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  @Input() currentUser:any
  public cargaN;
  public notificaciones=[]
  public total;
  public pages;
  public page;
  public itemsPerPage;
  public status;
  public mensaje;
  private signal:any;
  public photoFF :any;
  public toggleBTN = false
  linksHome = [
    {name:'Inicio',root:'home/inicio'},
    {name:'Fundaciones',root:'home/fundaciones/todos/1'},
    {name:'Mascotas',root:'home/mascotas/todos/1'},
    
    {name:'Emergencias',root:'home/emergencias/todos/1'},
  ]
  linksAdmin = [
    {name:'Panel de usuarios',root:'admin/usuarios'},
    {name:'Aprobar cuentas',root:'admin/cuentas/all/1'},
    {name:'Registrar fundación',root:'admin/fundacion-reg'}
  ]
  linksFundacionesSN:any[]= []
  linksFundacionesa:any[]= []
  mainLinks:any[] = []
  keyUrl
  fullUrl:string
  permission:any
  public url
  public fundacionSelec:any
  public totalNt:any;
  constructor(public router: Router,private authenticationService: AuthenticationService,
    private _notificacionService:NotificacionService,private _communicationService:CommunicationService) {
    this.fullUrl = this.router.url.toString()
    this.keyUrl = this.fullUrl.split('/')
    //this.cargaN = true;
    this.page = 1;
    this.url = environment.apiUrl;
   }

  ngOnInit() {
    if(this.currentUser && this.currentUser.usuario.rol == 1){
     
      this.obtEstadisticasAdmin()
    }else if(this.currentUser && this.currentUser.usuario.rol == 4){
     
      this.obtEstadisticasFUND()
    }
    this._communicationService.fundacionSelec.subscribe(res=>{
      
      this.photoFF  = res
      this.getLinks()
      this.styleHeader()
      $(document).ready(()=>{
        this.finSc()
      })
      $(window).scroll(function() {
        var height = $(window).scrollTop();
        console.log(height)
        if(height > 100) {
          $('#header').addClass('active');
        } else {
          $('#header').removeClass('active');
        }
      });
    })

    this.toggle()

   
  }
  toggle(){
    const selectElement = (s:any) => document.querySelector(s)
    selectElement('.open').addEventListener('click',()=>{
      console.log(this.toggleBTN)
      if(this.toggleBTN == false){
        this.toggleBTN = false
        selectElement('.nav-list').classList.add('active')
      }else if(this.toggleBTN == true){
        this.toggleBTN = false
        selectElement('.nav-list').classList.remove('active')

      }
      
 
    })
    selectElement('.close').addEventListener('click',()=>{
      selectElement('.nav-list').classList.remove('active')

    })
  }

  styleHeader(){
    $('.nav-list').removeClass('active')
    $( document ).ready(()=> {
      this.fullUrl = this.router.url.toString()
    this.keyUrl = this.fullUrl.split('/')
    console.log("ENTRO EN STYLES")

    if(this.keyUrl[1] == 'home' && this.keyUrl[2] == 'inicio'){
      $("#header").addClass('transparentHeader')
      $("#header").removeClass('greenHeader')
      $("#header a").removeClass('nav-link-custom')
    }else if(this.keyUrl[1] == 'home' && this.keyUrl[2] != 'inicio'){
      $("#header").addClass('greenHeader')
        $("#header").removeClass('darkHeader')
        $("#header").removeClass('transparentHeader')
        $("#header a").removeClass('nav-link-custom')
    }

      if(this.keyUrl[1] == 'fundacion' ){
          
        $("#header a").addClass('nav-link-custom') 
        $("#header").addClass('darkHeader')
        $("#header").removeClass('transparentHeader')
      }

      if(this.currentUser && this.keyUrl[1] == 'admin'){
          $("#header").removeClass('greenHeader')
          $("#header").addClass('darkHeader')
          $("#header").removeClass('transparentHeader')
          $("#header a").addClass('nav-link-custom')
        }
        
        if(this.keyUrl[1] == 'perfil' && this.keyUrl[4] == 'home'){
        $("#header").addClass('greenHeader')
        $("#header").removeClass('darkHeader')
        $("#header").removeClass('transparentHeader')
        $("#header a").removeClass('nav-link-custom')
      }else if(this.keyUrl[1] == 'perfil' && this.keyUrl[4] == 'fund'){
        $("#header").removeClass('greenHeader')
        $("#header").addClass('darkHeader')
        $("#header").removeClass('transparentHeader')
        $("#header a").addClass('nav-link-custom')
      }else if(!this.currentUser && this.keyUrl[1] == 'perfil' && this.keyUrl[2] != 'mascota'){
        
        $("#header").addClass('greenHeader')
        $("#header").removeClass('darkHeader')
        $("#header").removeClass('transparentHeader')
        $("#header a").removeClass('nav-link-custom')
      }else if(this.currentUser && this.keyUrl[1] == 'perfil' && this.keyUrl[2] != 'mascota'){
        $("#header").removeClass('greenHeader')
        $("#header").addClass('darkHeader')
        $("#header").removeClass('transparentHeader')
        $("#header a").addClass('nav-link-custom')
      }
      
  });
  }
 async getLinks(){

    var idKey = ''
    this.fullUrl = this.router.url.toString()
    this.keyUrl = this.fullUrl.split('/')
    if(!this.currentUser && this.keyUrl[1] == 'home') {this.mainLinks = this.linksHome}
    else if(!this.currentUser && this.keyUrl[1] == 'fundacion'){
      
      this.permission = false;
      this.mainLinks = [
        {name:'Nosotros',root:'fundacion/'+this.keyUrl[2]+'/nosotros'},
        {name:'Mascotas',root:'fundacion/'+this.keyUrl[2]+'/mascotas/todos/1'},
       
        {name:'Donaciones',root:'fundacion/'+this.keyUrl[2]+'/donaciones/todos/1'},
       
        {name:'Contactanos',root:'fundacion/'+this.keyUrl[2]+'/contactanos'},
      ]
    }else if(!this.currentUser && this.keyUrl[1] == 'perfil'){
      
      
      this.permission = false;
      if(this.keyUrl[2] == 'mascota' && this.keyUrl[4] == 'fund'){
        this.mainLinks = [
          {name:'Nosotros',root:'fundacion/'+this.keyUrl[3]+'/nosotros'},
          {name:'Mascotas',root:'fundacion/'+this.keyUrl[3]+'/mascotas/todos/1'},
         
          {name:'Donaciones',root:'fundacion/'+this.keyUrl[3]+'/donaciones/todos/1'},
         
          {name:'Contactanos',root:'fundacion/'+this.keyUrl[3]+'/contactanos'},
        ]
      }else if(this.keyUrl[2] == 'mascota' && this.keyUrl[4] == 'home'){
        this.mainLinks = this.linksHome
      }
      
      if(this.keyUrl[2] != 'mascota'){
        this.mainLinks = this.linksHome
      }
     
    }



 
    if(this.currentUser && this.currentUser.usuario.rol == '4') {
      console.log(this.keyUrl)

      if(this.keyUrl[1] == 'fundacion'){
        idKey = this.keyUrl[2]
      }else if(this.keyUrl[1] == 'perfil'){

        idKey = this.keyUrl[3]
      }
      if(this.keyUrl[2] != 'emergencia'){
        if(this.currentUser.usuario._id == idKey){
          this.permission = true;
          this.mainLinks = [
            {name:'Nosotros',root:'fundacion/'+this.currentUser.usuario._id+'/nosotros'},
            {name:'Mascotas',root:'fundacion/'+this.currentUser.usuario._id+'/mascotas/todos/1'},
            {name:'Emergencias',root:'fundacion/'+this.currentUser.usuario._id+'/emergencias/todos/1'},
            {name:'Donaciones',root:'fundacion/'+this.currentUser.usuario._id+'/donaciones/todos/1'},
            {name:'Adopciones',root:'fundacion/'+this.currentUser.usuario._id+'/adopciones/todos/1'},
            {name:'Voluntarios',root:'fundacion/'+this.currentUser.usuario._id+'/voluntarios/todos/1'},
            {name:'Contactanos',root:'fundacion/'+this.currentUser.usuario._id+'/contactanos'},
          ]
        }else{
          this.permission = false;
          this.mainLinks = [
            {name:'Nosotros',root:'fundacion/'+this.keyUrl[2]+'/nosotros'},
            {name:'Mascotas',root:'fundacion/'+this.keyUrl[2]+'/mascotas/todos/1'},
           
            {name:'Donaciones',root:'fundacion/'+this.keyUrl[2]+'/donaciones/todos/1'},
           
            {name:'Contactanos',root:'fundacion/'+this.keyUrl[2]+'/contactanos'},
          ]
        }
      }else{
        this.permission = true;
        this.mainLinks = [
          {name:'Nosotros',root:'fundacion/'+this.currentUser.usuario._id+'/nosotros'},
          {name:'Mascotas',root:'fundacion/'+this.currentUser.usuario._id+'/mascotas/todos/1'},
          {name:'Emergencias',root:'fundacion/'+this.currentUser.usuario._id+'/emergencias/todos/1'},
          {name:'Donaciones',root:'fundacion/'+this.currentUser.usuario._id+'/donaciones/todos/1'},
          {name:'Adopciones',root:'fundacion/'+this.currentUser.usuario._id+'/adopciones/todos/1'},
          {name:'Voluntarios',root:'fundacion/'+this.currentUser.usuario._id+'/voluntarios/todos/1'},
          {name:'Contactanos',root:'fundacion/'+this.currentUser.usuario._id+'/contactanos'},
        ]
      }



    }else if(this.currentUser && this.currentUser.usuario.rol == '1'){
      this.mainLinks = this.linksAdmin;
    }
  } 
  obtEstadisticasAdmin(){
    this._notificacionService.obtALLNotificacionesADCount().subscribe(
      res=>{
        console.log(res.total)
        this.totalNt = res.total;
      },
      err=>{
        console.log(<any>err)
        this.totalNt = 0
      }
    )
  }
  obtEstadisticasFUND(){
  
    this._notificacionService.obtALLNotificacionesCount().subscribe(
      res=>{
        console.log(res.total)
        this.totalNt = res.total;
        if(this.currentUser.usuario.estado == 2){
          this.totalNt++;
        }
      },
      err=>{
        console.log(<any>err)
        this.totalNt = 0
      }
    )
  } 
  obtallnotificaciones2(page,adding=false){
    console.log("entroo noif ******")
    this.cargaN = true;     
    //this.identity = this._usuarioService.obtIdentity();
    this.obtEstadisticasAdmin()
    this._notificacionService.obtALLNotificacionesAD(page).subscribe(
      response=>{

        if(response.notificaciones){
          console.log(response)
          this.total = response.totalPubli;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
          if(!adding){

            this.notificaciones = response.notificaciones;
            this.cargaN = false;
          }else{
            var arrayA = this.notificaciones;
            var arrayB = response.notificaciones;
            this.notificaciones = arrayA.concat(arrayB);  
            this.cargaN = false;      
          }
          
          
        }else{
          this.status = 'error';
          this.mensaje = 'No existe notificaciones'
        }
      },
      error=>{
        this.notificaciones = []
        this.cargaN = false;    
        console.log(<any>error)
      }
    )
  }
  obtallnotificaciones(page,adding=false){
    this.cargaN = true;    
    this.obtEstadisticasFUND() 
    //this.identity = this._usuarioService.obtIdentity();
    this._notificacionService.obtALLNotificaciones(page).subscribe(
      response=>{

        if(response.notificaciones){
          console.log(response)
          this.total = response.totalPubli;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
          if(!adding){

            this.notificaciones = response.notificaciones;
            this.cargaN = false;
          }else{
            var arrayA = this.notificaciones;
            var arrayB = response.notificaciones;
            this.notificaciones = arrayA.concat(arrayB);  
            this.cargaN = false;      
          }
          
          
        }else{
          this.status = 'error';
          this.mensaje = 'No existe notificaciones'
        }
      },
      error=>{
        this.cargaN = false;    
        console.log(<any>error)
      }
    )
  }
async  deleteOneSignal(id,signal){
  this.signal =  await localStorage.getItem('idsignal')
    this._notificacionService.eliminarOneSignal(id,signal).subscribe(
      response=>{
        console.log(response)
        localStorage.removeItem('idsignal');

      },
      error=>{
        console.log(<any>error)
      }
    )
  }
 async cerrarSesion(){
    
    if(this.currentUser.usuario && this.signal && this.signal != null && this.signal != ''){
      this.deleteOneSignal(this.currentUser.usuario._id,this.signal)
    }
   
    await this.authenticationService.logout()
    this.getLinks()
    this.styleHeader()
   /* localStorage.clear();
    this.currentUser = this.authenticationService.currentUserValue;
    //this.identity = null;
    this._router.navigate(['/']);*/
  }
  public noMore = false;
  verMas(){
    this.page += 1;
    if(this.page == this.pages){
      this.noMore = true;
    }
   // $("html, body").animate({scrollTop:$('body').prop("scrollHeight")},500);
    this.obtallnotificaciones(this.page, true);
  }

  finSc(){
    

  $("#divNotificacion").scroll(()=>{
  let element = document.getElementById("divNotificacion");
  if (element.offsetHeight + element.scrollTop >= element.scrollHeight) {
    this.verMas()
  }
})
  }
  redirectNosotros(nombre,id){
    this.router.navigate(['/fundacion',id]); 
    
  }

  redirect(){
    if(this.keyUrl[1] == 'fundacion'){
      this.router.navigate(['/fundacion',this.keyUrl[2],'nosotros']); 
    }else if(this.keyUrl[1] == 'home'){
      this.router.navigate(['/']); 
    }else if(!this.currentUser && this.keyUrl[1] == 'perfil' && this.keyUrl[2] == 'mascota' && this.keyUrl[4] == 'fund'){
      this.router.navigate(['/fundacion',this.keyUrl[3],'nosotros']); 
    }else if(this.currentUser && this.keyUrl[1] == 'perfil'){
      this.router.navigate(['/fundacion',this.keyUrl[3],'nosotros']); 
    }else if(!this.currentUser && this.keyUrl[1] == 'perfil' && this.keyUrl[2] != 'mascota'){
      this.router.navigate(['/']); 
    }
    
  }
  reloadD(id){
    
    

    this.cambiarEstado(id)
    this._communicationService.reloadData();
  }
  cambiarEstado(id){
    this._notificacionService.changeEstado(id).subscribe(
      res=>{
        if(this.currentUser && this.currentUser.usuario.rol == '1'){
          this.obtEstadisticasAdmin()
        }else{
          this.obtEstadisticasFUND() 
        }
       
        
        console.log(res)
        
      },
      err=>{
        console.log(<any>err)
      }
    )
  }
}
