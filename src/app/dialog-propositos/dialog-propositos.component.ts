import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Proposito } from '../modelo/Interfaces';
import { LocalStorageService } from '../services/local-storage.service';


@Component({
  selector: 'app-dialog-propositos',
  templateUrl: './dialog-propositos.component.html',
  styleUrls: ['./dialog-propositos.component.css']
})
export class DialogPropositosComponent implements OnInit {
  msg: string = "";
  tituloMsg: string = "";
  typesOfShoes: Proposito[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
                                       private memoRef: MatDialogRef<DialogPropositosComponent>,
                                       private localS: LocalStorageService
                                       
                                       ) {
    if (data) {
      this.msg = data.message;
      this.tituloMsg = data.titulo;
      this.typesOfShoes = data.proposito;
    }
  }

  public onGuardarClick() {
    this.memoRef.close(true);
  }
  onCerrarClick() {
    this.memoRef.close(false);
  }

  onSelection(e, v) {
    this.localS.resetProposito();
    for (let a of v) {
      this.localS.setPropositos(a.value);
     }
  }

  ngOnInit() {
  }

}
