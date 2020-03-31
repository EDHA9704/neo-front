import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User } from '../../_models';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient,private _router:Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('identity')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(usuario, gettoken = null) {
        if(gettoken != null){
            usuario.gettoken = gettoken;
      
          }
        let params = usuario;
        console.log(params)
        return this.http.post<any>(`${environment.apiUrl}login`,  params)
            .pipe(map(user => {
                console.log(user)
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('identity', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }
    validarUsuarioF(usuario:any):Observable<any>{
        let params = JSON.stringify(usuario);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this.http.post(`${environment.apiUrl}validar-usuarioF`, params, {headers:headers});
        
      }
      enviarEmail(form):Observable<any>{
        let params = JSON.stringify(form);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this.http.post(`${environment.apiUrl}enviar`, params, {headers:headers});
        
      }
      verificarCodigo(correo,cd,tipo):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this.http.get(`${environment.apiUrl}verificar-codigo/${correo}/${cd}/${tipo}`, {headers:headers});
      }
      registerFundacion(usuario:any,type):Observable<any>{
        let params = JSON.stringify(usuario);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this.http.post(`${environment.apiUrl}registrarFundacion/${type}`, params, {headers:headers});
        
      }
      borrarUsuario(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this.http.delete(`${environment.apiUrl}borrar-usuario/${id}`, {headers:headers});
        
      }
      eliminarCodigo(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this.http.delete(`${environment.apiUrl}eliminar-codigo/${id}`, {headers:headers});
        
      }
    logout() {
        // remove user from local storage to log user out
        
        localStorage.removeItem('identity');

        this.currentUserSubject.next(null);
        this._router.navigate(['/autenticacion']);
    }



}