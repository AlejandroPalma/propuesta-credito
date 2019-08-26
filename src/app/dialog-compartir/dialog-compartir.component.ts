
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { CargosService } from '../services/cargos.service';
import { forkJoin } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

import {
  Cargo,
  UserCargo,
  RelUserCargo,
  Unidades
} from '../modelo/Interfaces';

@Component({
  selector: 'app-dialog-compartir',
  templateUrl: './dialog-compartir.component.html',
  styleUrls: ['./dialog-compartir.component.css']
})
export class DialogCompartirComponent implements OnInit {
  msg: string = "";
  tituloMsg: string = "";
  typesOfShoes: RelUserCargo[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private memoRef: MatDialogRef<DialogCompartirComponent>,
    private localS: LocalStorageService

  ) {
    if (data) {
      this.msg = data.message;
      this.tituloMsg = data.titulo;
      this.typesOfShoes = data.userCompartido;
    }
  }

  public onGuardarClick() {
    this.memoRef.close(true);
  }
  onCerrarClick() {
    this.memoRef.close(false);
  }

  onSelection(e, v) {
    this.localS.resetUserCompartido();
    for (let a of v) {
      this.localS.setUserCompartido(a.value);
    }
  }

  ngOnInit() {
  }

}
