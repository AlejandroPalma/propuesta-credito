import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estados } from '../modelo/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  private url: string = "https://localhost:44348/api/MstrEstados";

  constructor(private httpClient: HttpClient) { }

  getDataEstados(): Observable<Estados[]> {
    return this.httpClient.get<Estados[]>(this.url);
  }

  getDataEstadosById(_id: string) {
    let urlcom = this.url + "/" + _id;
    return this.httpClient.get<Estados>(urlcom);
  }

  postDataEstados(_body: Estados): Observable<Estados> {
    //console.log(_body);
    return this.httpClient.post<Estados>(this.url, _body);
  }

  deleteDataEstadosById(_id: string) {
    let urlcom = this.url + "/" + _id;
    console.log(urlcom);
    return this.httpClient.delete<Estados[]>(urlcom);

  }

  putDataEstados(_id: number, _body: Estados): Observable<Estados> {
    let urlcom = this.url + "/" + _id;
    return this.httpClient.put<Estados>(urlcom, _body);
  }
}
