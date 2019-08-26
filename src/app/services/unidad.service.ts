import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Unidades } from '../modelo/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  private url: string = "https://localhost:44348/api/MstrUnidades";

  constructor(private httpClient: HttpClient) { }

  getDataUnidades():Observable<Unidades[]>{
    return this.httpClient.get<Unidades[]>(this.url);
  }

  getDataUnidadesById(_id:string){
    let urlcom = this.url + "/" + _id;
    return this.httpClient.get<Unidades[]>(urlcom);
  }
  
  postDataUnidades(_body:Unidades): Observable<Unidades>{
    console.log(_body);
    return this.httpClient.post<Unidades>(this.url,_body);
  }

  deleteDataUnidadesById(_id:string){
    let urlcom = this.url + "/" + _id;
    return this.httpClient.delete<Unidades[]>(urlcom);
    
  }

  putDataUnidades(_id: number, _body: Unidades): Observable<Unidades> {
    let urlcom = this.url + "/" + _id;
    return this.httpClient.put<Unidades>(urlcom, _body);
  }
}
