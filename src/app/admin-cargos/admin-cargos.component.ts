import { Component, OnInit } from '@angular/core';
import { TipopropuestaService } from '../services/tipopropuesta.service';
import { TipofacilidadService } from '../services/tipofacilidad.service';
import { CargosService } from '../services/cargos.service';
import { forkJoin } from 'rxjs';

import {
  Cargo,
} from '../modelo/Interfaces';
import { FormControl } from '@angular/forms';
import { MensajeComponent } from '../mensaje/mensaje.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-admin-cargos',
  templateUrl: './admin-cargos.component.html',
  styleUrls: ['./admin-cargos.component.css']
})
export class AdminCargosComponent implements OnInit {

  cargos: Cargo[] = [];
  nomCargo = new FormControl();
  valor = new FormControl();

  constructor(
    private cargoservice: CargosService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    forkJoin(
      this.cargoservice.getDataCargo()
    ).subscribe(([C]) => {
      this.cargos = C;
    }, error => {
      console.error(error);
    });
  }

  agregarCargo() {
    console.log(this.nomCargo.value);
    if (this.cargos.find(x => (x.NomCargo == this.nomCargo.value))) {
      alert("El cargo ya existe");
    }
    else {
      let reg: Cargo = {
        IdCargo: "All",
        Nivel: "-1",
        NomCargo: this.nomCargo.value
      }
      this.cargoservice.postDataCargo(reg).subscribe(
        data => { console.log(data); });
    }

    this.cargoservice.getDataCargo().subscribe(
      data => {
        this.cargos = data;
        this.nomCargo.setValue('');
      });
  }

  editarCargo(i: number) {

    // let dat = "Seleccione el tipo de propuesta";
    // const memoRef = this.dialog.open(MensajeComponent, {
    //   data: {
    //     message: dat
    //   }
    // });

    // memoRef.afterClosed().subscribe((confirmed: boolean) => {
    //   console.log('Memo de cambio cerrado');
    // });

  }



}
