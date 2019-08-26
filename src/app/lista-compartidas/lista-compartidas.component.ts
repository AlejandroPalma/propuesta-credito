import { Component, OnInit } from '@angular/core';
import { PropuestaService } from '..//services/propuesta.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CargosService } from '../services/cargos.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-lista-compartidas',
  templateUrl: './lista-compartidas.component.html',
  styleUrls: ['./lista-compartidas.component.css']
})
export class ListaCompartidasComponent implements OnInit {
  displayedColumns: string[] = ['numPropuesta', 'grupoEconomico', 'nomUnidad', 'idUsuario', 'nomEstado', 'ver'];
  // dataSource = new UserDataSource(this.propuestaservice);
  dataSource: any;

  constructor(private propuestaservice: PropuestaService,
    public router: Router,
    public dialog: MatDialog,
    public location: Location,
    private cargoservice: CargosService,
    private localS: LocalStorageService) { }
  
  ngOnInit() {
    var idUsuario:string = JSON.parse(localStorage.getItem('id'));
    this.renderDataTable(idUsuario);
  }

  verPropuesta(row) {
    this.router.navigate(['ver-propuesta', row]);
  }

  renderDataTable(idUsuario) {
    this.propuestaservice.getDataGeneralesPropConmigo(idUsuario)
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


}

// export class UserDataSource extends DataSource<any> {
//   constructor(private userService: PropuestaService) {
//     super();
//   }
//   connect(): Observable<generalesprop[]> {
//     return this.userService.getDataGeneralesPropConmigo();
//   }
//   disconnect() { }
// }