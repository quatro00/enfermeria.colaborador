import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  service:string = 'Public';


  constructor(private http:HttpClient) { }

  CrearMensaje(request:any):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/${this.service}/CrearMensaje`,request);
  }
 
}