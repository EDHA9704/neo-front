import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_shared/services';
import { environment } from '../../../../../environments/environment';
import { CommunicationService } from 'src/app/_shared/communications/communication.service';

declare var $:any;
@Component({
  selector: 'app-fundaciones',
  templateUrl: './fundaciones.component.html',
  styleUrls: ['./fundaciones.component.scss']
})
export class FundacionesComponent implements OnInit {
  titulo = 'Fundaciones'
  descripcion = 'Mediante la unión de Fundaciones y ciudadanía, es posible que decenas de perros y gatos callejeros, encuentren familias que les brinden amor y protección.'
  descripcion2 = 'Registradas en el sistema.'
  img = "depositphotos_147298583-stock-illustration-lovers-union-icon.jpg"
  public type;
 
  public page;
  public total;
  public pages;
  public itemsPerPage;
  public next_page;
  public prev_page;
  public filtroBTN;
  public filtroBSQ = [];
  public sectores = ["Todos","Norte","Centro","Sur"];
  public pagesSelec=[]
  public busqueda;
  public carga
  public advertencia
  public fundaciones:any;
  public itemsFund;
  public mensaje;
  public n;
  public status;
  public url;
  public select
  public loading = true;
  constructor(private _route:ActivatedRoute,private _usuarioService:UserService,
    private _router:Router,private _comunicationService:CommunicationService) { 
      this.carga = true;
      this.busqueda = false;
      this.advertencia = false;
      this.filtroBSQ = this._usuarioService.obtFiltro();
  }

  ngOnInit() {
    this._comunicationService.perfilFundacionSelec('')
    this.url = environment.apiUrl;
    this.page = 1;
    $(document).ready(()=>{
      $("#sectorDrop").change(()=>{

        this.select = $("#sectorDrop").val();
        this.filtroBSQD(this.select)
    });

  }); 
    this.actualPage();
    this.prob();
  }
  actualPage(){
    this.pagesSelec = []
    this.type = ''
    this._route.params.subscribe(params =>{
      let page = +params['page'];
      this.page = page;
      let tipo = params['tipo'];
      this.type = tipo;
      console.log(this.type)
     
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
        console.log("actypeBUS")
        this.filtroBTN = true;
       
        this.buscarFundaciones(page)
        this.filtroBSQ.forEach(elem => {
          if(elem.tipo == 'sec'){
          
            $(document).ready(()=>{
              $("#sectorDrop").val(elem.option)
            });
          
          }
          
        });
        
       
       
      }else{
        console.log("actypeOBT")
        $(document).ready(()=>{
          $("#sectorDrop").val('Todos')
        });
       
        this.filtroBTN = false;
        //devolver listado de usuarios
        this.obtFundacionesActivas(page);
      }
      //devolver listado de usuarios
    });
  }
 prob(){

    $("#bsFunNombre").keyup(()=>{
      this.obtnerFundacionesByNombre();
      this.busqueda = true;
  
  }); 
  }

  obtnerFundacionesByNombre(){
    this.fundaciones = []
    this.pagesSelec = []
    this.loading = true
    const nombre = $("#bsFunNombre").val();
   
    const resultado = document.querySelector('#busquedaUsers');

    if(nombre != ''){
      this._usuarioService.obtFundacionesByNombre(nombre).subscribe(
        response=>{
         
          if(response.usuarios && response.n == '1'){

             
            
            this.fundaciones = response.usuarios;
            this.itemsFund = this.fundaciones.length;
            this.total = this.fundaciones.length;
            this.loading = false;
            $(".content-grid-cards").addClass('visible')

          }
        },
        error=>{
          this.fundaciones = []
          this.loading = false;
    this.pagesSelec = []
          console.log(<any>error)
          this.carga = false;
          $(".carga").fadeOut("slow");
          var errorMessage = <any>error;
          console.log(errorMessage);
          this.advertencia = true;
          this.status = 'error';
          if(errorMessage != null && error.error.n == '2'){
            this.status = 'error';  
            this.mensaje = 'Lo sentimos, no se encontro fundaciones';
          }else if(errorMessage != null && error.error.n == '3'){
            this.status = 'error';  
            this.mensaje = error.error.message;
          }else{
            this.n = 'n';
            this.status = 'error';
            this.mensaje = 'Algo salio mal, intentalo de nuevo.'
          }
        }
      )
    }else{
      
     this.actualPage();
    }

  }
  cancelarBusqueda(){
    this.filtroBTN = false;
    localStorage.removeItem('busquedaFundacionesSC');
    this._router.navigate(['/home/fundaciones','todos','1']);
    this.busqueda = false;
    
  }
  obtFundacionesActivas(page){
    console.log("ENTROOOOOO")
    this.fundaciones = []
    this.pagesSelec = []
    let rol = 4;
   
    this.status = 'procesando';
    
    this._usuarioService.obtUsuariosRol(page, rol).subscribe(
      response=>{
        console.log(response)
        if(response.usuarios && response.n == '1'){
          this.carga = false;

          $(".carga").fadeOut("slow");
          this.total = response.total;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
          this.fundaciones = response.usuarios;
          for (let i = 1; i <= this.pages; i++) {
            this.pagesSelec.push(i)
            
          }
          this.itemsFund = this.fundaciones.length * page;
          this.advertencia = false;
          this.status ='success';
          this.loading = false;
            $(".content-grid-cards").addClass('visible')
          if(page > this.pages){
            this._router.navigate(['/fundaciones/todos/1'])
          }
          

        }else{
          this.loading = false;
          console.log(response.n)
          this.status = 'error';
          this.mensaje = 'Algo salió mal.'
        }
      },
      error=>{
        this.fundaciones = []
        this.pagesSelec = []
        this.loading = false;
        console.log(error)
        this.carga = false;
        $(".carga").fadeOut("slow");
        var errorMessage = <any>error;
        console.log(errorMessage);
        this.advertencia = true;
        this.status = 'error';
        if(errorMessage != null && error.error.n == '2'){
          this.status = 'error';  
          this.mensaje = 'Lo sentimos, no existe fundaciones registradas.';
        }else if(errorMessage != null && error.error.n == '3'){
          this.status = 'error';  
          this.mensaje = error.error.message;
        }else{
          this.n = 'n';
          this.status = 'error';
          this.mensaje = 'Algo salio mal, intentalo de nuevo.'
        }
      }
    )
  }
  filtroBSQD(option){

    
    var optionFinal = option;
    if(optionFinal == 'Norte' || optionFinal == 'Centro' || optionFinal == 'Sur'){
      
      if(this.filtroBSQ == null){
       
        this.filtroBSQ = [];
        this.filtroBSQ.push({tipo:'sec',option:optionFinal})
        
      }else{
       var ok = false;
        this.filtroBSQ.forEach(fl => {
          if(fl.tipo == 'sec'){
            ok = true;
            fl.option = optionFinal;
          }
  
        });

        if(ok == false){
          this.filtroBSQ.push({tipo:'sec',option:optionFinal})
        }
      }

      localStorage.setItem('busquedaFundacionesSC', JSON.stringify(this.filtroBSQ));
    }

    
    if(this.type == 'busqueda'){
      this.buscarFundaciones(this.page)
    }
      
    this._router.navigate(['/home/fundaciones','busqueda','1']);
    
    

  }
  buscarFundaciones(page,adding=false){
    console.log("ENTROBUSQUEDA")
    this.pagesSelec = []
    this.fundaciones = []
    this.loading = true;
        this._usuarioService.filtroFundaciones(this.filtroBSQ,page).subscribe(
          response=>{
           
            this.carga = false;
            $(".carga").fadeOut("slow");
            if(response.fundaciones && response.n == '1'){
             
              this.total = response.total;
              this.pages = response.pages;
              this.itemsPerPage = response.itemsPerPage;
              this.fundaciones = response.fundaciones;
              for (let i = 1; i <= this.pages; i++) {
                this.pagesSelec.push(i)
                
              }
              this.itemsFund = this.fundaciones.length * page;
              this.advertencia = false;
              this.status ='success';
              //this.obtFotos(response.mascotas._id, page);
              this.loading = false;
              $(".content-grid-cards").addClass('visible')
              if(page > this.pages){
                this._router.navigate[('/fundaciones/todos/1')]
              }
            }
          },
          error=>{
            this.carga = false;
            this.total = 0;
            this.advertencia =true;
            this.status = 'error';  
            this.loading = false;
            $(".carga").fadeOut("slow");
            var errorMessage = <any>error;
           
            
            if(errorMessage != null && error.error.n == '2'){
              this.mensaje = 'Lo sentimos, '+error.error.message;
            }else if(errorMessage != null && error.error.n == '5'){
              this.mensaje = 'No se ha elegigo filtros';
            }
            
            else{
      
              this.n = 'n';
              
              this.mensaje = 'Algo salio mal, intentalo mas tarde'
            }
          }
        )
      }
redirec(name,id){
  this._router.navigate(['fundacion',name,id]);
}
}
