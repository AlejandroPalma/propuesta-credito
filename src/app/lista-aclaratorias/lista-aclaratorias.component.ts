import { Component, OnInit, ViewChild  } from '@angular/core';
import { generalesprop } from '../modelo/Interfaces';
import { EnviadaService } from '..//services/enviada.service';
import { MatDialog, MatTableDataSource, Sort } from '@angular/material';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lista-aclaratorias',
  templateUrl: './lista-aclaratorias.component.html',
  styleUrls: ['./lista-aclaratorias.component.css']
})
export class ListaAclaratoriasComponent implements OnInit  {
  displayedColumns: string[] = ['numPropuesta', 'grupoEconomico', 'nomUnidad', 'idUsuario', 'nomEstado', 'editar'];
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

  editarPropuesta(row: string) {
    this.router.navigate(['ver-propuesta', row]);
  }

  renderDataTable(idUsuario) {
    this.enviadaservice.getDataAjustes(idUsuario)
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

// export class UserDataSource extends DataSource<any> {
//   constructor(private userService: PropuestaService) {
//     super();
//   }
//   connect(): Observable<generalesprop[]> {
//     return this.userService.getDataGeneralesProp();
//   }
//   disconnect() { }
// }


// http://respagblog.azurewebsites.net/angular-material-datatable-con-angular-7/