import { Component, OnInit } from '@angular/core';
import { TipopropuestaService } from '../services/tipopropuesta.service';
import { TipofacilidadService } from '../services/tipofacilidad.service';
import { CargosService } from '../services/cargos.service';
import { forkJoin } from 'rxjs';

import {
  Cargo,
  RelUserCargo,
  Unidades,
  NetUser,
  UserCargo
} from '../modelo/Interfaces';
import { FormControl } from '@angular/forms';
import { MensajeComponent } from '../mensaje/mensaje.component';
import { MatDialog } from '@angular/material';
import { UnidadService } from '../services/unidad.service';

@Component({
  selector: 'app-admin-usercargos',
  templateUrl: './admin-usercargos.component.html',
  styleUrls: ['./admin-usercargos.component.css']
})
export class AdminUsercargosComponent implements OnInit {

  usercargos: RelUserCargo[] = [];
  user: NetUser[] = [];
  cargos: Cargo[] = [];
  unidadresponsable: Unidades[] = [];

  Cargo = new FormControl();
  Nombre = new FormControl();
  UnidadResponsable = new FormControl();

  constructor(
    private cargoservice: CargosService,
    private unidadservice: UnidadService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    forkJoin(
      this.cargoservice.getDataNetUser(),
      this.cargoservice.getDataCargo(),
      this.unidadservice.getDataUnidades(),
      this.cargoservice.getDataRelUserCargo()
    ).subscribe(([U, C, URES, UC]) => {
      this.user = U;
      this.cargos = C;
      this.unidadresponsable = URES;
      this.usercargos = UC;
    }, error => {
      console.error(error);
    });
  }

  selectNombre() {
    console.log(this.Nombre.value);

  }
  selectCargo() {
    console.log(this.Cargo.value);
  }

  agregarUserCargo() {
    let UserCargo: RelUserCargo = {
      IdUnidad: this.UnidadResponsable.value,
      IdUser: this.Nombre.value,
      IdCargo: this.Cargo.value
    }
    console.log(UserCargo);
    this.cargoservice.postDataRelUserCargo(UserCargo).subscribe(
      data => { console.log(data); }
    );
  }

}
