import { Component, OnInit } from '@angular/core';
import { generalesprop } from '../modelo/Interfaces';
import { EnviadaService } from '..//services/enviada.service';
import { MatDialog, MatTableDataSource, Sort } from '@angular/material';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lista-revisor',
  templateUrl: './lista-revisor.component.html',
  styleUrls: ['./lista-revisor.component.css']
})
export class ListaRevisorComponent implements OnInit {
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

  verRevisor(row) {
    this.router.navigate(['ver-revisor', row]);
  }

  renderDataTable(idUsuario) {
    this.enviadaservice.getDataRevisor(idUsuario)
      .subscribe(
        x => {
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = x;
          console.log(this.dataSource.data);
        },
        error => {
          console.log(error);
        });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
}

}
