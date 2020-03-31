import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User } from '../../_models';
import { Observable } from 'rxjs';
import { UsuarioFundacion } from 'src/app/_models/usuarioFundacion';

@Injectable({ providedIn: 'root' })
export class UserService {
    public filtro
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    obtFiltro(){
        let filtro = JSON.parse(localStorage.getItem('busquedaFundacionesSC')); 
        
        if(filtro != "undefined"){
            this.filtro = filtro;
        }else{
            this.filtro = null;
        }
      
        return this.filtro;
      }
      obtFundacionesByNombre(nombre):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
      
        return this.http.get(environment.apiUrl+'fundaciones-bynombre/'+nombre,{headers:headers});
      }
      obtUsuariosRol(page=null,rol):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
      
        return this.http.get(environment.apiUrl+'obtener-usuarios-rol/'+rol+'/'+page,{headers:headers});
      }
      filtroFundaciones(filtro:any,page = 1):Observable<any>{
        let params = JSON.stringify(filtro);
        let headers = new HttpHeaders().set('Content-Type','application/json');
      
        return this.http.post(environment.apiUrl+'filtro-fundaciones/'+page, params,{headers:headers});
      }
      obtUsuariosByApellidos(apellidos):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json')
      
        return this.http.get(environment.apiUrl+'usuarios-byapellidos/'+apellidos,{headers:headers});
      }
      obtUsuario(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
      
        return this.http.get(environment.apiUrl+'usuario/'+id,{headers:headers});
      }
      obtVoluntariosNP(rol):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json')
        return this.http.get(environment.apiUrl+'obtener-voluntariosNP/'+rol,{headers:headers});
      }
      actualizarUsuario(usuario,id):Observable<any>{
        let params = JSON.stringify(usuario);
        let headers = new HttpHeaders().set('Content-Type','application/json')

        return this.http.put(environment.apiUrl+'actualizar-usuario/'+id,params,{headers:headers});
    }
    actualizarUsuarioCiudadano(usuario,id):Observable<any>{
      let params = JSON.stringify(usuario);
      let headers = new HttpHeaders().set('Content-Type','application/json')

      return this.http.put(environment.apiUrl+'actualizar-usuarioCiudadano/'+id,params,{headers:headers});
  }
    validarCorreoF(usuario:any):Observable<any>{
      let params = JSON.stringify(usuario);
      let headers = new HttpHeaders().set('Content-Type','application/json');
      return this.http.post(environment.apiUrl+'validar-correoF', params, {headers:headers});
      
    }
    validarNombreF(usuario:UsuarioFundacion):Observable<any>{
      let params = JSON.stringify(usuario);
      let headers = new HttpHeaders().set('Content-Type','application/json');
      return this.http.post(environment.apiUrl+'validar-nombreF', params, {headers:headers});
      
    }
    eliminarLogo(id,file,tipo):Observable<any>{
      let headers = new HttpHeaders().set('Content-Type','application/json');
      return this.http.delete(environment.apiUrl+'eliminar-logo/'+id+'/'+file+'/'+tipo, {headers:headers});
      
    }
    cambiarPss(usuario,id):Observable<any>{
      let params = JSON.stringify(usuario);
      let headers = new HttpHeaders().set('Content-Type','application/json');
      return this.http.post(environment.apiUrl+'cambiar-pass/'+id, params, {headers:headers});
      
    }
    obtUsuariosRolSP(rol):Observable<any>{
       let headers = new HttpHeaders().set('Content-Type','application/json')
     
       return this.http.get(environment.apiUrl+'usuariosSP/'+rol,{headers:headers});
     }
     eliminarFundacion(id):Observable<any>{
      let headers = new HttpHeaders().set('Content-Type','application/json')
      return this.http.delete(environment.apiUrl+'eliminar-fundacion/'+id, {headers:headers});
      
    }
    activarFundacion(id):Observable<any>{
      let headers = new HttpHeaders().set('Content-Type','application/json')
      return this.http.put(environment.apiUrl+'activar-fundacion/'+id, {headers:headers});
      
    }
    eliminarCiudadano(id):Observable<any>{
      let headers = new HttpHeaders().set('Content-Type','application/json')
      return this.http.delete(environment.apiUrl+'eliminar-ciudadano/'+id, {headers:headers});
      
    }
     //fundaciones no aprobadas
 obtFundacionesNa(page=1):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json')
  return this.http.get(environment.apiUrl+'obtener-fundaciones-na/'+page, {headers:headers});
}
obtFundacionNa(id):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json')
  return this.http.get(environment.apiUrl+'obtener-fundacion-na/'+id, {headers:headers});
}
aprobarFundacion( usuario:UsuarioFundacion,id):Observable<any>{
  let params = JSON.stringify(usuario);
  let headers = new HttpHeaders().set('Content-Type','application/json')
  
  return this.http.put(environment.apiUrl+'aprobar-fundacion/'+id,params,{headers:headers});
}
enviarEmail(form):Observable<any>{
  let params = JSON.stringify(form);
  let headers = new HttpHeaders().set('Content-Type','application/json');
  return this.http.post(environment.apiUrl+'enviar', params, {headers:headers});
  
}
desaprobarFundacion(id):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json')
  return this.http.delete(environment.apiUrl+'desaprobar-fundacion/'+id, {headers:headers});
  
}
validarUsuarioF(usuario:UsuarioFundacion):Observable<any>{
  let params = JSON.stringify(usuario);
  let headers = new HttpHeaders().set('Content-Type','application/json');
  return this.http.post(environment.apiUrl+'validar-usuarioF', params, {headers:headers});
  
}
registerFundacion(usuario:UsuarioFundacion,type):Observable<any>{
  let params = JSON.stringify(usuario);
  let headers = new HttpHeaders().set('Content-Type','application/json');
  return this.http.post(environment.apiUrl+'registrarFundacion/'+type, params, {headers:headers});
  
}
obtUsuarioCorreo(usuario):Observable<any>{
  let params = JSON.stringify(usuario);
  let headers = new HttpHeaders().set('Content-Type','application/json');
  return this.http.post(environment.apiUrl+'obtener-usuario-em', params, {headers:headers});
  
  
}
enviarCodigoRecover(usuario:UsuarioFundacion,id):Observable<any>{
  let params = JSON.stringify(usuario);
  let headers = new HttpHeaders().set('Content-Type','application/json');
  return this.http.post(environment.apiUrl+'enviar-codigo-recover/'+id, params, {headers:headers});
  
}
verificarCodigo(correo,cd,tipo):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json');
  return this.http.get(environment.apiUrl+'verificar-codigo/'+correo+'/'+cd+'/'+tipo, {headers:headers});
}
eliminarCodigo(id):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json');
  return this.http.delete(environment.apiUrl+'eliminar-codigo/'+id, {headers:headers});
  
}
}