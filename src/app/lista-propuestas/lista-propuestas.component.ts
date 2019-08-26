import { Component, OnInit } from '@angular/core';
import { generalesprop } from '../modelo/Interfaces';
import { PropuestaService } from '..//services/propuesta.service';
import { Observable, forkJoin } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MensajeComponent } from '../mensaje/mensaje.component';
import { DialogCompartirComponent } from '../dialog-compartir/dialog-compartir.component';

import { RelUserCargo} from '../modelo/Interfaces';
import { CargosService } from '../services/cargos.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-lista-propuestas',
  templateUrl: './lista-propuestas.component.html',
  styleUrls: ['./lista-propuestas.component.css']
})
export class ListaPropuestasComponent implements OnInit {
  displayedColumns: string[] = ['numPropuesta', 'grupoEconomico', 'nomUnidad', 'idUsuario', 'nomEstado', 'editar', 'compartir'];
  // dataSource = new UserDataSource(this.propuestaservice);
  dataSource: any;

  user: RelUserCargo[] = [];

  constructor(private propuestaservice: PropuestaService,
    public router: Router,
    public dialog: MatDialog,
    public location: Location,
    private cargoservice: CargosService,
    private localS: LocalStorageService) { }

  ngOnInit() {
    forkJoin(
      this.cargoservice.getDataRelUserCargo()
    ).subscribe(([U]) => {
      this.user = U;
    }, error => {
      console.error(error);
    });
    var idUsuario:string = JSON.parse(localStorage.getItem('id'));
    this.renderDataTable(idUsuario);
  }

  renderDataTable(idUsuario) {
    this.propuestaservice.getDataGeneralesMisPropuestas(idUsuario)
      .subscribe(
        x => {
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = x;
        },
        error => {
          console.log(error);
        });
  }

  dialogoCompartidas(IdPropuesta) {
    let dat: ""//string = IdProposito;
    let tit = "Compartir propuesta";
    let userSelect: string[] = [];

    const dialogRef = this.dialog.open(DialogCompartirComponent, {
      width: '45%',
      data: {
        message: dat,
        titulo: tit,
        userCompartido: this.user,
        userSelect: []
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        let userCompartidoID = this.localS.getUserCompartidoId();
      
        this.propuestaservice.putDataCompartir(IdPropuesta, userCompartidoID[0]).subscribe(
          propuesta => { console.log(propuesta) },
          err => { console.log("Error al actualizar las facilidades") });

        // this.selectPropositoDialog(fac, i);
      }
    });
  }

  editarPropuesta(row: string) {
    this.router.navigate(['ver-propuesta', row]);
  }

  compartirPropuesta(row: string) {
    alert("entro a compartir propuesta" + row);
  }

}

// export class UserDataSource extends DataSource<any> {
//   constructor(private userService: PropuestaService) {
//     super();
//   }
//   connect(): Observable<generalesprop[]> {
//     return this.userService.getDataGeneralesProp();
//   }
//   disconnect() { }
// }
