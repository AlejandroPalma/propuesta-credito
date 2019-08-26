import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Proposito, Garantia } from '../modelo/Interfaces';
import { LocalStorageService } from '../services/local-storage.service';


@Component({
  selector: 'app-dialog-garantias',
  templateUrl: './dialog-garantias.component.html',
  styleUrls: ['./dialog-garantias.component.css']
})
export class DialogGarantiasComponent implements OnInit {
  msg: string = "";
  tituloMsg: string = "";
  typesOfShoes: Garantia[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private memoRef: MatDialogRef<DialogGarantiasComponent>,
    private localS: LocalStorageService

  ) {
    if (data) {
      this.msg = data.message;
      this.tituloMsg = data.titulo;
      this.typesOfShoes = data.garantia;
    }
  }

  public onGuardarClick() {
    this.memoRef.close(true);
  }
  onCerrarClick() {
    this.memoRef.close(false);
  }

  onSelection(e, v) {
    this.localS.resetGarantia();
    for (let a of v) {
      this.localS.setGarantias(a.value);
    }
  }

  ngOnInit() {
  }
}
