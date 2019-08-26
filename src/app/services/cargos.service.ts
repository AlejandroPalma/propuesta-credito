import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cargo, UserCargo, RelUserCargo, CuadroAutonomia, CargosAutonomia, NetUser, AutonomiaCuadro } from '../modelo/Interfaces';


@Injectable({
  providedIn: 'root'
})
export class CargosService {

  private url: string = "https://localhost:44348/api/MstrCargos";
  private url01: string = "https://localhost:44348/api/RelUserCargos";
  private url02: string = "https://localhost:44348/api/RelUserCargosSinUnidad";
  private url03: string = "https://localhost:44348/api/CuadroAutonomias";
  private url04: string = "https://localhost:44348/api/CargosAutonomias";
  private url05: string = "https://localhost:44348/api/ValorAutonomias";
  private url06: string = "https://localhost:44348/api/GrupoCargosAutonomias";
  private url07: string = "https://localhost:44348/api/NetUser";
  private url08: string = "https://localhost:44348/api/TabletValidation"
  

  constructor(private httpClient: HttpClient) { }

  getDataCargo(): Observable<Cargo[]> {
    return this.httpClient.get<Cargo[]>(this.url);
  }

  getDataCargoById(_id: string) {
    let urlcom = this.url + "/" + _id;
    return this.httpClient.get<Cargo>(urlcom);
  }

  postDataCargo(_body: Cargo): Observable<Cargo> {
    //console.log(_body);
    return this.httpClient.post<Cargo>(this.url, _body);
  }

  deleteDataCargoById(_id: string) {
    let urlcom = this.url + "/" + _id;
    console.log(urlcom);
    return this.httpClient.delete<Cargo[]>(urlcom);
  }

  putDataCargo(_id: number, _body: Cargo): Observable<Cargo> {
    let urlcom = this.url + "/" + _id;
    return this.httpClient.put<Cargo>(urlcom, _body);
  }

  //********************************************************************** */
  getDataNetUser(): Observable<NetUser[]> {
    return this.httpClient.get<NetUser[]>(this.url07);
  }

  getDataNetUserById(_id: string): Observable<NetUser> {
    let urlcom = this.url07 + "?id=" + _id;
    return this.httpClient.get<NetUser>(urlcom);
  }

  getDataRelUserCargo(): Observable<RelUserCargo[]> {
    return this.httpClient.get<RelUserCargo[]>(this.url01);
  }

  public getDataApprove(): Observable<AutonomiaCuadro[]> {
    return this.httpClient.get<AutonomiaCuadro[]>(this.url08);
  }

  getDataRelUserCargosSinUnidad(): Observable<RelUserCargo[]> {
    return this.httpClient.get<RelUserCargo[]>(this.url02);
  }

  postDataRelUserCargo(_body: RelUserCargo): Observable<RelUserCargo> {
    return this.httpClient.post<RelUserCargo>(this.url01, _body);
  }
  //********************************************************************** */
  
  //********************************************************************** */
  getDataCuadroAutonomias(): Observable<CuadroAutonomia[]> {
    return this.httpClient.get<CuadroAutonomia[]>(this.url03);
  }

  getDataCargosAutonomias(): Observable<CargosAutonomia[]> {
    return this.httpClient.get<CargosAutonomia[]>(this.url04);
  }

  getDataValorAutonomias(): Observable<CuadroAutonomia[]> {
    return this.httpClient.get<CuadroAutonomia[]>(this.url05);
  }

  getDataGrupoAutonomias(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url06);
  }

}

