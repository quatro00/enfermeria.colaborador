import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CatalogosService {
  private service = 'Catalogos';

  constructor(private http: HttpClient) {}

  GetEstados(): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/${this.service}/estados`);
  }

  GetMunicipios(): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/${this.service}/municipios`);
  }

}
