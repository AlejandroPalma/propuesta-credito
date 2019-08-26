import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstadoPropuesta } from '../modelo/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class EstadopropuestaService {

  private url2: string = "https://localhost:44348/api/estadopropuesta/confeccion";
  private url3: string = "https://localhost:44348/api/estadopropuesta/analisis	";
  private url4: string = "https://localhost:44348/api/estadopropuesta/autonomia	";
  private url5: string = "https://localhost:44348/api/estadopropuesta/ajustes";
  private url6: string = "https://localhost:44348/api/estadopropuesta/aprobar";
  private url7: string = "https://localhost:44348/api/estadopropuesta/negar";
  private url8: string = "https://localhost:44348/api/estadopropuesta/diferir";
  private url9: string = "https://localhost:44348/api/estadopropuesta/revisor";
  private url10: string = "https://localhost:44348/api/estadopropuesta/autorizada";
  private url11: string = "https://localhost:44348/api/estadopropuesta/no-autorizada";


  constructor(private httpClient: HttpClient) { }

  // getDataEstadoPropuestaById(_id: string) {
  //   let urlcom = this.url + "/" + _id;
  //   return this.httpClient.get<EstadoPropuesta>(urlcom);
  // }

  putDataEstadoPropuesta2(_body: EstadoPropuesta): Observable<EstadoPropuesta> {
    return this.httpClient.put<EstadoPropuesta>(this.url2, _body);
  }
  putDataEstadoPropuesta3(_body: EstadoPropuesta): Observable<EstadoPropuesta> {
    return this.httpClient.put<EstadoPropuesta>(this.url3, _body);
  }
  putDataEstadoPropuesta4(_body: EstadoPropuesta): Observable<EstadoPropuesta> {
    return this.httpClient.put<EstadoPropuesta>(this.url4, _body);
  }
  putDataEstadoPropuesta5(_body: EstadoPropuesta): Observable<EstadoPropuesta> {
    return this.httpClient.put<EstadoPropuesta>(this.url5, _body);
  }
  putDataEstadoPropuesta6(_body: EstadoPropuesta): Observable<EstadoPropuesta> {
    return this.httpClient.put<EstadoPropuesta>(this.url6, _body);
  }
  putDataEstadoPropuesta7(_body: EstadoPropuesta): Observable<EstadoPropuesta> {
    return this.httpClient.put<EstadoPropuesta>(this.url7, _body);
  }
  putDataEstadoPropuesta8(_body: EstadoPropuesta): Observable<EstadoPropuesta> {
    return this.httpClient.put<EstadoPropuesta>(this.url8, _body);
  }
  putDataEstadoPropuesta9(_body: EstadoPropuesta): Observable<EstadoPropuesta> {
    return this.httpClient.put<EstadoPropuesta>(this.url9, _body);
  }
  putDataEstadoPropuesta10(_body: EstadoPropuesta): Observable<EstadoPropuesta> {
    return this.httpClient.put<EstadoPropuesta>(this.url10, _body);
  }
  putDataEstadoPropuesta11(_body: EstadoPropuesta): Observable<EstadoPropuesta> {
    return this.httpClient.put<EstadoPropuesta>(this.url11, _body);
  }

}
