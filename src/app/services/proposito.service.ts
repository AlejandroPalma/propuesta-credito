import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetalleProposito, Proposito } from '../modelo/Interfaces';


@Injectable({
  providedIn: 'root'
})
export class PropositoService {
  private urlD: string = "https://localhost:44348/api/DetallePropositos";
  private urlD01: string = "api/DeleteDetallePropositoPorFacilidad?id=";
  private urlP: string = "https://localhost:44348/api/MstrPropositos";

  constructor(private httpClient: HttpClient) { }

  getDataDetallePropositos(): Observable<DetalleProposito[]> {
    return this.httpClient.get<DetalleProposito[]>(this.urlD);
  }

  getDataPropositos(): Observable<Proposito[]> {
    return this.httpClient.get<Proposito[]>(this.urlP);
  }

  getDataDetallePropositosById(_id: string): Observable<DetalleProposito[]> {
    let urlcom = this.urlD + "/" + _id;
    return this.httpClient.get<DetalleProposito[]>(urlcom);
  }

  postDataDetallePropositos(_body: DetalleProposito): Observable<DetalleProposito> {
    return this.httpClient.post<DetalleProposito>(this.urlD, _body);
  }

  putDataDetallePropositos(_id: string, _body: DetalleProposito): Observable<DetalleProposito> {
    let urlcom = this.urlD + "/" + _id;
    return this.httpClient.put<DetalleProposito>(urlcom, _body);
  }

  deleteDataDetallePropositosById(_id: string): Observable<any> {
    let urlcom = this.urlD + "/" + _id;
    return this.httpClient.delete<any>(urlcom);
  }

  deleteDataDetallePropositosByIdFacilidad(_id: string): Observable<any> {
    let urlcom = this.urlD01 + _id;
    return this.httpClient.delete<any>(urlcom);
  }

  // getDataEstados(){
  //   // return this.httpClient.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  //   //return this.httpClient.get<any>('https://localhost:44305/api/GeneralesProps');
  //   return this.httpClient.get<generalesprop[]>('http://localhost:55925/api/GeneralesProps/');
  // }
}

// https://unprogramador.com/consumir-webservices-con-angular-y-httpclient/
// https://codingpotions.com/angular-comunicacion-componentes/
