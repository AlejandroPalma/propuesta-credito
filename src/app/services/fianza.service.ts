import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetalleFianza, Garantia, Fianza } from '../modelo/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class FianzaService {
  private url01: string = "https://localhost:44348/api/DetalleFianzas";
  private url02: string = "https://localhost:44348/api/MstrFianzas";

  // private urlD01: string = "api/DeleteDetallePropositoPorFacilidad?id=";
  // private urlP: string = "https://localhost:44348/api/MstrPropositos";

  constructor(private httpClient: HttpClient) { }

  getDataDetalleFianzas(): Observable<DetalleFianza[]> {
    return this.httpClient.get<DetalleFianza[]>(this.url01);
  }

  getDataFianzas(): Observable<Fianza[]> {
    return this.httpClient.get<Fianza[]>(this.url02);
  }

  getDataDetalleFianzasById(_id: string): Observable<DetalleFianza[]> {
    let urlcom = this.url01 + "/" + _id;
    return this.httpClient.get<DetalleFianza[]>(urlcom);
  }

  postDataDetalleFianzas(_body: DetalleFianza): Observable<DetalleFianza> {
    return this.httpClient.post<DetalleFianza>(this.url01, _body);
  }

  putDataDetalleFianzas(_id: string, _body: DetalleFianza): Observable<DetalleFianza> {
    let urlcom = this.url01 + "/" + _id;
    return this.httpClient.put<DetalleFianza>(urlcom, _body);
  }

  deleteDataDetalleFianzasById(_id: string): Observable<any> {
    let urlcom = this.url01 + "/" + _id;
    return this.httpClient.delete<any>(urlcom);
  }
}
