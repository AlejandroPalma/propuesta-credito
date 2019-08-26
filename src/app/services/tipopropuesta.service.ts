import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoPropuestas } from '../modelo/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class TipopropuestaService {
  private url: string = "https://localhost:44348/api/MstrTipoPropuestas";

  constructor(private httpClient: HttpClient) { }

  getDataTipoPropuestas():Observable<TipoPropuestas[]>{
    return this.httpClient.get<TipoPropuestas[]>(this.url);
  }

  getDataTipoPropuestasById(_id:string){
    let urlcom = this.url + "/" + _id;
    return this.httpClient.get<TipoPropuestas[]>(urlcom);
  }
  
  postDataTipoPropuestas(_body:TipoPropuestas): Observable<TipoPropuestas>{
    console.log(_body);
    return this.httpClient.post<TipoPropuestas>(this.url,_body);
  }

  deleteDataTipoPropuestasById(_id:string){
    let urlcom = this.url + "/" + _id;
    console.log(urlcom);
    return this.httpClient.delete<TipoPropuestas[]>(urlcom);
    
  }

  putDataTipoPropuestas(_id: number, _body: TipoPropuestas): Observable<TipoPropuestas> {
    let urlcom = this.url + "/" + _id;
    return this.httpClient.put<TipoPropuestas>(urlcom, _body);
  }
}
