import { Component, OnInit,DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioFundacion } from '../../../../_models/usuarioFundacion';
import { UserService, AuthenticationService,} from '../../../../_shared/services';
import { element } from 'protractor';
import {FormControl, Validators} from '@angular/forms';
import {Mail} from '../../../../_models/mail';
import { environment } from '../../../../../environments/environment'; 
import { MessagesService } from 'src/app/_shared/messages/messages.service';
declare var $: any;
@Component({
  selector: 'app-aprobar',
  templateUrl: './aprobar.component.html',
  styleUrls: ['./aprobar.component.scss'],
  providers: [UserService]
})
export class AprobarComponent implements OnInit {
  public identity;
  public token;
  public url;
  public mail:Mail;

  public aprobarC;
  public msjPer;
  public page;
  public total;
  public pages;
  public itemsPerPage;
  public fundacionesNA=[];
  public fundacion: UsuarioFundacion;
  public fundacion2: any;
  public idSolicitud;
  public idFunAD;
  public next_page;
  public prev_page;
  //variables para advertencias al cargar todas las fundaciones
  public advertencia;
  public mensaje;
  public status;
  public mensaje2;
  public carga;
  public verTodas;
  public valid;
  public pagesSelec;
  msj = new FormControl('', [Validators.required, Validators.maxLength(300),Validators.minLength(10)]);
  getErrorMessage() {
    return this.msj.hasError('required') ? 'El mensaje es requerido' :
            this.msj.hasError('maxlength') ? 'Máximo 300 caracteres':
            this.msj.hasError('minlength') ? 'Mínimo 10 caracteres':
            '';
  }
  constructor(private _route: ActivatedRoute,
    private _router: Router, private _usuarioService: UserService,private _messageService:MessagesService) {
    
    this.url = environment.apiUrl;
    this.page = 1;
    this.advertencia = false;
    this.carga = true;
    this.msjPer = false;
    this.mail = new Mail("","","","","","");
  /*  if(this.identity != null){
      if(this.identity.rol == '1'){
       this.valid == true;
       
      }else if(this.identity.rol == '4'){
        this._router.navigate(['fundacion',this.identity._id,'nosotros','all']);
      }else{
       this._router.navigate(['mascotas','todos']);
  
      }
  
    }else{
     this._router.navigate(['mascotas','todos']);
    }
*/

  }

  ngOnInit() {
    $(document).ready(()=>{
      $('input[type=checkbox]').on('change', function() {
        if ($(this).is(':checked') ) {
            console.log("Checkbox " + $(this).prop("id") +  " (" + $(this).val() + ") => Seleccionado");
        } else {
            console.log("Checkbox " + $(this).prop("id") +  " (" + $(this).val() + ") => Deseleccionado");
        }
    });
  })
  this.valid == true;
  this.loadPage();

    

  }

  loadPage() {
    this.pagesSelec = []
    this._route.params.subscribe(params => {
      let id;
      let page;
      let idSOlicitud = params['tipo'];
     console.log(idSOlicitud)


      if(idSOlicitud != 'all'){
        id = params['page'];

      }else{
        console.log("entro")
        page = +params['page'];
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
      }
     

      if(idSOlicitud != 'all' && idSOlicitud != 'fundaciones' && idSOlicitud != 'voluntarios'
      && idSOlicitud != 'ciudadanos' && idSOlicitud != 'newFundacion'){
        this.verTodas = 'no';
        this.obtFundacion(id);
        this.idSolicitud = idSOlicitud
      }else {
        this.obtFundacionesNA(this.page);
        this.verTodas = 'si';
      }



    })
  }

  obtFundacionesNA(page) {
    this.pagesSelec = []
    this.fundacionesNA = []
      this._usuarioService.obtFundacionesNa(page).subscribe(
        response => {
          

          if (response.fundacionesNA && response.n === '1') {
            this.carga = false;
            this.advertencia = false;
            this.total = response.total;
            this.pages = response.pages;
            console.log(this.pages + "AQUII")
            this.itemsPerPage = response.itemsPerPage;
            for (let i = 1; i <= this.pages; i++) {
              this.pagesSelec.push(i)
              
            }
            response.fundacionesNA.forEach(e => {
                var ff =   new Date(e.fechaFundacion);
                var fin = ff.toLocaleDateString()
                e.fechaFundacion = fin;
                this.fundacionesNA.push(e)
            
            });
            $(".fundaciones").addClass('visible')
             
            if (page > this.pages) {
              console.log("AQUIIentro")

              this._router.navigate(['admin','cuentas','all','1']);
            }
          } else {
            this.carga = false;
           // this.status = 'error';
          }
        },
        error => {
          var errorMessage = <any>error;
          this.carga = false;
          this.advertencia = true;
          this.pagesSelec = []
          this.fundacionesNA = []
          if ((errorMessage != null && error.error.n == '5') || (errorMessage != null && error.error.n == '4') || (errorMessage != null && error.error.n == '3')) {
        
            this.mensaje2 = error.error.message;
          }else if(errorMessage != null && error.error.n == '2'){
              this._router.navigate(['admin','cuentas','all','1']);
              this.mensaje2 = error.error.message;

          } 
          
          
          else {
           
            this.mensaje2 = 'Algo salio mal.'
          }
        }
      )


  }

  // Obtener datos de la mascota segun su id
  obtFundacion(id) {
      this._usuarioService.obtFundacionNa(id).subscribe(
        response => {
          console.log(response)
          if (response.n == '1') {
            
            this.carga = false;
            this.fundacion = response.fundacion;
            if(this.fundacion.estado != 0){
              this.advertencia = true;
              this.mensaje2 = "No se pudo encontrar la fundación"
             
            }else{
              console.log("AQUI * *****",this.verTodas)
              this.advertencia = false;
              $(".fundaciones").addClass('visible')
            }
          } else if (response.n === '2') {
            this.advertencia = true;
            this.mensaje2 = response.message;
            this.carga = false;
          } else {
            this.advertencia = true;
            this.carga = false;
            this.mensaje2 = 'Algo salio mal.'
          }
        },
        error => {
          var error = <any>error;
          console.log(error)
          this.carga = false;
          this.advertencia = true;
          if ((error != null && error.error.n == '6') || (error != null && error.error.n == '5') || (error != null && error.error.n == '4') || (error != null && error.error.n == '3')) {
          
            this.mensaje2 = error.error.message;
          } else {
            this.mensaje2 = 'Algo salio mal.'
          }
        }
      );
    

  }


  // activar una cuenta de fundacion

  aprobarCuenta(id) {
    this.status = 'procesando';
    this.idFunAD = id;
    this._usuarioService.aprobarFundacion(this.fundacion2, id).subscribe(
      response => {
        if (response.fundacion && response.n == '1') {

          
          var as = "APROBADMIN";
          this.mail.asunto = as;

          if(this.msjPer == false){
            this.mail.mensaje = "La cuenta de "+this.fundacion2.nombreFundacion+" ha sido aprobada exitosamente. ya puedes iniciar sesión, actualizar tus datos de perfil y comenzar a publicar en nuestra plataforma."
          }
          if(this.msjPer == true){
            this.mail.mensaje = this.msj.value;
          }
          this.mail.nombreFundacion = this.fundacion2.nombreFundacion;
          this.mail.correoFundacion = this.fundacion2.correo;
          
    this._usuarioService.enviarEmail(this.mail).subscribe(
      res=>{
        
        if(res.n == '3'){
          $('#modalPro').modal('hide')
          if(this.msjPer == true){
            $("#formMsjPer")[0].reset();
          }
          this._messageService.showSuccess('Cuenta','Se aprobó correctamente la cuenta. Se envió un correo a la fundación')
      
 
            if (this.verTodas === 'no') {
              this.status = '';
              this._router.navigate(['/admin','cuentas','all','1']);
            } else {

              this.status = '';
              this.obtFundacionesNA(this.page);

            }


      
        }else{
          this._messageService.showError('Error','No se pudo enviar el correo de notificación a la fundación')

        }

      },
      err=>{
        console.log(<any>err)
        this._messageService.showError('Error','No se pudo enviar el correo de notificación a la fundación')

      }
    )
        } else {
          this._messageService.showError('Error','No se pudo procesar el registro')

        }
      },
      error => {
        var error2 = <any>error;
        console.log(error)
        this.status = 'error';
        if ((error2 != null && error2.error.n == '5') || (error2 != null && error2.error.n == '4') || (error2 != null && error2.error.n == '3') || (error2 != null && error2.error.n == '2')) {
          this.mensaje2 = error2.error.message;
          
          this._messageService.showError('Error',this.mensaje2)

        } else {
          this._messageService.showError('Error',this.mensaje2)
        }
      }
    )

  }
  desaprobarCuenta(id,fund) {
    this.status = 'procesando';
    this.idFunAD = id;
    console.log(this.idSolicitud)
    this._usuarioService.desaprobarFundacion(id).subscribe(
      response => {
        if (response.n == '1') {



          var as = "APROBADMIN";
          this.mail.asunto = as;

          if(this.msjPer == false){
            this.mail.mensaje = "La cuenta de "+fund.nombreFundacion+" ha sido aprobada exitosamente. ya puedes iniciar sesión, actualizar tus datos de perfil y comenzar a publicar en nuestra plataforma."
          }
          if(this.msjPer == true){
            this.mail.idFundacion = this.msj.value;
          }
          this.mail.nombreFundacion = fund.nombreFundacion;
          this.mail.correoFundacion = fund.correo;
    this._usuarioService.enviarEmail(this.mail).subscribe(
      res=>{
        
        if(res.n == '3'){

          
            //$("formMSJ")[0].reset();
            $('#modalPro').modal('hide')
           this.msj.setValue("")
            this._messageService.showSuccess('Cuenta','Se desaprobó correctamente la cuenta')

          setTimeout(() => {
            if (this.verTodas == 'no') {
              this.status = '';
              this._router.navigate(['/admin','cuentas','all','1']);
            } else {
              this.status = '';
              this.obtFundacionesNA(1);

            }


          }, 1000);

      
        }else{
          this._messageService.showError('Error','No se pudo enviar el correo de notificación a la fundación')

        }

      },
      err=>{
        this._messageService.showError('Error','No se pudo enviar el correo de notificación a la fundación')

      }
    )
        
        } else {

          this.status = 'error';
          this.mensaje = 'Algo salió mal, intentalo mas tarde.'
          this._messageService.showError('Error',this.mensaje)

        }

      },
      error => {
        var error2 = <any>error;
        console.log(error)
    
        if ((error2 != null && error2.error.n == '7') || (error2 != null && error2.error.n == '6') || (error2 != null && error2.error.n == '5') || (error2 != null && error2.error.n == '4') || (error2 != null && error2.error.n == '3') || (error2 != null && error2.error.n == '2')) {
          this.mensaje = error2.error.message;
          this._messageService.showError('Error',this.mensaje)

        } else {

          this.mensaje = 'Algo salió mal, intentalo mas tarde.'
          this._messageService.showError('Error',this.mensaje)

        }
      }
    )

  }


  // fundaciones a cargar al iniciar la plantilla

  //ver todas las fundaciones por aprobar cuenta
  verTodasFundaciones() {
    this._router.navigate(['/admin','cuentas','all','1']);
  }
  validarMsj(){
    if ($('#exampleRadios1').prop('checked') ) {
      this.msjPer = false;
      $("#formMsjPer").fadeOut("fast")

  }
  if ($('#personalizado').prop('checked') ) {
    this.msjPer = true;
    
    $("#formMsjPer").fadeIn("fast")
}

  }
  procesoCuenta(op,user){
    console.log(user)
    this.fundacion2 = new UsuarioFundacion("","","","","","","","","","","","","","","","","","","","","","","",0,"");
    if(op == 'yes'){
      this.fundacion2 = user;
      this.aprobarC = true;
      $('#modalPro').modal('show')
    }else{
      this.fundacion2 = user;
      this.aprobarC = false;
      $('#modalPro').modal('show')
    }
    
  }
  enviarMail(){
    
  }
}
