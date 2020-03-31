import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Donacion} from '../../_models/donacion';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DonacionService {
  public url:string;
  public filtro
  constructor(public _http:HttpClient) { 
    this.url = environment.apiUrl;
  }

  registerDonacion(donacion:Donacion,tipo):Observable<any>{
    console.log(tipo)
    let params = JSON.stringify(donacion);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  
    return this._http.post(this.url+'nueva-donacion/'+tipo, params, {headers:headers});
    
  }

  obtDonaciones(id,page=1):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')

    return this._http.get(this.url+'obtener-donaciones/'+id+'/'+page, {headers:headers});
  }

  obtDonacion(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.get(this.url+'obtener-donacion/'+id, {headers:headers});
  }
  aprobarDonacion( body,idD, idF,tipo,rol):Observable<any>{
    //let params = JSON.stringify(donacion);
    let headers = new HttpHeaders().set('Content-Type','application/json')
    return this._http.put(this.url+'aprobar-donacion/'+idD+'/'+idF+'/'+tipo+'/'+rol,body,{headers:headers});
  }
  asignarDonacion( donacion:Donacion,idD, idF,tipo,rol):Observable<any>{
    let params = JSON.stringify(donacion);
    let headers = new HttpHeaders().set('Content-Type','application/json')
    return this._http.put(this.url+'aprobar-donacion/'+idD+'/'+idF+'/'+tipo+'/'+rol,params,{headers:headers});
  }
  aprobarDonacionProductoVl(body,idD, idF,token,rol):Observable<any>{
    console.log(idD)
    //let params = JSON.stringify(donacion);
    let headers = new HttpHeaders().set('Content-Type','application/json')
    return this._http.put(this.url+'aprobarDonacionPorductoVl/'+idD+'/'+idF+'/'+rol,body,{headers:headers});
  }

  negarDonacion( body,idD, idF,rol):Observable<any>{
    //let params = JSON.stringify(donacion);
    let headers = new HttpHeaders().set('Content-Type','application/json')
    return this._http.put(this.url+'negar-donacion/'+idD+'/'+idF+'/'+rol,body,{headers:headers});
  }
  eliminarVoluntarioDona(id, idv):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
    return this._http.put(this.url+'eliminarVolunDonacion/'+id+'/'+idv,{headers:headers});
  }
  reasignarVoluntarioDona(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
    return this._http.put(this.url+'reasignarVolunDonacion/'+id,{headers:headers});
  }
  anadirVoluntarioDona(body,id):Observable<any>{
    
    let headers = new HttpHeaders().set('Content-Type','application/json')
    return this._http.put(this.url+'anadirVolunDonacion/'+id,body,{headers:headers});
  }
  filtroDonaciones(id,filtro:any,page = 1):Observable<any>{
    let params = JSON.stringify(filtro);
    let headers = new HttpHeaders().set('Content-Type','application/json');
  
    return this._http.post(this.url+'filtro-donacion/'+id+'/'+page, params,{headers:headers});
  }
  obtFiltroDonacion(){
    let filtro = JSON.parse(localStorage.getItem('busquedaDonaciones')); 
    
    if(filtro != "undefined"){
        this.filtro = filtro;
    }else{
        this.filtro = null;
    }
  
    return this.filtro;
  }
}
