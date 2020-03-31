import { Component, OnInit, DoCheck } from '@angular/core';
import { UsuarioFundacion } from 'src/app/_models/usuarioFundacion';
import { ActivatedRoute, Router } from '@angular/router';
import { AdopcionService } from 'src/app/_shared/services/adopcion.service';
import { environment } from '../../../../../environments/environment';
import { UserService, AuthenticationService } from 'src/app/_shared/services';

declare var $:any
@Component({
  selector: 'app-mis-adopciones',
  templateUrl: './mis-adopciones.component.html',
  styleUrls: ['./mis-adopciones.component.scss']
})
export class MisAdopcionesComponent implements OnInit,DoCheck {
  public imgCom;
  public opAd;
  public url;
  public fundacion:UsuarioFundacion;

  public page;
  public next_page;
  public prev_page;
  public total;
  public pages;
  public itemsPerPage;
  public idFun;
  public titu;
  public adopciones:any;
  public carga;
  public advertencia;
  public mensaje
  public status;
  public valid;
  public filtroBSQ = [];
  public filtroBTN;
  public select;
  public type;
  public pagesSelec;
  public estados = ["Todos","0","1","2"];

  public currentUser;
  keyUrl
  fullUrl:string
  public loading = true;
  constructor(private _route:ActivatedRoute,
    private _router:Router,private _adopcionService:AdopcionService,private _userService:UserService,private authenticationService: AuthenticationService) {
      this.filtroBSQ = this._adopcionService.obtFiltro();
      this.currentUser = this.authenticationService.currentUserValue;
      this.fullUrl = this._router.url.toString()
      this.keyUrl = this.fullUrl.split('/')
      this.url = environment.apiUrl;
      this.page = 1;
      this.carga = true;
     }

     ngOnInit() {
      this.actualPage2();
      this.changeFiltros()
    }
    ngDoCheck(){
    
      this.filtroBSQ = this._adopcionService.obtFiltro();
  
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
    this.loading =true;
    this.type = '';
    this.pagesSelec = []
    this._route.params.subscribe(params =>{
     
      this.type= params['tipo'];
      this.idFun = this.keyUrl[2]
   

      this.obtFundacion(this.idFun);

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
        console.log("entroN")
        this.filtroBTN = false;
        //devolver listado de adopciones
         }
      

      
    });
    
  }
  obtFundacion(id){

    this._userService.obtUsuario(id).subscribe(
      response=>{
        console.log("entro")
        
        this.carga == false
        this.fundacion = response.usuario;
        if(this.type == 'busqueda'){
          this.buscarAdopciones(this.page)
        }else{
          this.obtAdopciones(this.page);    
        }
        this.changeFiltros()
      },
      error=>{
        this._router.navigate(['**']);  
        console.log(<any>error);
      }
    )
    

  }
  cancelarBus(){
   
    //this.bus = false;
    localStorage.removeItem('busquedaAdopciones');
    this._router.navigate(['/fundacion',this.idFun,'adopciones','todos','1']);
  }
  verFoto(foto,op){
    
    this.imgCom = foto;
    this.opAd = op;
    $('#modalComprobante').modal('show')
    console.log(this.imgCom)

  }

  obtAdopciones(page){
    this.pagesSelec = []
    this.adopciones = []
    this._adopcionService.obtAdopciones(page,this.idFun).subscribe(
      response =>{
       
        this.carga = false;
        this.adopciones = response.adopciones;
        console.log(this.adopciones)
         this.total = response.total;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
          for (let i = 1; i <= this.pages; i++) {
            this.pagesSelec.push(i)
            
          }
          this.advertencia =false;
          this.loading = false;
          $(".content-grid-cards").addClass('visible')
         
       
        
      },
      error=>{
        this.pagesSelec = []
        this.adopciones = []
        this.carga = false;
        this.loading = false;
        this.advertencia = true;
        console.log(<any>error)
        var errorMessage = <any>error;
        console.log(errorMessage)
        this.carga = false;
        this.advertencia = true;
       this.status = "error"
        if(errorMessage != null && error.error.n == '2'){
        
          this.mensaje = 'Lo sentimos, no se encontro adopciones';
        }else if(errorMessage != null && error.error.n == '3'){
       
          this.mensaje = 'Algo salio mal, intentalo mas tarde';
        }else{
       
          this.mensaje = 'Algo salio mal, intentalo mas tarde'
        }
      }
    )
  }
  buscarAdopciones(page,adding=false){
    this.pagesSelec = []
    this.adopciones = []
    this._adopcionService.filtroAdopciones(this.idFun,this.filtroBSQ,page).subscribe(
      response=>{
        this.carga = false;
        if(response.adopciones && response.n == '1'){
          

          $(".carga").fadeOut("slow");
      
         // this.fotos = response.fot;
          this.total = response.total;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
          this.adopciones = response.adopciones;
         // this.itemsMSC = this.mascotas.length;
          this.status ='success';
         
          for (let i = 1; i <= this.pages; i++) {
            this.pagesSelec.push(i)
            
          }
          this.advertencia =false;
          this.loading = false;
          $(".content-grid-cards").addClass('visible')
         
        }
      },
      error=>{
        this.pagesSelec = []
        this.adopciones = []
        this.carga = false;
        this.loading = false;
        this.advertencia =true;
        this.status = 'error';
        $(".carga").fadeOut("slow");
        var errorMessage = <any>error;
       
        
        if(errorMessage != null && error.error.n == '2'){
          this.mensaje = 'Lo sentimos, '+error.error.message;
          this.adopciones = null;

         
        }else if(errorMessage != null && error.error.n == '5'){
          this.mensaje = 'No se ha elegigo filtros';

          this.adopciones = null;
        }
        
        else{
  
          //this.n = 'n';
          
          this.mensaje = 'Algo salio mal, intentalo mas tarde'

          
        }
      }
    )
  }
  filtroBSQD(option){

    console.log("entrp")
    var optionFinal = option;
    if(optionFinal == '0' || optionFinal == '1' || optionFinal == '2'){
      
      if(this.filtroBSQ == null){
       
        this.filtroBSQ = [];
        this.filtroBSQ.push({tipo:'estado',option:optionFinal})
        
      }else{
       var ok = false;
        this.filtroBSQ.forEach(fl => {
          if(fl.tipo == 'estado'){
            ok = true;
            fl.option = optionFinal;
          }
  
        });

        if(ok == false){
          this.filtroBSQ.push({tipo:'estado',option:optionFinal})
        }
      }

      localStorage.setItem('busquedaAdopciones', JSON.stringify(this.filtroBSQ));
    }

    if(this.type == 'busqueda'){
      this.buscarAdopciones(this.page)
    }
    this._router.navigate(['/fundacion',this.idFun,'adopciones','busqueda','1']);
    
    

  }
  redirectAdopcion(idr,id){
    this._router.navigate(['/perfil/adopcion/',idr,id]); 
    
  }
}
