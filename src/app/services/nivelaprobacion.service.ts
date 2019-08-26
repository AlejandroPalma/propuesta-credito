import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NivelAprobaciones } from '../modelo/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class NivelaprobacionService {

  private url: string = "https://localhost:44348/api/MstrNivelAprobaciones";

  constructor(private httpClient: HttpClient) {}

  getDataNivelAprobaciones(): Observable<NivelAprobaciones[]> {
    return this.httpClient.get<NivelAprobaciones[]>(this.url);
  }

  getDataNivelAprobacionesById(_id: string) {
    let urlcom = this.url + "/" + _id;
    return this.httpClient.get<NivelAprobaciones>(urlcom);
  }

  postDataNivelAprobaciones(_body: NivelAprobaciones): Observable<NivelAprobaciones> {
    //console.log(_body);
    return this.httpClient.post<NivelAprobaciones>(this.url, _body);
  }

  deleteDataNivelAprobacionesById(_id: string) {
    let urlcom = this.url + "/" + _id;
    console.log(urlcom);
    return this.httpClient.delete<NivelAprobaciones[]>(urlcom);

  }

  putDataNivelAprobaciones(_id: number, _body: NivelAprobaciones): Observable<NivelAprobaciones> {
    let urlcom = this.url + "/" + _id;
    return this.httpClient.put<NivelAprobaciones>(urlcom, _body);
  }
}
