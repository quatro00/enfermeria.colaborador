import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ServiciosService {
  private service = 'Servicios';

  constructor(private http: HttpClient) {}

  VerServiciosProximos(): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/${this.service}/ver-servicios-proximos`);
  }
}
