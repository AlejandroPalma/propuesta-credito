import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetalleProposito, Proposito, DetalleGarantia, Garantia } from '../modelo/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class GarantiaService {
  private url01: string = "https://localhost:44348/api/DetalleGarantias";
  private url02: string = "https://localhost:44348/api/MstrGarantias";

  constructor(private httpClient: HttpClient) { }

  getDataDetalleGarantias(): Observable<DetalleGarantia[]> {
    return this.httpClient.get<DetalleGarantia[]>(this.url01);
  }

  getDataGarantias(): Observable<Garantia[]> {
    return this.httpClient.get<Garantia[]>(this.url02);
  }

  getDataDetalleGarantiasById(_id: string): Observable<DetalleGarantia[]> {
    let urlcom = this.url01 + "/" + _id;
    return this.httpClient.get<DetalleGarantia[]>(urlcom);
  }

  postDataDetalleGarantias(_body: DetalleGarantia): Observable<DetalleGarantia> {
    return this.httpClient.post<DetalleGarantia>(this.url01, _body);
  }

  putDataDetalleGarantias(_id: string, _body: DetalleGarantia): Observable<DetalleGarantia> {
    let urlcom = this.url01 + "/" + _id;
    return this.httpClient.put<DetalleGarantia>(urlcom, _body);
  }

  deleteDataDetalleGarantiasById(_id: string): Observable<any> {
    let urlcom = this.url01 + "/" + _id;
    return this.httpClient.delete<any>(urlcom);
  }
}
