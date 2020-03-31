import { Component, OnInit } from '@angular/core';
import {Mascota} from '../../../../_models/mascota';
import {Foto} from '../../../../_models/foto';
import { MascotaService } from 'src/app/_shared/services/mascota.service';
import { environment } from '../../../../../environments/environment';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService} from 'ngx-ui-loader'; // Import NgxUiLoaderService
import {SPINNER}  from 'ngx-ui-loader';
import { CommunicationService } from 'src/app/_shared/communications/communication.service';
declare var $:any
@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.scss']
})
export class MascotasComponent implements OnInit {
  titulo = 'Mascotas'
  descripcion = 'El objetivo es encontrar hogares definitivos para aquellos animales que son rescatados de las calles, asegurándoles una nueva oportunidad de vida, con familias responsables que asuman el compromiso de velar por su bienestar.'
  img = "iconohuouse.jpg"
  descripcion2 = 'Registradas por las fundaciones.'
  public taman = ["Todos","Pequeño","Mediano","Grande"];
  public sexo = ["Todos","Macho","Hembra"];
  public edad = ["Todos","Cachorro","Joven","Adulto"];
  public pagesSelec=[]
  public select;
  public filtroBSQ = [];
  public filtro;
  public url;
  public status;
  public page;
  public total;
  public pages;
  public mascotas:any;
  public fotos:Foto;
  public itemsPerPage;
  public fil;
  public carga;
  public itemsMSC;
  public advertencia
  public mensaje
  public n
  public fotoPerfil;
  public imgCom
  public type;
  public next_pagee;
  public prev_pagee;
  public filtroBTN;
  public fl
  public bus
  public loading = true;
  constructor(private _mascotaService:MascotaService,private _router:Router,
    private _route:ActivatedRoute,private ngxService: NgxUiLoaderService,private _comunicationService:CommunicationService) { 
    this.fil = this._mascotaService.obtFiltro();
    this.filtroBSQ = this._mascotaService.obtFiltro();
    this.url = environment.apiUrl;
    this.page = 1;
  }

  ngOnInit() {
    
    this._comunicationService.perfilFundacionSelec('')
 
    //this.obtMascotas(this.page)
    this.loadPage()
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
  ngDoCheck(){

    this.filtroBSQ = this._mascotaService.obtFiltro();
    
  }
  obtMascotas(page,adding=false){
    //this.ngxService.startLoader('loader-01');
   this.pagesSelec = []
    this.mascotas = []
    this.status = 'procesando';

    this._mascotaService.getList().pipe(first()).subscribe(
      res=>{
        console.log()
        var response:any = res
        this.carga = false;
        $(".carga").fadeOut("slow");
        if(response.mascotas && response.n == '1'){
          $(".carga").fadeOut("slow");
          
          
          this.fotos = response.fot;
          this.total = response.total;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
          response.mascotas.forEach(ms => {
            var tem =  ms.fotos.filter(ph => ph.estado == 'activo' );
            this.mascotas.push({ms:ms,photo:tem[0]})
          });

          this.loading = false;
            $(".content-grid-cards").addClass('visible')

          for (let i = 1; i <= this.pages; i++) {
            this.pagesSelec.push(i)
            
          }
         
          this.itemsMSC = this.mascotas.length;
          this.advertencia = false;
          this.status ='success';
          $('.containerLoad').fadeOut('slow');
      
          //this.obtFotos(response.mascotas._id, page);
         /* if(page > this.pages){
            this._router.navigate[('/login')]
          }*/
         

        }else{
          
          console.log(response.n)
          this.status = 'error';
          this.pagesSelec = []
    this.mascotas = []
        }
      },
      error=>{
        this.pagesSelec = []
        this.mascotas = []
        this.total = 0;
        this.status = 'error';  
        this.carga = false;
        this.advertencia = true;
        this.loading = false;
        $(".carga").fadeOut("slow");
        var errorMessage = <any>error;
        console.log(errorMessage)
        this.status = 'error';
        if(errorMessage != null && error.error.n == '2'){
          this.n = error.error.n;
         
          this.mensaje = 'Lo sentimos, '+error.error.message;
        }else if(errorMessage != null && error.error.n == '3'){
          this.n = error.error.n;
         
          this.mensaje = error.error.message;
        }else{
          this.n = 'n';
          this.mensaje = 'Algo salio mal, intentalo de nuevo.'
        }
      }
    )

  }
   
  verFoto(foto){
    $('#modalComprobante').modal('show')
    this.imgCom = foto;

  }
  loadPage(){
    this.type = '';
    this.pagesSelec = []
    this._route.params.subscribe(params =>{
     
      
      let tipo = params['tipo'];
      this.type = tipo
      let page = +params['page'];
     
      console.log(tipo)
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
        //devolver listado de usuarios
        console.log(this.filtroBSQ)
        this.buscarMascotas(page)
        this.filtroBSQ.forEach(elem => {
          $(document).ready(()=>{
          if(elem.tipo == 'tam'){
            $("#tamDrop").val(elem.option)
          }
          if(elem.tipo == 'sexo'){
            $("#sexoDrop").val(elem.option)
          }
          if(elem.tipo == 'edad'){
            $("#edadDrop").val(elem.option)
          }
        })
        });
        
       
       
      }else{
        $(document).ready(()=>{
        $("#tamDrop").val('Todos')
        $("#sexoDrop").val('Todos')
        $("#edadDrop").val('Todos')
        })
        console.log("entroN")
        this.filtroBTN = false;
        //devolver listado de usuarios
        this.obtMascotas(page);
      }
    
    
    });
  }
  cancelarBus(){
   
    this.filtroBTN = false;
    localStorage.removeItem('busquedaMascotas2');
    this._router.navigate(['/home/mascotas','todos','1']);
  }

  busc(){
    this.bus = true;
  }

  buscarMascotas(page,adding=false){
    this.pagesSelec =[]
    this.mascotas = []
     console.log(this.filtroBSQ)
    this._mascotaService.filtroMascotas(this.filtroBSQ,page).subscribe(
      response=>{
        console.log(response)
        this.carga = false;
        $(".carga").fadeOut("slow");

        if(response.mascotas && response.n == '1'){
         
         
          this.advertencia = false;
          this.fotos = response.fot;
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
          this.itemsMSC = this.mascotas.length;
          this.status ='success';
          this.loading = false;
          $(".content-grid-cards").addClass('visible')
          console.log(this.mascotas)
          //this.obtFotos(response.mascotas._id, page);
          if(page > this.pages){
            this._router.navigate[('/mascotas/todos/1')]
          }
        }
      },
      error=>{
        this.pagesSelec =[]
    this.mascotas = []
        this.carga = false;
        this.total = 0;
        this.advertencia =true;
        this.loading = false;
        this.status = 'error';  
        $(".carga").fadeOut("slow");
        var errorMessage = <any>error;
       
        
        if(errorMessage != null && error.error.n == '2'){
          this.mensaje = 'Lo sentimos, '+error.error.message;
          this.mascotas = null;
        }else if(errorMessage != null && error.error.n == '5'){
          this.mensaje = 'No se ha elegigo filtros';
          this.mascotas = null;
        }
        
        else{
  
          this.n = 'n';
          
          this.mensaje = 'Algo salio mal, intentalo mas tarde'
        }
      }
    )
  }

  busqueda(){
    this.fl = true;
    var valoresTamanio = [];
    var valoresSexo = [];
    var valoresEdad = [];
    var busqueda = []
    var tam;
    var sex;
    var edad;
    $("#pills-tamanio input[type=checkbox]:checked").each(function(){
      valoresTamanio.push({
        'tam':this.value});
    });
    if(valoresTamanio.length > 0){
      tam = 'tamanio'
    }else{
      tam = 'tamanioNull';
    }
    $("#pills-sexo input[type=checkbox]:checked").each(function(){
      valoresSexo.push({
        'sex':this.value});
    });
    if(valoresSexo.length > 0){
      sex = 'sexo'
    }else{
      sex = 'sexoNull';
    }
    $("#pills-edad input[type=checkbox]:checked").each(function(){
      valoresEdad.push({
        'edad':this.value});
    });
    if(valoresEdad.length > 0){
      edad = 'edad'
    }else{
      edad = 'edadNull';
    }

    busqueda.push(valoresTamanio, valoresSexo, valoresEdad);
    
    localStorage.setItem('busquedaMascotas2', JSON.stringify(busqueda));
    
    this._router.navigate(['mascotas',tam,sex,edad]);
   this.loadPage()
    
  }

  cancelarBusqueda(){
    
  }

  filtroBSQD(option){

    
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

      localStorage.setItem('busquedaMascotas2', JSON.stringify(this.filtroBSQ));
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

      localStorage.setItem('busquedaMascotas2', JSON.stringify(this.filtroBSQ));
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
      localStorage.setItem('busquedaMascotas2', JSON.stringify(this.filtroBSQ));

    }
    if(this.type == 'busqueda'){
      this.buscarMascotas(this.page)

    }
    this._router.navigate(['/home/mascotas','busqueda','1']);
    
    

  }
  redirectMascota(nombre,name,id,idr){
    this._router.navigate(['perfil/mascota',idr,'home',nombre,id]);
    
  }
}
