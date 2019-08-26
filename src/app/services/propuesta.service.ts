import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { generalesprop, ListaPropuestas } from '../modelo/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class PropuestaService {

  private url: string = "https://localhost:44348/api/Propuestas";
  private url01: string = "https://localhost:44348/api/CompartirPropuesta?";
  private url02: string = "https://localhost:44348/api/CompartidasConmigo?id=";
  private url03: string = "https://localhost:44348/api/MisPropuestas?id=";
  
  constructor(private httpClient: HttpClient) { }

  getDataGeneralesProp(): Observable<generalesprop[]> {
    return this.httpClient.get<generalesprop[]>(this.url);
  }

  getDataGeneralesPropById(_id: string) {
    let urlcom = this.url + "/" + _id;
    return this.httpClient.get<generalesprop>(urlcom);
  }

  getDataGeneralesMisPropuestas(_id: string) {
    let urlcom = this.url03 + _id;
    return this.httpClient.get<ListaPropuestas>(urlcom);
  }

  getDataGeneralesPropConmigo(_id: string) {
    let urlcom = this.url02 + _id;
    return this.httpClient.get<ListaPropuestas>(urlcom);
  }

  postDataGeneralesProp(_body: generalesprop): Observable<generalesprop> {
    console.log(_body);
    return this.httpClient.post<generalesprop>(this.url, _body);
  }

  deleteDataGeneralesPropById(_id: string) {
    let urlcom = this.url + "/" + _id;
    console.log(urlcom);
    return this.httpClient.delete<generalesprop[]>(urlcom);

  }

  putDataGeneralesProp(_id: string, _body: generalesprop): Observable<generalesprop> {
    let urlcom = this.url + "/" + _id;
    return this.httpClient.put<generalesprop>(urlcom, _body);
  }

  putDataCompartir(_id: string, _body: string): Observable<generalesprop> {
    let urlcom = this.url01 + "id=" + _id + "&idCompartir=" + _body;
    return this.httpClient.put<generalesprop>(urlcom, _body);
  }

  // getDataEstados(){
  //   // return this.httpClient.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  //   //return this.httpClient.get<any>('https://localhost:44305/api/GeneralesProps');
  //   return this.httpClient.get<generalesprop[]>('http://localhost:55925/api/GeneralesProps/');
  // }
}

// https://unprogramador.com/consumir-webservices-con-angular-y-httpclient/
// https://codingpotions.com/angular-comunicacion-componentes/
