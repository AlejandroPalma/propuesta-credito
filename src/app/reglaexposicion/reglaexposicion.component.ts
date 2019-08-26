import { Component, OnInit } from '@angular/core';
import { TipopropuestaService } from '../services/tipopropuesta.service';
import { TipofacilidadService } from '../services/tipofacilidad.service';
import { ReglaexposicionService } from '../services/reglaexposicion.service';
import { forkJoin } from 'rxjs';

import {
  Facilidades,
  TipoPropuestas,
  Riesgos,
  Unidades,
  generalesprop,
  TipoFacilidades,
  SubTipoPropuestas,
  SubTipoFacilidad,
  Reglas
} from '../modelo/Interfaces';



@Component({
  selector: 'app-reglaexposicion',
  templateUrl: './reglaexposicion.component.html',
  styleUrls: ['./reglaexposicion.component.css']
})
export class ReglaexposicionComponent implements OnInit {

  propuesta: TipoPropuestas[];
  tipoFacilidad: TipoFacilidades[];
  reglas: Reglas[] = [];

  selPropuesta: string;
  selFacilidad: string;
  selTipoTotal: string;
  selMontSaldActual: string;
  selMontSaldAnterior: string;
  selMontSald: string;
  selActuAnte: string;
  selOperacionActual: string;
  selOperacionAnterior: string;
  alerta: string;

  contReglas: number = 0;

  constructor(
    private tipopropuestaservice: TipopropuestaService,
    private tipofacilidadservice: TipofacilidadService,
    private reglaexposicion: ReglaexposicionService
  ) { }

  ngOnInit() {

    forkJoin(
      this.tipopropuestaservice.getDataTipoPropuestas(),
      this.tipofacilidadservice.getDataTipoFacilidades(),
      this.reglaexposicion.getDataReglas()
    ).subscribe(([P, F, R]) => {
      this.propuesta = P;
      this.tipoFacilidad = F;
      this.reglas = R;
      console.log(this.reglas);
    }, error => {
      console.error(error);
    });
  }

  selectPropuesta(idTipoPropuesta, i) {
    this.selPropuesta = idTipoPropuesta;
    console.log(this.selPropuesta);
  }

  selectTipoFacilidad(idTipoFacilidad, i) {
    this.selFacilidad = idTipoFacilidad;
    console.log(this.selFacilidad);
  }

  selectEtiqueta(Etiqueta) {
    this.selTipoTotal = Etiqueta;
    console.log(this.selTipoTotal);
  }

  selectMontoSaldoActual(MontSald) {
    this.selMontSaldActual = MontSald;
    console.log(this.selMontSald);
  }

  selectMontoSaldoAnterior(MontSald) {
    this.selMontSaldAnterior = MontSald;
    console.log(this.selMontSald);
  }

  selectOperacionActual(MontSald) {
    this.selOperacionActual = MontSald;
    console.log(this.selOperacionActual);
  }
  selectOperacionAnterior(MontSald) {
    this.selOperacionAnterior = MontSald;
    console.log(this.selOperacionAnterior);
  }

  agregar() {
    if (this.reglas.find(x => (x.IdPropuesta == this.selPropuesta &&
                         x.IdFacilidad == this.selFacilidad &&
                         x.TipoTotal == this.selTipoTotal
                         ))) {
      console.log('La regla ya existe');
      this.alerta = 'La regla ya existe';
    }
    else {
      this.contReglas = this.contReglas + 1;
      let n = this.reglas.length;
      let tp = this.propuesta.find(x => (x.IdTipoPropuesta == this.selPropuesta)).NomTipoPropuesta;
      let tf = this.tipoFacilidad.find(x => (x.IdTipoFacilidad == this.selFacilidad)).NomTipoFacilidad;

      let reg: Reglas = {
        GrupoReglas: "All",
        IdReglaExposicion: "00000000-0000-0000-0000-000000000000",
        TipoTotal: this.selTipoTotal,
        IdPropuesta: this.selPropuesta,
        IdFacilidad: this.selFacilidad,
        NomTipoPropuesta: "",
        NomTipoFacilidad: "",
        ReglaSumaActual: this.selMontSaldActual,
        ReglaSumaAnterior: this.selMontSaldAnterior,
        OperacionActual: this.selOperacionActual,
        OperacionAnterior: this.selOperacionAnterior
      }

      // console.log(reg);

      this.reglaexposicion.postDataReglas(reg).subscribe(
        data => {
          console.log(data);
          this.refrescar();
        });
      this.alerta = '';

    }
  }

  eliminarRegla(id: string) {
    console.log(id);

    this.reglaexposicion.deleteDataReglasById(id).subscribe(
      data => {
        console.log(data);
        this.refrescar();
      });
    // this.reglas.splice(id, 1);
  }

  refrescar() {
    this.reglaexposicion.getDataReglas().subscribe(
      data => {
        this.reglas = data;
        console.log("refrescar");
      },
      err => { }
    )
  }

}

