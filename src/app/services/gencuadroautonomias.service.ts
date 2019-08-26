import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TipopropuestaService } from '../services/tipopropuesta.service';
import { TipofacilidadService } from '../services/tipofacilidad.service';
import { CargosService } from '../services/cargos.service';
import { forkJoin, Observable } from 'rxjs';

import {
  Cargo, CuadroAutonomia, CargosAutonomia
} from '../modelo/Interfaces';
@Injectable({
  providedIn: 'root'
})
export class GencuadroautonomiasService {

  cuadroAutonomias: CuadroAutonomia[] = [];
  cargosAutonomias: CargosAutonomia[] = [];
  cargos: Cargo[] = [];
  valorAutonomias: any[] = [];
  grupoAutonomias: any[] = [];
  arr: CuadroAutonomia[] = [];

  constructor(
    private cargoservice: CargosService,
  ) { 


  }

  getCuadro(): CuadroAutonomia[]{

   var a:CuadroAutonomia[]=[];

    forkJoin(
      this.cargoservice.getDataCargosAutonomias(),
      this.cargoservice.getDataValorAutonomias(),
      this.cargoservice.getDataGrupoAutonomias(),
      this.cargoservice.getDataCargo()
    ).subscribe(([CAR, VAL, GRU, CARGOS]) => {
      this.cargosAutonomias = CAR;
      this.valorAutonomias = VAL;
      this.grupoAutonomias = GRU;
      this.cargos = CARGOS;
    },
      error => { console.error(error); },
      () => {
      
        let n: number = 0;
        let nomCargoA: string = "";
        let nomCargoB: string = "";
        for (let item of this.grupoAutonomias) {
          for (let i of item.Grupo) {

            let A = this.cargos.find(x => x.IdCargo == i.IdCargoA) === undefined ? "" : this.cargos.find(x => x.IdCargo == i.IdCargoA).NomCargo;
            let B = this.cargos.find(x => x.IdCargo == i.IdCargoB) === undefined ? "" : this.cargos.find(x => x.IdCargo == i.IdCargoB).NomCargo;

            if (nomCargoA == "" ) {
              nomCargoA = A;
            }
            else {
              nomCargoA = nomCargoA + " - " + A;
            }
            if (nomCargoB == "") {
              nomCargoB = B;
            }
            else{
              nomCargoB = nomCargoB + " - " + B;
            }
          }

          let cua: CuadroAutonomia = {
            IdGrupoCargo: item.IdGrupoCargo,
            NomGrupoCargo: "",
            NomCargoA: nomCargoA,
            NomCargoB: nomCargoB,
            ValorConGarantiaA: 0,
            ValorConGarantiaB: 0,
            ValorSinGarantia: 0,
            ValorSBLC: 0
          }
          a.push(cua);
          nomCargoA = "";
          nomCargoB = "";
          n++;
        }
      });

      return a;
  }


//   getCuadro(): CuadroAutonomia[]{

}
