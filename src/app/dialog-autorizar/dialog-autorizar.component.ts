import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-dialog-autorizar',
  templateUrl: './dialog-autorizar.component.html',
  styleUrls: ['./dialog-autorizar.component.css']
})
export class DialogAutorizarComponent implements OnInit {
  msg: string = "";
  tituloMsg: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private memoRef: MatDialogRef<DialogAutorizarComponent>) {
    if (data) {
      this.msg = data.message;
      this.tituloMsg = data.titulo;
    }
  }

  public onAutorizarClick(){
    this.memoRef.close(true);
  }
  
  public onNoAutorizarClick(){
    this.memoRef.close(false);
  }

  ngOnInit() {
  }

}