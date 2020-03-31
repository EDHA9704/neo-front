import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_shared/services';
import { NotificacionService } from 'src/app/_shared/services/notificacion.service';
import { environment } from '../../../../../environments/environment';
declare var $:any;
@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent implements OnInit {
  public permission: boolean;
  public id;
  public name;
  public currentUser:any
  public cargaN;
  public notificaciones=[]
  public total;
  public pages;
  public page;
  public itemsPerPage;
  public status;
  public mensaje;
  public url
  public idFun
  constructor(private _route:ActivatedRoute,private authenticationService: AuthenticationService,
    private _notificacionService:NotificacionService,
    private _router:Router) { 
    this.currentUser = this.authenticationService.currentUserValue;
    this.cargaN = true;
    this.page = 1;
    this.url = environment.apiUrl;
  }

  ngOnInit() {
    this.loadPage()
    if(this.currentUser){
      $(document).ready(()=>{
        this.finSc()
      var element = document.getElementById('dropNOTIF'); 
      if (element.scrollHeight - element.scrollTop === element.clientHeight) { 
      } 
     })
    }

   this.loadPage()
   $( document ).ready(()=> {
     this.toggle()
 });
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
  loadPage(){
    this._route.params.subscribe(params =>{
      if(this.currentUser && this.currentUser.usuario._id == this.id){
        this.permission = true;
    }
    })
  }
  obtallnotificaciones(page,adding=false){
    this.cargaN = true;     
    this._notificacionService.obtALLNotificacionesAD(page).subscribe(
      response=>{
        if(response.notificaciones){
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
      }
    )
  }
  cerrarSesion(){
    this.authenticationService.logout()
  }
  public noMore = false;
  verMas(){
    this.page += 1;
    if(this.page == this.pages){
      this.noMore = true;
    }
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
  redirectAC(nombre,id){
    this._router.navigate(['/cuentas/all/1']);
  }
  redirectAC2(nombre,id){
    this._router.navigate(['admin/asi/cuentas/all/1']);
  }
}
