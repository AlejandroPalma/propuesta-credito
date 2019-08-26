import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Riesgos} from '../modelo/Interfaces';


@Injectable({
  providedIn: 'root'
})
export class RiesgoService {
  private url: string = "https://localhost:44348/api/MstrRiesgos";

  constructor(private httpClient: HttpClient) { }

  getDataRiesgos():Observable<Riesgos[]>{
    return this.httpClient.get<Riesgos[]>(this.url);
  }

  getDataRiesgosById(_id:string){
    let urlcom = this.url + "/" + _id;
    return this.httpClient.get<Riesgos[]>(urlcom);
  }
  
  postDataRiesgos(_body:Riesgos): Observable<Riesgos>{
    console.log(_body);
    return this.httpClient.post<Riesgos>(this.url,_body);
  }

  deleteDataRiesgosById(_id:string){
    let urlcom = this.url + "/" + _id;
    console.log(urlcom);
    return this.httpClient.delete<Riesgos[]>(urlcom);
    
  }

  putDataRiesgos(_id: number, _body: Riesgos): Observable<Riesgos> {
    let urlcom = this.url + "/" + _id;
    return this.httpClient.put<Riesgos>(urlcom, _body);
  }
}
