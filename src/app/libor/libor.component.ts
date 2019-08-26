import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material';
import { MensajeComponent } from '../mensaje/mensaje.component';
import { UnidadService } from '../services/unidad.service';
import { CurvaliborService } from '../services/curvalibor.service';
import { Unidades } from '../modelo/Interfaces';
import { Chart } from 'chart.js';


// export interface LiborSpread {
//   plazo: String;
//   libor: number;
//   spread: number;
// }

// export interface PeriodicLibor {
//   label: string;
//   labelSpread: string;
//   labelBanca: string;
//   plazo: LiborSpread[];
// }

export interface tablaLibor {
  posicion: number;
  label: string;
  F01: number;
  F02: number;
  F03: number;
  F04: number;
  F05: number;
  F06: number;
  F07: number;
  F08: number;
  F09: number;
  F10: number;
}

const ELEMENT_DATA: tablaLibor[] = [
  { posicion: 0, label: "Libor", F01: 2.47, F02: 2.51, F03: 2.56, F04: 2.62, F05: 2.62, F06: 2.62, F07: 2.62, F08: 2.62, F09: 2.62, F10: 2.62 },
  { posicion: 1, label: "Spread", F01: 0.53, F02: 0.74, F03: 0.94, F04: 1.38, F05: 2.76, F06: 3.13, F07: 3.38, F08: 3.84, F09: 4.64, F10: 4.72 },
  { posicion: 2, label: "Banca Corporativa", F01: 3.00, F02: 3.25, F03: 3.50, F04: 4.00, F05: 5.38, F06: 5.75, F07: 6.00, F08: 6.46, F09: 7.25, F10: 7.34 },
  { posicion: 3, label: "Spread", F01: 0.53, F02: 0.74, F03: 0.94, F04: 1.38, F05: 3.26, F06: 3.63, F07: 3.88, F08: 4.34, F09: 5.14, F10: 5.22 },
  { posicion: 4, label: "Banca Empresa / Internacional", F01: 3.00, F02: 3.25, F03: 3.50, F04: 4.00, F05: 5.88, F06: 6.25, F07: 6.50, F08: 6.96, F09: 7.75, F10: 7.84 },
  { posicion: 5, label: "Spread", F01: 0.53, F02: 0.74, F03: 0.94, F04: 1.38, F05: 4.01, F06: 4.38, F07: 4.63, F08: 5.09, F09: 5.89, F10: 5.97 },
  { posicion: 6, label: "Segmento Pyme", F01: 3.00, F02: 3.25, F03: 3.50, F04: 4.00, F05: 6.63, F06: 7.00, F07: 7.25, F08: 7.71, F09: 8.50, F10: 8.59 },
];

const ELEMENT_DATA00: tablaLibor[] = [
  { posicion: 1, label: "                             ", F01: 2.47, F02: 2.51, F03: 2.56, F04: 2.62, F05: 2.62, F06: 2.62, F07: 2.62, F08: 2.62, F09: 2.62, F10: 2.62 },
];

@Component({
  selector: 'app-libor',
  templateUrl: './libor.component.html',
  styleUrls: ['./libor.component.css']
})
export class LiborComponent {


  displayedColumns: string[] = ['label', 'F01', 'F02', 'F03', 'F04', 'F05', 'F06', 'F07', 'F08', 'F09', 'F10', 'accion'];
  dataSource = ELEMENT_DATA;

  displayedColumns00: string[] = ['label', 'F01', 'F02', 'F03', 'F04', 'F05', 'F06', 'F07', 'F08', 'F09', 'F10', 'accion'];
  dataSource00 = ELEMENT_DATA00;

  arrayFilas = [];
  chart: any = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit() {

    this.chart = new Chart('canvas', {

      type: 'line',
      data: {
        labels: ['1M', '2M', '3M', '6M', '1Y', '2Y', '3Y', '4Y', '5Y', '6Y'],
        datasets: [
          {
            label: 'Libor',
            data: [
              ELEMENT_DATA[0].F01,
              ELEMENT_DATA[0].F02,
              ELEMENT_DATA[0].F03,
              ELEMENT_DATA[0].F04,
              ELEMENT_DATA[0].F05,
              ELEMENT_DATA[0].F06,
              ELEMENT_DATA[0].F07,
              ELEMENT_DATA[0].F08,
              ELEMENT_DATA[0].F09,
              ELEMENT_DATA[0].F10
            ],
            lineTension: 0,
            borderColor: "#cc0605",
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            borderWidth: 2,
            fill: false
          },
          {
            label: 'Banca Corporativa',
            data: [
              ELEMENT_DATA[2].F01,
              ELEMENT_DATA[2].F02,
              ELEMENT_DATA[2].F03,
              ELEMENT_DATA[2].F04,
              ELEMENT_DATA[2].F05,
              ELEMENT_DATA[2].F06,
              ELEMENT_DATA[2].F07,
              ELEMENT_DATA[2].F08,
              ELEMENT_DATA[2].F09,
              ELEMENT_DATA[2].F10
            ],
            lineTension: 0,
            borderColor: 'orange',
            backgroundColor: 'transparent',
            borderWidth: 2,
            fill: false
          },
          {
            label: 'Banca Empresa / Internacional',
            data: [
              ELEMENT_DATA[4].F01,
              ELEMENT_DATA[4].F02,
              ELEMENT_DATA[4].F03,
              ELEMENT_DATA[4].F04,
              ELEMENT_DATA[4].F05,
              ELEMENT_DATA[4].F06,
              ELEMENT_DATA[4].F07,
              ELEMENT_DATA[4].F08,
              ELEMENT_DATA[4].F09,
              ELEMENT_DATA[4].F10
            ],
            lineTension: 0,
            borderColor: "#0a0a0a",
            backgroundColor: 'transparent',
            borderWidth: 2,
            fill: false
          },
          {
            label: 'Segmento Pyme',
            data: [
              ELEMENT_DATA[6].F01,
              ELEMENT_DATA[6].F02,
              ELEMENT_DATA[6].F03,
              ELEMENT_DATA[6].F04,
              ELEMENT_DATA[6].F05,
              ELEMENT_DATA[6].F06,
              ELEMENT_DATA[6].F07,
              ELEMENT_DATA[6].F08,
              ELEMENT_DATA[6].F09,
              ELEMENT_DATA[6].F10
            ],
            lineTension: 0,
            borderColor: "#008000",
            backgroundColor: 'transparent',
            borderWidth: 2,
            fill: false
          }

        ]
      },
      options: {
        title: {
          display: true,
          text: 'Curva de Tesorería - Spread por Banca'
        }
      }

    });

  }

  addFila(row: tablaLibor) {
    // this.arrayFilas.push(row);
    ELEMENT_DATA[row.posicion].F01 =6;
    //this.chart.data.datasets.splice(0,1);
    this.chart.update();
    console.log(row.posicion +' ' + row.F01);

  }
}
// revisar para actualizar graficak
// https://github.com/chartjs/Chart.js/blob/master/samples/charts/line/basic.html