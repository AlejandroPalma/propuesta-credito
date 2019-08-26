import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubTipoFacilidad } from '../modelo/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class SubtipofacilidadService {

  private url: string = "https://localhost:44348/api/MstrSubTipoFacilidades";

  constructor(private httpClient: HttpClient) { }

  getDataSubTipoFacilidad():Observable<SubTipoFacilidad[]>{
    return this.httpClient.get<SubTipoFacilidad[]>(this.url);
  }

  getDataSubTipoFacilidadById(_id:string){
    let urlcom = this.url + "/" + _id;
    
    return this.httpClient.get<SubTipoFacilidad[]>(urlcom);
  }
  
  postDataSubTipoFacilidad(_body:SubTipoFacilidad): Observable<SubTipoFacilidad>{
    console.log(_body);
    return this.httpClient.post<SubTipoFacilidad>(this.url,_body);
  }

  deleteDataSubTipoFacilidadById(_id:string){
    let urlcom = this.url + "/" + _id;
    console.log(urlcom);
    return this.httpClient.delete<SubTipoFacilidad[]>(urlcom);
    
  }

  putDataSubTipoFacilidad(_id: number, _body: SubTipoFacilidad): Observable<SubTipoFacilidad> {
    let urlcom = this.url + "/" + _id;
    return this.httpClient.put<SubTipoFacilidad>(urlcom, _body);
  }
}
