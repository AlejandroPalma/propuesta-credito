import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { generalesprop, ListaPropuestas } from '../modelo/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class EnviadaService {

  private url: string = "https://localhost:44348/api/Enviadas";
  private url3: string = "https://localhost:44348/api/enviadas/analisis";
  private url4: string = "https://localhost:44348/api/enviadas/ajustes";
  private url5: string = "https://localhost:44348/api/enviadas/autonomias";
  private url6: string = "https://localhost:44348/api/enviadas/revisor";

  constructor(private httpClient: HttpClient) { }

  getDataEnviadas(idUsuario:string): Observable<ListaPropuestas[]> {
    let urlcom = this.url + "/" + idUsuario;
    return this.httpClient.get<ListaPropuestas[]>(urlcom);
  }

  getDataAnalisisRevision(idUsuario:string): Observable<ListaPropuestas[]> {
    let urlcom = this.url3 + "?id=" + idUsuario;
    return this.httpClient.get<ListaPropuestas[]>(urlcom);
  }

  getDataAjustes(idUsuario:string): Observable<ListaPropuestas[]> {
    let urlcom = this.url4 + "?id=" + idUsuario;
    return this.httpClient.get<ListaPropuestas[]>(urlcom);
  }

  getDataAutonomias(): Observable<ListaPropuestas[]> {
    return this.httpClient.get<ListaPropuestas[]>(this.url5);
  }

  getDataRevisor(idUsuario:string): Observable<ListaPropuestas[]> {
    let urlcom = this.url6 + "?id=" + idUsuario;
    return this.httpClient.get<ListaPropuestas[]>(urlcom);
  }

}
