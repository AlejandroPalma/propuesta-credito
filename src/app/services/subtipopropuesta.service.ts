import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubTipoPropuestas } from '../modelo/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class SubtipopropuestaService {

  private url: string = "https://localhost:44348/api/MstrSubTipoPropuestas";

  constructor(private httpClient: HttpClient) { }

  getDataSubTipoPropuestas():Observable<SubTipoPropuestas[]>{
    return this.httpClient.get<SubTipoPropuestas[]>(this.url);
  }

  getDataSubTipoPropuestasById(_id:string){
    let urlcom = this.url + "/" + _id;
    
    return this.httpClient.get<SubTipoPropuestas[]>(urlcom);
  }
  
  postDataSubTipoPropuestas(_body:SubTipoPropuestas): Observable<SubTipoPropuestas>{
    console.log(_body);
    return this.httpClient.post<SubTipoPropuestas>(this.url,_body);
  }

  deleteDataSubTipoPropuestasById(_id:string){
    let urlcom = this.url + "/" + _id;
    console.log(urlcom);
    return this.httpClient.delete<SubTipoPropuestas[]>(urlcom);
    
  }

  putDataSubTipoPropuestas(_id: number, _body: SubTipoPropuestas): Observable<SubTipoPropuestas> {
    let urlcom = this.url + "/" + _id;
    return this.httpClient.put<SubTipoPropuestas>(urlcom, _body);
  }
}
