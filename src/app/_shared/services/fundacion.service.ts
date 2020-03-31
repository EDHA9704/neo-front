import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PortadaFundacion } from 'src/app/_models/portadaFundacion';
import { Historia } from 'src/app/_models/historia';
import { UsuarioVoluntario } from 'src/app/_models/usuarioVoluntario';
@Injectable({
  providedIn: 'root'
})
export class FundacionService {
  public url
  constructor(private _http: HttpClient) { 
    this.url = environment.apiUrl
  }

  
 obtPortadasFundacion(id):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json');

  return this._http.get(environment.apiUrl+'obtener-portadas-fundacion/'+id, {headers:headers});
}

registerPortada(portada:PortadaFundacion,id):Observable<any>{
  let params = JSON.stringify(portada);
  let headers = new HttpHeaders().set('Content-Type','application/json')
  return this._http.post(environment.apiUrl+'registrar-portada/'+id, params, {headers:headers});
  
}
borrarPortada(id):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json');
  return this._http.delete(environment.apiUrl+'borrar-portada/'+id, {headers:headers});
  
}

registerHistoria(historia:Historia,id):Observable<any>{
  let params = JSON.stringify(historia);
  let headers = new HttpHeaders().set('Content-Type','application/json')
  return this._http.post(environment.apiUrl+'nueva-historia/'+id, params, {headers:headers});
  
}

obtHistoriasFundacion(id):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json');

  return this._http.get(environment.apiUrl+'obtener-historias/'+id, {headers:headers});
}
eliminarHistoria(id,image):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json');
  return this._http.delete(environment.apiUrl+'eliminar-historia/'+id+'/'+image, {headers:headers});
  
}
eliminarLogo(id,file,tipo):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json');
  return this._http.delete(environment.apiUrl+'eliminar-logo/'+id+'/'+file+'/'+tipo, {headers:headers});
  
}
obtVoluntariosByApellidos(apellidos,id):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json');

  return this._http.get(this.url+'voluntarios-byapellidos/'+apellidos+'/'+id,{headers:headers});
}
 obtVoluntarios(page=null,rol):Observable<any>{
   let headers = new HttpHeaders().set('Content-Type','application/json')
   return this._http.get(this.url+'obtener-voluntarios/'+rol+'/'+page,{headers:headers});
 }
 validarUsuarioV(usuario:any):Observable<any>{
  let params = JSON.stringify(usuario);
  let headers = new HttpHeaders().set('Content-Type','application/json');
  return this._http.post(this.url+'validar-usuarioV', params, {headers:headers});
  
}
validarCorreoF(usuario:any):Observable<any>{
  let params = JSON.stringify(usuario);
  let headers = new HttpHeaders().set('Content-Type','application/json');
  return this._http.post(this.url+'validar-correoF', params, {headers:headers});
  
}
actualizarUsuario2(usuario:UsuarioVoluntario,id):Observable<any>{
  let params = JSON.stringify(usuario);
  let headers = new HttpHeaders().set('Content-Type','application/json')
  
  return this._http.put(this.url+'actualizar-usuario/'+id,params,{headers:headers});
}
registerVoluntario(usuario:UsuarioVoluntario):Observable<any>{
  let params = JSON.stringify(usuario);
  let headers = new HttpHeaders().set('Content-Type','application/json')
  return this._http.post(this.url+'registrarVoluntario', params, {headers:headers});
}
eliminarVoluntarioEstado(usuario:UsuarioVoluntario,id):Observable<any>{
  let params = JSON.stringify(usuario);
  let headers = new HttpHeaders().set('Content-Type','application/json')
  
  return this._http.put(this.url+'eliminar-voluntario-estado/'+id,params,{headers:headers});
}
activarVoluntarioEstado(usuario:UsuarioVoluntario,id):Observable<any>{
  let params = JSON.stringify(usuario);
  let headers = new HttpHeaders().set('Content-Type','application/json')
  
  return this._http.put(this.url+'activar-voluntario-estado/'+id,params,{headers:headers});
}
borrarUsuario(id):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json');
  return this._http.delete(this.url+'borrar-usuario/'+id, {headers:headers});
  
}
validarCedulaE(usuario:any):Observable<any>{
  let params = JSON.stringify(usuario);
  let headers = new HttpHeaders().set('Content-Type','application/json');
  return this._http.post(this.url+'validar-cedula', params, {headers:headers});
  
}
}
