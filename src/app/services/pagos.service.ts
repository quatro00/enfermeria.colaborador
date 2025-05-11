import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PagosService {
  private service = 'Pagos';

  constructor(private http: HttpClient) { }

  GetPagos(periodo: string): Observable<any> {
    let params = new HttpParams().set('periodo', periodo);
    return this.http.get<any>(`${environment.apiBaseUrl}/${this.service}/ver-pagos`, { params });
  }

  GetGraficaPagos(): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/${this.service}/ver-grafica-pagos`);
  }

}
