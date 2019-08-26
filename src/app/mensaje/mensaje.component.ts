import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent implements OnInit {
  msg: string = "";
  tituloMsg: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private memoRef: MatDialogRef<MensajeComponent>) {
    if (data) {
      this.msg = data.message;
      this.tituloMsg = data.titulo;
    }
  }

  public onGuardarClick(){
    this.memoRef.close(true);
  }
  onCerrarClick(){
    this.memoRef.close(false);
  }

  ngOnInit() {
  }

}
