import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ServiciosService {
  private service = 'Servicios';

  constructor(private http: HttpClient) {}

  VerServiciosProximos(): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/${this.service}/ver-servicios-proximos`);
  }

  GetServiciosDisponibles(estadoId?:any, municipioId?:any): Observable<any> {

    let params = new HttpParams();

      if (estadoId) {
        params = params.set('EstadoId', estadoId);
      }
  
      if (municipioId) {
        params = params.set('MunicipioId', municipioId);
      }

    return this.http.get<any>(`${environment.apiBaseUrl}/${this.service}/ver-servicios-disponibles`,{params});
  }

  EnviarCotizacion(request:any): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/${this.service}/enviar-cotizacion`, request);
  }

  EliminarCotizacion(request:any): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/${this.service}/eliminar-cotizacion`, request);
  }
}
