import { Component, OnInit } from '@angular/core';
import { GencuadroautonomiasService } from '../services/gencuadroautonomias.service';
import {CuadroAutonomia} from '../modelo/Interfaces';

@Component({
  selector: 'app-admin-cuadroautonomias',
  templateUrl: './admin-cuadroautonomias.component.html',
  styleUrls: ['./admin-cuadroautonomias.component.css']
})
export class AdminCuadroautonomiasComponent implements OnInit {

  arr: CuadroAutonomia[] = [];

  constructor(
    private cuadro: GencuadroautonomiasService,
  ) { }

  ngOnInit() {
    this.arr = this.cuadro.getCuadro();
  }
}
