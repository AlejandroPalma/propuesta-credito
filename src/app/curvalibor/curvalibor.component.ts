import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MensajeComponent } from '../mensaje/mensaje.component';
import { UnidadService } from '../services/unidad.service';
import { CurvaliborService } from '../services/curvalibor.service';
import { CurvaLibor } from '../modelo/Interfaces';
import { Chart } from 'chart.js';
import { forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-curvalibor',
  templateUrl: './curvalibor.component.html',
  styleUrls: ['./curvalibor.component.css']
})
export class CurvaliborComponent implements OnInit {

  curva: CurvaLibor[];
  form: FormGroup;

  constructor(private fb: FormBuilder,
    private curvaliborservice: CurvaliborService) {

    this.form = this.fb.group({
      published: true,
      credentials: this.fb.array([]),
    });

  }

  get curvaForm() {
    return this.form.get('credentials') as FormArray;
  }

  addCreds(item: CurvaLibor) {
    //const creds = this.form.get('credentials') as FormArray;
    const c = this.fb.group({
      etiqueta: item.Etiqueta,
      banca: '',
      C1: item.C1,
      C2: item.C2,
      C3: item.C3,
      C4: item.C4,
      C5: item.C5,
      C6: item.C6,
      C7: item.C7,
      C8: item.C8,
      C9: item.C9,
      C10: item.C10
    })
    this.curvaForm.push(c);
  }

  // filaCurva = new FormGroup({
  //   etiqueta: new FormControl(''),
  //   banca: new FormControl('')
  // });

  // filaCurva = this.fb.group({
  //   etiqueta:[],
  //   banca: []
  // });

  // profileForm = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  // });

  ngOnInit() {

    forkJoin(
      this.curvaliborservice.getDataCurvaLibor()
    ).subscribe(([C]) => {
      this.curva = C;
    }, error => {
      console.error(error);
    },
    () => {
      for (let item of this.curva) {
        this.addCreds(item);
      }
    });

    

  }


  // get aliasesForm() {
  //   return this.profileForm.get('aliases') as FormArray;
  // }

  // addAlias() {

  //   const fila = this.fb.group({
  //     etiqueta: [],
  //     banca: []
  //   });

  //   this.aliasesForm.push(fila);
  // }

  actualizaCurva(idCurva: number) {
    // console.log(this.curva);
    // console.log(this.etiqueta[0].value);
    // this.curvaliborservice.postDataCurvaLibor(reg).subscribe(
    //   data => {
    //     console.log(data);
    //   });

  }


  // onSubmit() {
  //   // TODO: Use EventEmitter with form value
  //   console.log(this.profileForm.value);
  // }

  // profileForm = this.fb.group({
  //   firstName: [''],
  //   lastName: [''],
  //   address: this.fb.group({
  //     street: [''],
  //     city: [''],
  //     state: [''],
  //     zip: ['']
  //   }),
  //   aliases: this.fb.array([
  //     this.fb.control('')
  //   ])
  // });

}
