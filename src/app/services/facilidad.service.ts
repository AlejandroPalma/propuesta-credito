import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facilidades } from '../modelo/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class FacilidadService {

  private url: string = "https://localhost:44348/api/Facilidades";

  constructor(private httpClient: HttpClient) { }

  getDataGeneralesProp(): Observable<Facilidades[]> {
    return this.httpClient.get<Facilidades[]>(this.url);
  }

  getDataFacilidadesById(_id: string) {
    let urlcom = this.url + "/" + _id;
    return this.httpClient.get<Facilidades[]>(urlcom);
  }

  postDataFacilidades(_body: Facilidades): Observable<Facilidades> {
    return this.httpClient.post<Facilidades>(this.url, _body);
  }

  deleteDataFacilidadesById(_id: string) {
    let urlcom = this.url + "/" + _id;
    console.log(urlcom);
    return this.httpClient.delete<Facilidades[]>(urlcom);

  }

  putDataFacilidades(_id: string, _body: Facilidades): Observable<Facilidades> {
    console.log("Entro al put de la facilidad");
    let urlcom = this.url + "/" + _id;
    return this.httpClient.put<Facilidades>(urlcom, _body);
  }
}
