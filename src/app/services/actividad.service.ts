import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actividades } from '../modelo/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  private urlAPI: string = "http://10.1.5.192:84/api/MstrActividades";
  private url: string = "https://localhost:44348/api/MstrActividades";

  constructor(private httpClient: HttpClient) { }

  getDataActividades(): Observable<Actividades[]> {
    return this.httpClient.get<Actividades[]>(this.url);
  }

  getDataActividadesById(_id: string) {
    let urlcom = this.url + "/" + _id;
    return this.httpClient.get<Actividades>(urlcom);
  }

  postDataActividades(_body: Actividades): Observable<Actividades> {
    //console.log(_body);
    return this.httpClient.post<Actividades>(this.url, _body);
  }

  deleteDataActividadesById(_id: string) {
    let urlcom = this.url + "/" + _id;
    console.log(urlcom);
    return this.httpClient.delete<Actividades[]>(urlcom);

  }

  putDataActividades(_id: number, _body: Actividades): Observable<Actividades> {
    let urlcom = this.url + "/" + _id;
    return this.httpClient.put<Actividades>(urlcom, _body);
  }
}
