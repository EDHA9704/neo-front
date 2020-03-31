import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  public url:string;
  constructor(private http: HttpClient) {
    this.url =environment.apiUrl;
   }
   makeGileRequest(url:string, params:Array<string>, files:Array<File>, name:string){
    return new Promise(function(resolve, reject){
        var formData: any = new FormData();
        var xhr = new XMLHttpRequest();

        for(var i = 0; i<files.length; i++){
            formData.append(name,files[i], files[i].name);

        }

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    resolve(JSON.parse(xhr.response));

                }else{
                    reject(xhr.response);
                }
            }
        }

        xhr.open('POST', url, true);
       // xhr.setRequestHeader('Authorization', token);
        xhr.send(formData);
    });
}
makeGileRequest2(url:string, params:Array<string>, files:Array<File>, name:string){
  return new Promise(function(resolve, reject){
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      for(var i = 0; i<files.length; i++){
          formData.append(name,files[i], files[i].name);

      }

      xhr.onreadystatechange = function(){
          if(xhr.readyState == 4){
              if(xhr.status == 200){
                  resolve(JSON.parse(xhr.response));

              }else{
                  reject(xhr.response);
              }
          }
      }

      xhr.open('POST', url, true);
      
      xhr.send(formData);
  });
}

imageUpload(imageForm: FormData,path,id) {
    console.log('image uploading');
    return this.http.post(this.url+path+id, 
    imageForm);
   }
}

