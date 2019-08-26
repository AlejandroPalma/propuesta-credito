import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurvaLibor } from '../modelo/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class CurvaliborService {

  private url: string = "https://localhost:44348/api/CurvaLibor";

  constructor(private httpClient: HttpClient) {}

  getDataCurvaLibor(): Observable<CurvaLibor[]> {
    return this.httpClient.get<CurvaLibor[]>(this.url);
  }

  getDataEstadosById(_id: string) {
    let urlcom = this.url + "/" + _id;
    return this.httpClient.get<CurvaLibor>(urlcom);
  }

  postDataCurvaLibor(_body: CurvaLibor): Observable<CurvaLibor> {
    //console.log(_body);
    return this.httpClient.post<CurvaLibor>(this.url, _body);
  }

  deleteDataCurvaLiborById(_id: string) {
    let urlcom = this.url + "/" + _id;
    console.log(urlcom);
    return this.httpClient.delete<CurvaLibor[]>(urlcom);

  }

  putDataCurvaLibor(_id: number, _body: CurvaLibor): Observable<CurvaLibor> {
    let urlcom = this.url + "/" + _id;
    return this.httpClient.put<CurvaLibor>(urlcom, _body);
  }
}
