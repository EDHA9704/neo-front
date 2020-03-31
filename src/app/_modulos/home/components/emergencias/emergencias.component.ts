import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmergenciaService } from 'src/app/_shared/services/emergencia.service';
import {environment} from '../../../../../environments/environment'
import { CommunicationService } from 'src/app/_shared/communications/communication.service';
declare var $:any
@Component({
  selector: 'app-emergencias',
  templateUrl: './emergencias.component.html',
  styleUrls: ['./emergencias.component.scss']
})
export class EmergenciasComponent implements OnInit,DoCheck{
  titulo = 'Emergencias'
  descripcion = 'Gracias a la ayuda de Fundaciones, voluntarios y ciudadanos es posible ayudar a animales que se encuentren en peligro o que han sufrido algún accidente y brindarles toda la atención necesaria.'
  img = "corEm.png"
  descripcion2 = 'Reportadas'
  public type;
  public pagesSelec;
  public mensaje;
  public n;
  public advertencia;
  public status;
  public emergencias:any;
  public page;
  public total;
  public pages;
  public itemsPerPage;
  public next_page;
  public prev_page;
  public newEmer;
  public filtroBTN;
  public filtroBSQ = [];
  public bus
  public fl
  public carga
  public itemsEmer
  public imgCom
  public url
  public select
  public loading=true;
  public tipoE = ["Todos","Mal estado de salud","Accidente","Preñada","Con cachorros","Maltrato","Abandono"];
  constructor(private _route:ActivatedRoute,private _comunicationService:CommunicationService,
    private _router:Router,private _emergenciaService:EmergenciaService) {
      this.filtroBSQ = this._emergenciaService.obtFiltro();
      this.url = environment.apiUrl;
      this.page = 1;
      this.bus = false;
      this.itemsEmer = 0;

      this.advertencia = false;
      this.carga = true;
     }

  ngOnInit() {
    this._comunicationService.perfilFundacionSelec('')
    this.page = 1;
    this.actualPage();
    //this.obtVoluntarios()
    $(document).ready(()=>{
      $("#tipoDrop").change(()=>{

        this.select = $("#tipoDrop").val();
        this.filtroBSQD(this.select)
    });
    $("#nivelDrop").change(()=>{

      this.select = $("#nivelDrop").val();
      this.filtroBSQD(this.select)
  });

  }); 
  }
  ngDoCheck(){

    this.filtroBSQ = this._emergenciaService.obtFiltro();
    
  }
  actualPage(){
    this.type = ''
    this.pagesSelec = []
   //this.statusAyuda = null;
  // $('#modalAyudarEmergencia').modal('hide')
  this._route.params.subscribe(params =>{
    let tipo = params['tipo'];
    this.type = tipo;
    let page = +params['page'];
    this.page = page;
    
   /* let newF = params['new'];
    if(newF == 'new'){
      this.newEmer = true;
    }*/
   
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
      this.filtroBSQ.forEach(elem => {
        $(document).ready(()=>{
        if(elem.tipo == 'tipoE'){
          $("#tipoDrop").val(elem.option)
        }
        if(elem.tipo == 'nivelE'){
          $("#nivelDrop").val(elem.option)
        }
        
      })
      });
      
     
      this.buscarEmergencias(page)
    }else{
      $(document).ready(()=>{
      $("#tipoDrop").val('Todos')
      $("#nivelDrop").val('Todos')
      })
      this.filtroBTN = false;
      //devolver listado de emergencias
      this.obtEmergencias(page);
    }

    
  });
}
cancelarBus(){
   
  this.bus = false;
  localStorage.removeItem('busquedaEmergencias2');
  this._router.navigate(['/home/emergencias','todos','1']);
}

  buscarEmergencias(page,adding=false){
    this.loading = true;
    this.pagesSelec = []
    this.emergencias = []
    this._emergenciaService.filtroEmergencias(this.filtroBSQ,page).subscribe(
      response=>{
        this.carga = false;
        if(response.emergencias && response.n == '1'){
          console.log(response)
          $(".carga").fadeOut("slow");
         
          this.advertencia = false;
          this.total = response.total;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
          this.emergencias = response.emergencias;
          for (let i = 1; i <= this.pages; i++) {
            this.pagesSelec.push(i)
            
          }
          //console.log(this.emergencias)
          this.itemsEmer = this.emergencias.length;
          this.status ='success';
          this.loading = false;
          $(".content-grid-cards").addClass('visible')
          if(page > this.pages){
            this._router.navigate[('/login')]
          }
        }
      },
      error=>{
        this.pagesSelec = []
    this.emergencias = []
        this.loading = false;
        this.carga = false;
        this.advertencia =true;
        this.status = 'error';  
        $(".carga").fadeOut("slow");
        var errorMessage = <any>error;
       
        
        if(errorMessage != null && error.error.n == '2'){
          this.mensaje = 'Lo sentimos, '+error.error.message;
          this.emergencias = null;
        }else if(errorMessage != null && error.error.n == '5'){
          this.mensaje = 'No se ha elegigo filtros';
          this.emergencias = null;
        }
        
        else{
  
          this.n = 'n';
          
          this.mensaje = 'Algo salio mal, intentalo mas tarde'
        }
      }
    )
  }

  
  filtroBSQD(option){

    
    var optionFinal = option;
    if(optionFinal == 'Mal estado de salud' || optionFinal == 'Accidente' || optionFinal == 'Preñada' || optionFinal == 'Con cachorros'|| optionFinal == 'Maltrato' || optionFinal == 'Abandono'){
      
      if(this.filtroBSQ == null){
       
        this.filtroBSQ = [];
        this.filtroBSQ.push({tipo:'tipoE',option:optionFinal})
        
      }else{
       var ok = false;
        this.filtroBSQ.forEach(fl => {
          if(fl.tipo == 'tipoE'){
            ok = true;
            fl.option = optionFinal;
          }
  
        });

        if(ok == false){
          this.filtroBSQ.push({tipo:'tipoE',option:optionFinal})
        }
      }

      localStorage.setItem('busquedaEmergencias2', JSON.stringify(this.filtroBSQ));
    }

    if(optionFinal == 'Atención inmediata' || optionFinal == 'Muy urgente' || optionFinal == 'Urgente' || optionFinal == 'Normal' || optionFinal == 'No urgente'){
      if(this.filtroBSQ == null){
       
        this.filtroBSQ = [];
        this.filtroBSQ.push({tipo:'nivelE',option:optionFinal})
      }else{
        var ok2= false;
        this.filtroBSQ.forEach(fl => {
          if(fl.tipo == 'nivelE'){
            ok2 = true;
            fl.option = optionFinal;
          }

  
        });

       
        if(ok2 == false){
          this.filtroBSQ.push({tipo:'nivelE',option:optionFinal})
        }
      }

      localStorage.setItem('busquedaEmergencias2', JSON.stringify(this.filtroBSQ));
    }

    if(this.type == 'busqueda'){
      this.actualPage()
    }

    this._router.navigate(['/home/emergencias','busqueda','1']);
    
    

  }
  verFoto(foto){
    $('#modalComprobante').modal('show')
    this.imgCom = foto;
    console.log(this.imgCom)

  }
  obtEmergencias(page){
    let rol = 4;
    this.pagesSelec = []
    this.emergencias = []
   
    this._emergenciaService.obtEmergencias(page).subscribe(
      response=>{
        this.carga = false;
        if(response.emergencias && response.n == '1'){

          $(".carga").fadeOut("slow");
          this.total = response.total;
          this.pages = response.pages;
         
          this.itemsPerPage = response.itemsPerPage;
          this.emergencias = response.emergencias;
          console.log(this.emergencias)
          this.itemsEmer = this.emergencias.length;
          this.loading = false;
          $(".content-grid-cards").addClass('visible')
          for (let i = 1; i <= this.pages; i++) {
            this.pagesSelec.push(i)
            
          }
          this.status ='success';
          this.advertencia = false;
         // $('html, body').animate({scrollTop:0},500);
          if(page > this.pages){
            this._router.navigate(['/emergencias/1'])
          }
          

        }else{
          this.pagesSelec = []
    this.emergencias = []
          console.log(response.n)
          this.status = 'error';
          this.mensaje = 'Algo salió mal.'
        }
      },
      error=>{
        this.pagesSelec = []
    this.emergencias = []
        $(".carga").fadeOut("slow");
        var errorMessage = <any>error;
        console.log(errorMessage)
        this.carga = false;
        this.loading = false;
        this.advertencia = true;
        this.status = 'error';
        if((errorMessage != null && error.error.n == '2')){
          this.mensaje = 'Lo sentimos, no existe emergencias en este momento.';
        }else{
          this.mensaje = 'Algo salio mal, intentalo de nuevo.'
        }
      }
    )
  } 
}
