import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MotivoRefinanciamientos, DetalleGarantia } from '../modelo/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class MotivosrefinanciamientoService {
  private url01: string = "https://localhost:44348/api/MstrMotivoRefinanciamientos";

  constructor(private httpClient: HttpClient) { }

  getDataMotivoRefinanciamientos(): Observable<MotivoRefinanciamientos[]> {
    return this.httpClient.get<MotivoRefinanciamientos[]>(this.url01);
  }

}
