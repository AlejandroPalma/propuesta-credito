import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MensajeComponent } from '../mensaje/mensaje.component';
import { MatDialog } from '@angular/material';
import { PropuestaService } from '../services/propuesta.service';
import { generalesprop, userClaims, NetUser } from '../modelo/Interfaces';
import { LocalStorageService } from '../services/local-storage.service';
import { CargosService } from '../services/cargos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public app_name = "Propuestas de Crédito";

  // userclaims: userClaims;
  idUsuario: string = "";
  user: NetUser = {
    FirstName: "",
    LastName: ""
  };

  constructor(private router: Router,
    public authService: AuthService,
    public dialog: MatDialog,
    private propuestaservice: PropuestaService,
    private localS: LocalStorageService,
    private cargos: CargosService
  ) { 

    this.idUsuario = JSON.parse(localStorage.getItem('id'));
  }

  ngOnInit() {
    console.log("entro cerrar sesion");
    this.cargos.getDataNetUserById(this.idUsuario).subscribe(data => {
      this.user = data;
      console.log(data);
    });
    // forkJoin(
    //   this.authService.getUserClaims(),
    // ).subscribe(([P]) => {
    //   this.userclaims = P;
    //   console.log(this.userclaims);
    // }, error => {
    //   console.error(error);
    // });
  }

  cerrarSesion(){

  }

  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }

  confeccionarPropuesta() {
    let dat: string = '';
    let tit: string = '¿Confeccionará una propuesta de crédito?';
    const memoRef = this.dialog.open(MensajeComponent, {
      data: {
        message: dat,
        titulo: tit
      }
    });
    memoRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.agregarPropuestaInicial();
      }
    });
  }

  agregarPropuestaInicial() {

    let bodyG: generalesprop = {
      IdPropuesta: "00000000-0000-0000-0000-000000000000",
      NumPropuesta: 0,
      GrupoEconomico: "",
      NumGrupoEconomico: "",
      CalificacionScoreRate: "",
      IdActividad: 0,
      IdSector: "",
      ParteRelacionada: false,
      ClasificacionRiesgo: "",
      ProvisionSIB: "",
      ProvisionNIIF: "",
      idUnidadResponsable: "D8993EB8-7BC4-48E0-A831-6E312BBCC2DC",
      CentroCosto: "",
      EjecutivoCuenta: "",
      CumpleListaExclusion: false,
      IdNivelAprobacion: 0,
      IdExposicion: "00000000-0000-0000-0000-000000000000",
      IdFacilidades: "00000000-0000-0000-0000-000000000000",
      FechaPropuesta: undefined,
      FechaUltimaRevision: undefined,
      FechaProximaRevision: undefined,
      FechaCreacion: new Date(),
      FechaModificacion: new Date(),
      FechaRevision: undefined,
      IdUsuario: this.idUsuario,
      IdCompartida: "00000000-0000-0000-0000-000000000000",
      IdRevisor: "00000000-0000-0000-0000-000000000000",
      IdEstado: 1,
      Activa: true
    };
    this.propuestaservice.postDataGeneralesProp(bodyG).subscribe(
      generalesPropuesta => {
        this.router.navigate(['ver-propuesta', generalesPropuesta.IdPropuesta]);
      }
    );
  }

  listaPropuestas() {
    this.router.navigate(['/lista-propuestas']);
  }

  listaAclaratorias() {
    this.router.navigate(['/lista-aclaratorias']);
  }

  listaEnviadas() {
    this.router.navigate(['/lista-enviadas']);
  }

  listaAutonomia() {
    this.router.navigate(['/lista-autonomia']);
  }

  listaCompartidas() {
    this.router.navigate(['/lista-compartidas']);
  }

  listaRevisor() {
    this.router.navigate(['/lista-revisor']);
  }

  listaPreguntas() {
    this.router.navigate(['/lista-preguntas']);
  }

  adminCargos() {
    this.router.navigate(['/admin-cargos']);
  }

  adminUserCargos() {
    this.router.navigate(['/admin-usercargos']);
  }

  adminCuadroAutonomias() {
    this.router.navigate(['/admin-cuadroautonomias']);
  }

  adminUsuarios() {
    // this.router.navigate(['/signup']);
    this.router.navigate(['/lista-usuarios']);
  }

  estado() {
    this.router.navigate(['/estados']);
  }

  libor() {
    this.router.navigate(['/libor']);
  }

}
