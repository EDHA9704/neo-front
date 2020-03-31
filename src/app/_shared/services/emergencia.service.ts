import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Emergencia} from '../../_models/emergencia';
import {environment} from '../../../environments/environment';
import {FiltroEmer} from '../../_models/filtroEmergencias';
@Injectable({
  providedIn: 'root'
})
export class EmergenciaService {
  public url:string;
  public filtro;
  constructor(public _http:HttpClient) { 
    this.url = environment.apiUrl;
  }

  registerEmergencia(emergencia:Emergencia, token):Observable<any>{
    let params = JSON.stringify(emergencia);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization',token);
    return this._http.post(this.url+'nueva-emergencia', params, {headers:headers});
    
  }

  
obtEmergencias(page=1):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json');

  return this._http.get(this.url+'obtener-emergencias/'+page, {headers:headers});
}

obtEmergencia(id):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json');

  return this._http.get(this.url+'obtener-emergencia/'+id, {headers:headers});
}
marcarAtentida( fid,eid,rol):Observable<any>{
  //let params = JSON.stringify(emergencia);
  let headers = new HttpHeaders().set('Content-Type','application/json')

  return this._http.put(this.url+'marcar-atentida-emergencia/'+fid+'/'+eid+'/'+rol,{},{headers:headers});
}
negarEmergencia( body,id,rol):Observable<any>{
 // let params = JSON.stringify(emergencia);
  let headers = new HttpHeaders().set('Content-Type','application/json')

  return this._http.put(this.url+'negarEmergencia/'+id+'/'+rol,body,{headers:headers});
}
aprobarEmergencia( body,id,rol):Observable<any>{
  // let params = JSON.stringify(emergencia);
   let headers = new HttpHeaders().set('Content-Type','application/json')
 
   return this._http.put(this.url+'aprobarEmergencia/'+id+'/'+rol,body,{headers:headers});
 }
nuevaAyuda( emergencia:Emergencia,eid,rol):Observable<any>{
  let params = JSON.stringify(emergencia);
  let headers = new HttpHeaders().set('Content-Type','application/json')
  
  return this._http.put(this.url+'nueva-ayuda/'+eid+'/'+rol,params,{headers:headers});
}

filtroEmergencias(filtro:any,page = 1):Observable<any>{
  let params = JSON.stringify(filtro);
  let headers = new HttpHeaders().set('Content-Type','application/json');

  return this._http.post(this.url+'filtro-emergencias/'+page, params,{headers:headers});
}

obtFiltro(){
  let filtro = JSON.parse(localStorage.getItem('busquedaEmergencias2')); 
  
  if(filtro != "undefined"){
      this.filtro = filtro;
  }else{
      this.filtro = null;
  }

  return this.filtro;
}
eliminarVoluntarioEmer(id, idv):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json')
  return this._http.put(this.url+'eliminarVolunEmergencia/'+id+'/'+idv,{headers:headers});
}
reasignarVoluntarioEmer(id):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json')
  return this._http.put(this.url+'reasignarVolunEmergencia/'+id,{headers:headers});
}
anadirVoluntarioEmer(body,id):Observable<any>{
    
  let headers = new HttpHeaders().set('Content-Type','application/json')
  return this._http.put(this.url+'anadirVolunEmergencia/'+id,body,{headers:headers});
}
}
