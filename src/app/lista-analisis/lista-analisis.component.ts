import { Component, OnInit, ViewChild  } from '@angular/core';
import { generalesprop } from '../modelo/Interfaces';
import { EnviadaService } from '../services/enviada.service';
import { MatDialog, MatTableDataSource, Sort } from '@angular/material';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lista-analisis',
  templateUrl: './lista-analisis.component.html',
  styleUrls: ['./lista-analisis.component.css']
})
export class ListaAnalisisComponent implements OnInit {
  displayedColumns: string[] = ['numPropuesta', 'grupoEconomico', 'nomUnidad', 'idUsuario', 'nomEstado', 'ver'];
  //dataSource = new UserDataSource(this.propuestaservice);
  dataSource: any;

  constructor(private enviadaservice: EnviadaService,
    public router: Router,
    public dialog: MatDialog,
    public location: Location) { }
  
  ngOnInit() {
    var idUsuario:string = JSON.parse(localStorage.getItem('id'));
    this.renderDataTable(idUsuario);
  }

  verPropuesta(row) {
    this.router.navigate(['ver-pregunta', row]);
  }

  renderDataTable(idUsuario) {
    this.enviadaservice.getDataAnalisisRevision(idUsuario)
      .subscribe(
        x => {
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = x;
          console.log(this.dataSource.data);
        },
        error => {
          console.log('There was an error while retrieving Usuarios!' + error);
        });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
}
}
