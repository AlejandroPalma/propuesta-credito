import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reglas } from '../modelo/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class ReglaexposicionService {

  private url: string = "https://localhost:44348/api/ReglasExposicion";

  constructor(private httpClient: HttpClient) {}

  getDataReglas(): Observable<Reglas[]> {
    return this.httpClient.get<Reglas[]>(this.url);
  }

  getDataReglasById(_id: string) {
    let urlcom = this.url + "/" + _id;
    return this.httpClient.get<Reglas>(urlcom);
  }

  postDataReglas(_body: Reglas): Observable<Reglas> {
    //console.log(_body);
    return this.httpClient.post<Reglas>(this.url, _body);
  }

  deleteDataReglasById(_id: string) {
    let urlcom = this.url + "/" + _id;
    console.log(urlcom);
    return this.httpClient.delete<Reglas[]>(urlcom);

  }

  putDataReglas(_id: number, _body: Reglas): Observable<Reglas> {
    let urlcom = this.url + "/" + _id;
    return this.httpClient.put<Reglas>(urlcom, _body);
  }

}
