
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Notificacion} from '../../_models/notificacion';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  public url:string;
  public identity;
  public token;
  constructor(public _http:HttpClient) { 

    this.url = environment.apiUrl;
  }
  changeEstado(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
  
    return this._http.put(this.url+'changeEstadoNotiMB/'+id,{},{headers:headers});
  }
  registerNotificacion(notificacion:Notificacion,tipo):Observable<any>{
    let params = JSON.stringify(notificacion);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'nueva-notificacion/'+tipo, params, {headers:headers});
    
  }
  obtNotificaciones(page = 1,tipo):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')

    return this._http.get(this.url+'obtener-notificaciones/'+page+'/'+tipo, {headers:headers});
  }
  obtALLNotificaciones(page = 1):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')

    return this._http.get(this.url+'obtener-todas-notificaciones/'+page, {headers:headers});
  }
  obtALLNotificacionesCount():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')

    return this._http.get(this.url+'obtener-todas-notificacionesCount', {headers:headers});
  }
  obtALLNotificacionesAD(page = 1):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')

    return this._http.get(this.url+'obtener-todas-notificacionesAD/'+page, {headers:headers});
  }
  obtALLNotificacionesADCount():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')

    return this._http.get(this.url+'obtener-todas-notificacionesADCount', {headers:headers});
  }
  nuevaOneSignal(device):Observable<any>{

    let params = JSON.stringify(device);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'nueva-onesignal', params, {headers:headers});

  }
  eliminarOneSignal(id,ido):Observable<any>{

    //let params = JSON.stringify(device);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url+'eliminar-onesignal/'+id+'/'+ido, {headers:headers});

  }
}
