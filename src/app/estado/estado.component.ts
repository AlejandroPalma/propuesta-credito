import { Component, OnInit } from '@angular/core';
import { EstadoService } from '../services/estado.service';
import { Estados } from '../modelo/Interfaces';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {

  estados: Estados[] = [];

  selEstado: string;
  selP: string;
  selS: string;

  constructor(
    private estadoservice: EstadoService
  ) { }

  ngOnInit() {
    forkJoin(
      this.estadoservice.getDataEstados(),
    ).subscribe(([P]) => {
      this.estados = P;
      console.log(this.estados);
    }, error => {
      console.error(error);
    });
  }

}
