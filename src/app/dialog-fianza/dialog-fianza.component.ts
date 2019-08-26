import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Fianza } from '../modelo/Interfaces';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-dialog-fianza',
  templateUrl: './dialog-fianza.component.html',
  styleUrls: ['./dialog-fianza.component.css']
})
export class DialogFianzaComponent implements OnInit {
  msg: string = "";
  tituloMsg: string = "";
  typesOfShoes: Fianza[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private memoRef: MatDialogRef<DialogFianzaComponent>,
    private localS: LocalStorageService

  ) {
    if (data) {
      this.msg = data.message;
      this.tituloMsg = data.titulo;
      this.typesOfShoes = data.fianza;
    }
  }

  public onGuardarClick() {
    this.memoRef.close(true);
  }
  onCerrarClick() {
    this.memoRef.close(false);
  }

  onSelection(e, v) {
    this.localS.resetFianza();
    for (let a of v) {
      this.localS.setFianzas(a.value);
    }
  }

  ngOnInit() {
  }

}
