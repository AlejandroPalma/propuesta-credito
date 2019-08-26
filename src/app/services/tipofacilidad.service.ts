import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoFacilidades } from '../modelo/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class TipofacilidadService {

  private url: string = "https://localhost:44348/api/MstrTipoFacilidades";

  constructor(private httpClient: HttpClient) {}

  getDataTipoFacilidades(): Observable<TipoFacilidades[]> {
    return this.httpClient.get<TipoFacilidades[]>(this.url);
  }

  getDataTipoFacilidadesById(_id: string) {
    let urlcom = this.url + "/" + _id;
    return this.httpClient.get<TipoFacilidades>(urlcom);
  }

  postDataTipoFacilidades(_body: TipoFacilidades): Observable<TipoFacilidades> {
    //console.log(_body);
    return this.httpClient.post<TipoFacilidades>(this.url, _body);
  }

  deleteDataTipoFacilidadesById(_id: string) {
    let urlcom = this.url + "/" + _id;
    console.log(urlcom);
    return this.httpClient.delete<TipoFacilidades[]>(urlcom);

  }

  putDataTipoFacilidades(_id: number, _body: TipoFacilidades): Observable<TipoFacilidades> {
    let urlcom = this.url + "/" + _id;
    return this.httpClient.put<TipoFacilidades>(urlcom, _body);
  }
}
