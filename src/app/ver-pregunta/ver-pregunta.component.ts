import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { PropuestaService } from '../services/propuesta.service';
import { UnidadService } from '../services/unidad.service';
import { RiesgoService } from '../services/riesgo.service';
import { FacilidadService } from '../services/facilidad.service';
import { TipopropuestaService } from '../services/tipopropuesta.service';
import { TipofacilidadService } from '../services/tipofacilidad.service';
import { SubtipopropuestaService } from '../services/subtipopropuesta.service';
import { SubtipofacilidadService } from '../services/subtipofacilidad.service';
import { ReglaexposicionService } from '../services/reglaexposicion.service';
import { EstadoService } from '../services/estado.service';
import { ActividadService } from '../services/actividad.service';
import { NivelaprobacionService } from '../services/nivelaprobacion.service';
import { EstadopropuestaService } from '../services/estadopropuesta.service';
import { PropositoService } from '../services/proposito.service';
import { AuthService } from 'src/app/services/auth.service';

import { LocalStorageService } from '../services/local-storage.service';
import { Libor } from '../modelo/Storage';

import {
  Facilidades,
  TipoPropuestas,
  Riesgos,
  Unidades,
  generalesprop,
  TipoFacilidades,
  SubTipoPropuestas,
  SubTipoFacilidad,
  Reglas,
  Estados,
  Actividades,
  NivelAprobaciones,
  EstadoPropuesta,
  Proposito,
  DetalleProposito,
  DetalleExposicion,
  tablaDatosFacilidad,
  Garantia,
  DetalleGarantia,
  Fianza,
  DetalleFianza
} from '../modelo/Interfaces';

import { MensajeComponent } from '../mensaje/mensaje.component';
import { DialogPropositosComponent } from '../dialog-propositos/dialog-propositos.component';
import { DialogGarantiasComponent } from '../dialog-garantias/dialog-garantias.component';
import { DialogFianzaComponent } from '../dialog-fianza/dialog-fianza.component';
import { GarantiaService } from '../services/garantia.service';
import { FianzaService } from '../services/fianza.service';

// catalogos de la propuesta
export interface Diccionario {
  value: string;
  viewValue: string;
}
export interface Diccionario02 {
  id: string;
  value: string;
}
export interface Actividad {
  id: string;
  actividad: string;
  sector: string
}
export interface ParteRelacionada {
  value: boolean;
  viewValue: string;
}

@Component({
  selector: 'app-ver-pregunta',
  templateUrl: './ver-pregunta.component.html',
  styleUrls: ['./ver-pregunta.component.css']
})
export class VerPreguntaComponent implements OnInit {

  /************************************************* */
  //Aprobaciones
  showVPRiesgo: boolean = false;
  showVPCredito: boolean = false;
  showVPVicepre: boolean = false;
  showMontoGarantia: boolean = false;
  showVentaRapida: boolean = false;
  showPropositoMultiple: boolean[] = [];
  showPropositoSimple: boolean = false;
  showPlazoAbierto: boolean = false;
  showPlazoCerrado: boolean = true;
  showPlazoDesembolso: boolean = true;
  showPlazoPrestamo: boolean = false;
  showPolizaSeguro: boolean = false;
  showOpinionRiesgo: boolean = false;
  showComisionComex: boolean = false;
  showMotivoRefinanciamiento: boolean = false;
  showDetalleCambio: boolean = false;
  showVerDetalle: boolean = false;

  showAproSeccion: boolean = false;
  showAproDelegada: boolean = false;
  showAproDirectivo: boolean = false;

  selectedGarantia: string;
  /************************************************* */
  Unidad: string = '';
  idUnidad: string = '';
  Centro: string = '';
  Provision: string = '';
  FechaPropuesta: Date;
  FechaUltima: Date;
  FechaProxima: Date;
  FechaPrimera: Date;
  Sector: string = '';
  Nivel: string = '';
  SubPropuesta: string = '';
  SubFacilidad: string = '';
  //****************************** */

  propDevuelta: generalesprop;
  numProp: number;
  headerProp: string;
  headerEsta: string;

  fac: Facilidades[] = [];
  clasiRiesgo: Riesgos[];
  unidadRespon: Unidades[];
  tablaLibor: Libor[];
  propuesta: TipoPropuestas[];
  tipoFacilidad: TipoFacilidades[];
  tipoSubPropuesta: SubTipoPropuestas[];
  tipoSubFacilidad: SubTipoFacilidad[];
  proposito: Proposito[];
  garantia: Garantia[];
  fianza: Fianza[];
  userclaims = {
    Id: '',
    UserName: '',
    Password: '',
    FirstName: '',
    LastName: '',
    Roles: []
  };

  propuestaCondicion: SubTipoPropuestas[] = [];
  facilidadCondicion: SubTipoFacilidad[] = [];
  propositoCondicion: Proposito[];
  parteRela: ParteRelacionada[] = [
    { value: true, viewValue: "Si" },
    { value: false, viewValue: "No" }
  ];
  reglasE: Reglas[];
  estados: Estados[];
  actividades: Actividades[];
  nivelAprobaciones: NivelAprobaciones[];
  ids: string; // ID de la propuesta seleccionada en mis porpuestas
  libor: number;
  spread: number;
  ls: string;
  tasarecome: number;

  detallePropositoBD: DetalleProposito[] = [];
  detalleGarantiaBD: DetalleGarantia[] = [];
  detalleFianzaBD: DetalleFianza[] = [];
  /********************************* */

  disableEnviar: boolean = true;

  //******************************** */
  //Exposicion Corporativa
  prop0F1C1: number = 0.0;
  prop0F1C2: number = 0.0;
  prop0F1C3: number = 0.0;
  prop0F2C1: number = 0.0;
  prop0F2C2: number = 0.0;
  prop0F2C3: number = 0.0;
  prop0F3C1: number = 0.0;
  prop0F3C2: number = 0.0;
  prop0F3C3: number = 0.0;

  TotalRiesgoAprobado: number = 0.0;
  TotalSaldoUtilizado: number = 0.0;
  TotalRiesgoPropuesto: number = 0.0;
  TotalVariacion: number = 0.0;

  propu: string = "";
  subpr: string = "";
  facil: string = "";
  monto: number = 0.0;
  saldo: number = 0.0;
  montoInicial: number = 0.0;
  ultimaAprobacion: number = 0.0;
  montoGarantia: number = 0.0;
  datosDetalle: tablaDatosFacilidad[] = [];
  datosResumen: DetalleExposicion[] = [];

  esLinea: boolean = false;
  esPrestamo: boolean = false;

  acumMontoActual: number = 0.0;
  acumSaldoActual: number = 0.0;
  acumMontoAnterior: number = 0.0;
  acumSaldoAnterior: number = 0.0;
  acumGarantiaActual: number = 0.0;
  acumGarantiaAnterior: number = 0.0;
  acumPropuestaAnterior: number = 0.0;
  acumPropuestaActual: number = 0.0;
  acumPrendarioMontoActual: number = 0.0;
  acumPrendarioSaldoActual: number = 0.0;
  acumPrendarioMontoAnterior: number = 0.0;
  acumPrendarioSaldoAnterior: number = 0.0;

  public loading: boolean;
  public formulario: boolean;

  riesgoAmbientalSocial: Diccionario[] = [
    { value: 'Alta', viewValue: 'Alta' },
    { value: 'Media Alta', viewValue: 'Media Alta' },
    { value: 'Media', viewValue: 'Media' },
    { value: 'Bajo', viewValue: 'Bajo' }
  ];

  leagueForm: FormGroup;
  propuestaForm: FormGroup;

  idUsuario: string = "";

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public router: Router,
    private route: ActivatedRoute,
    private propuestaservice: PropuestaService,
    private unidadesService: UnidadService,
    private riesgoservice: RiesgoService,
    public storageService: LocalStorageService,
    private facilidadservice: FacilidadService,
    private tipopropuestaservice: TipopropuestaService,
    private tipofacilidadservice: TipofacilidadService,
    private subtipopropuestaservice: SubtipopropuestaService,
    private subtipofacilidadservice: SubtipofacilidadService,
    private reglasexposicion: ReglaexposicionService,
    private estadoservice: EstadoService,
    private actividadesservice: ActividadService,
    private nivelaprobacionesservice: NivelaprobacionService,
    private estadopropuesta: EstadopropuestaService,
    private propositoservice: PropositoService,
    private garantiaservice: GarantiaService,
    private fianzaservice: FianzaService,
    private localS: LocalStorageService,
    private userClaims: AuthService
  ) {

    this.loading = true;
    this.propuestaForm = this.fb.group({
      propuesta_detalle: this.fb.group({
        fechaPropuesta: "",
        fechaUltima: "",
        fechaProxima: "",
        idPropuesta: "",
        numPropuesta: "",
        grupoEconomico: "",
        numGrupoEconomico: "",
        calificacionScoreRate: "",
        idActividad: "",
        sector: "",
        parteRelacionada: "",
        clasificacionRiesgo: "",
        provisionSIB: "",
        provisionNIIF: "",
        unidadResponsable: "",
        centroCosto: "",
        ejecutivoCuenta: "",
        aprobacionControl: "",
      }),
      facilidades: this.fb.array([])
    });

  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => { this.ids = params.id; });

    forkJoin(
      this.propuestaservice.getDataGeneralesPropById(this.ids),
      this.unidadesService.getDataUnidades(),
      this.riesgoservice.getDataRiesgos(),
      this.tipopropuestaservice.getDataTipoPropuestas(),
      this.tipofacilidadservice.getDataTipoFacilidades(),
      this.reglasexposicion.getDataReglas(),
      this.estadoservice.getDataEstados(),
      this.actividadesservice.getDataActividades(),
      this.nivelaprobacionesservice.getDataNivelAprobaciones(),
      this.subtipopropuestaservice.getDataSubTipoPropuestas(),
      this.subtipofacilidadservice.getDataSubTipoFacilidad(),
      this.propositoservice.getDataPropositos(),
      this.garantiaservice.getDataGarantias(),
      this.fianzaservice.getDataFianzas(),
      // this.userClaims.getUserClaims()
    ).subscribe(([PropuestaID, U, R, P, F, E, ME, A, NA, TSP, TSF, PROPO, GARA, FIAN]) => {
      this.propDevuelta = PropuestaID;
      this.unidadRespon = U;
      this.clasiRiesgo = R;
      this.propuesta = P;
      this.tipoFacilidad = F;
      this.reglasE = E;
      this.estados = ME;
      this.actividades = A;
      this.nivelAprobaciones = NA;
      this.tipoSubPropuesta = TSP;
      this.tipoSubFacilidad = TSF;
      this.proposito = PROPO;
      this.garantia = GARA;
      this.fianza = FIAN;
      // this.userclaims = USERCLAIMS;
    }, error => {
      console.error(error);
    },
      () => {
        this.tablaLibor = this.storageService.getLibor();
        this.formulario = false;

        this.facilidadservice.getDataFacilidadesById(this.propDevuelta.IdPropuesta).subscribe(
          facDevuelta => { this.fac = facDevuelta; },
          err => { console.log("fallo al cargar las facilides") },
          () => {
            if (!this.fac) {
              alert('No se recuperaron datos de las Facilidades');
            }
            else {
              this.iniciar();
            }
          });
      });
  }

  iniciar() {
    
    this.idUsuario = JSON.parse(localStorage.getItem('id'));

    var faci: Facilidades[] = [];

    this.propositoCondicion = [];
    this.facilidadCondicion = [];

    this.numProp = this.propDevuelta.NumPropuesta;
    this.headerProp = "Propuesta de Crédito N°" + this.numProp.toString();
    let e = this.estados.find(x => (x.IdEstado == this.propDevuelta.IdEstado)).NomEstado;

    this.headerEsta = "(" + e + ")";

    this.FechaPropuesta = this.propDevuelta.FechaPropuesta;
    this.FechaUltima = this.propDevuelta.FechaUltimaRevision;
    this.FechaProxima = this.propDevuelta.FechaProximaRevision;

    // this.propuestaForm.get('fechaPropuesta').setValue(this.propDevuelta.FechaPropuesta);
    // this.propuestaForm.get('fechaUltima').setValue(this.propDevuelta.FechaUltimaRevision);
    // this.propuestaForm.get('fechaProxima').setValue(this.propDevuelta.FechaProximaRevision);
    this.propForm.get('grupoEconomico').setValue(this.propDevuelta.GrupoEconomico);
    this.propForm.get('numGrupoEconomico').setValue(this.propDevuelta.NumGrupoEconomico);
    this.propForm.get('calificacionScoreRate').setValue(this.propDevuelta.CalificacionScoreRate);
    this.propForm.get('idActividad').setValue(this.propDevuelta.IdActividad);
    this.propForm.get('sector').setValue(this.propDevuelta.IdSector);
    this.propForm.get('parteRelacionada').setValue(this.propDevuelta.ParteRelacionada);
    this.propForm.get('clasificacionRiesgo').setValue(this.propDevuelta.ClasificacionRiesgo);
    this.propForm.get('provisionSIB').setValue(this.propDevuelta.ProvisionSIB);
    this.propForm.get('provisionNIIF').setValue(this.propDevuelta.ProvisionNIIF);

    this.propForm.get('unidadResponsable').setValue(this.propDevuelta.idUnidadResponsable);
    this.selectUnidad(this.propDevuelta.idUnidadResponsable);

    this.propForm.get('centroCosto').setValue(this.propDevuelta.CentroCosto);
    this.propForm.get('ejecutivoCuenta').setValue(this.propDevuelta.EjecutivoCuenta);
    this.propForm.get('aprobacionControl').setValue(this.propDevuelta.IdNivelAprobacion);

    let indice: number;
    for (let item of this.fac) {

      indice = item.NumFacilidad - 1;

      this.facilidadForm.insert(indice,
        this.fb.group({
          idFacilidad: item.IdFacilidad,
          deudor: item.Deudor,
          master: item.ClienteMaster,
          monto: item.Monto,
          saldo: item.Saldo,
          montoInicial: item.MontoInicial,
          ultimaAprobacion: item.UltimaAprobacion,
          clienteMaster: item.ClienteMaster,
          fechaPrimeraAprobacion: item.FechaPrimeraAprobacion,
          propuesta: item.TipoPropuesta,
          subPropuesta: item.SubPropuesta,
          tipoFacilidad: item.TipoFacilidad,
          subTipoFacilidad: item.SubFacilidad,
          motivoRefinaciamiento: '',
          propositoMultiple: [],
          categoriaRiesgo: item.CategoriaRiesgo,
          plazoPrestamo: item.PlazoPrestamo,
          plazoFacilidadAbierto: item.PlazoFacilidadAbierto,
          plazoFacilidad: item.PlazoFacilidad,
          plazoDesembolso: item.PlazoDesembolso,
          tasaInteres: item.TasaInteres,
          libor: item.CurvaTesoreria,
          spread: item.Spread,
          tasaRecomendada: item.TasaRecomendada,
          tasaPreviaAprobada: item.TasaPreviaAprobada,
          comisionVarias: item.ComisionVarias,
          comisionComex: item.ComisionComex,
          formaDesembolso: item.FormaDesembolso,
          garantia: item.MontoGarantia,
          ventaRapida: item.VentaRapida,
          montoGarantia: item.MontoGarantia,
          fianza: '',
          ltv: item.Ltv,
          polizaSeguro: '',
          condicionesFinancieras: item.CondicionesFinancieras,
          covenant: '',
          covenantVenta: '',
          covenantCredito: '',
          covenantAutonomia: '',
          estadoDoclegal: item.EstadoDoclegal,
          otrasCondiciones: item.OtrasCondiciones,
          opinionRiesgo: item.OpinionRiesgo,
          detalleCambio: item.DetalleCambio,
          detallePropositos: item.DetallePropositos,
          detalleProposito: this.fb.array([]),
          detalleGarantia: this.fb.array([]),
          detalleFianza: this.fb.array([])
        })
      );

      this.cargarPropositos(item.TipoFacilidad, item.SubFacilidad);
      this.cargarSubPropuesta(item.TipoPropuesta);
      this.cargarSubFacilidad(item.TipoFacilidad);
      this.selectPropuesta(item.TipoPropuesta, indice);

    } // fin ciclo facilidad

    // *******************************************************************
    var arrayControl = this.propuestaForm.get('facilidades') as FormArray;
    for (let item of arrayControl.controls) {

      this.propositoservice.getDataDetallePropositosById(item.get('idFacilidad').value).subscribe(
        res => {
          // let a = this.facilidadForm.at(indice).get('detalleProposito') as FormArray;
          let a = item.get('detalleProposito') as FormArray;
          for (let item of res) {

            let detalleProposito = {
              IdFacilidad: item.IdFacilidad,
              IdProposito: item.IdProposito,
              NomProposito: item.NomProposito,
              Detalle: item.Detalle
            };

            a.push(this.fb.group(detalleProposito));
          }
        },
        err => { console.log("Fallo la recuperación de propósitos") },
        () => {
          this.selectSubFacilidad(item.get("subTipoFacilidad").value, indice);
        }
      );

      this.garantiaservice.getDataDetalleGarantiasById(item.get('idFacilidad').value).subscribe(
        res => {
          // let a = this.facilidadForm.at(indice).get('detalleProposito') as FormArray;
          let a = item.get('detalleGarantia') as FormArray;
          for (let item of res) {

            let detalleGarantia = {
              IdDetalleGarantia: item.IdDetalleGarantia,
              IdFacilidad: item.IdFacilidad,
              IdGarantia: item.IdGarantia,
              NomGarantia: item.NomGarantia,
              Detalle: item.Detalle
            };
            console.log(detalleGarantia);
            a.push(this.fb.group(detalleGarantia));
          }
        },
        err => { console.log("Fallo la recuperación de propósitos") },
        () => {
          this.selectGarantia(item, indice);
        }
      );

      this.fianzaservice.getDataDetalleFianzasById(item.get('idFacilidad').value).subscribe(
        res => {
          // let a = this.facilidadForm.at(indice).get('detalleProposito') as FormArray;
          let a = item.get('detalleFianza') as FormArray;
          for (let item of res) {

            let detalleFianza = {
              IdDetalleFianza: item.IdDetalleFianza,
              IdFacilidad: item.IdFacilidad,
              IdFianza: item.IdFianza,
              NomFianza: item.NomFianza,
              Detalle: item.Detalle
            };
            console.log(detalleFianza);
            a.push(this.fb.group(detalleFianza));
          }
        },
        err => { console.log("Fallo la recuperación de fianza") },
        () => {
          // this.selectGarantia(item, indice);
        }
      );

    }
    // *******************************************************************


    this.loading = false;
    this.formulario = true;
    this.disableEnviar = false;
  }

  get propForm() {
    return this.propuestaForm.get("propuesta_detalle");
  }

  get facilidadForm() {
    return this.propuestaForm.get('facilidades') as FormArray;
  }

  get teams(): FormGroup {
    return this.fb.group({
      team_name: "",
      players: this.fb.array([this.players])
    });
  }

  get players(): FormGroup {
    return this.fb.group({
      player_name: "",
      player_number: ""
    });
  }

  agregarfacilidad(id?: string): FormGroup {
    return this.fb.group({
      idFacilidad: id,
      deudor: "",
      master: "",
      monto: "",
      saldo: "",
      montoInicial: "",
      ultimaAprobacion: "",
      clienteMaster: "",
      fechaPrimeraAprobacion: "",
      propuesta: "",
      subPropuesta: "",
      tipoFacilidad: "",
      subTipoFacilidad: "",
      motivoRefinaciamiento: "",
      propositoMultiple: [],
      categoriaRiesgo: "",
      plazoPrestamo: "",
      plazoFacilidadAbierto: "",
      plazoFacilidad: "",
      plazoDesembolso: "",
      tasaInteres: "",
      tasaPreviaAprobada: "",
      libor: "",
      spread: "",
      tasaRecomendada: "",
      comisionVarias: "",
      comisionComex: "",
      formaDesembolso: "",
      garantia: [],
      ventaRapida: "",
      montoGarantia: "",
      fianza: [],
      ltv: "",
      polizaSeguro: "",
      condicionesFinancieras: "",
      covenant: "",
      estadoDoclegal: "",
      otrasCondiciones: "",
      opinionRiesgo: "",
      detalleCambio: "",
      detallePropositos: "",
      detalleProposito: this.fb.array([]),
      detalleGarantia: this.fb.array([]),
      detalleFianza: this.fb.array([])
    });
  }

  addTeam() {
    (this.leagueForm.get("teams") as FormArray).push(this.teams);
  }

  deleteTeam(index) {
    (this.leagueForm.get("teams") as FormArray).removeAt(index);
  }

  addPlayer(team) {
    team.get("players").push(this.players);
  }

  deletePlayer(team, index) {
    team.get("players").removeAt(index);
  }

  deleteDetalleProposito(fac, index) {
    let idProposito = fac.get("detalleProposito").at(index).get('IdProposito').value;
    this.propositoservice.getDataDetallePropositosById(fac.get('idFacilidad').value).subscribe(
      res => { this.detallePropositoBD = res; },
      err => { console.log("Fallo la recuperación de propósitos") },
      () => {
        if (this.detallePropositoBD.find(x => (x.IdProposito == idProposito))) {
          let dpe = this.detallePropositoBD.find(x => (x.IdProposito == idProposito)).IdDetalleProposito;
          this.propositoservice.deleteDataDetallePropositosById(dpe).subscribe(
            res => { },
            err => console.log("fallo delete de propositos")
          );
        }
      });
    fac.get("detalleProposito").removeAt(index);

    this.selectSubFacilidad("", index, fac);
  }

  deleteDetalleGarantia(fac, index) {
    let idGarantia = fac.get("detalleGarantia").at(index).get('IdGarantia').value;
    this.garantiaservice.getDataDetalleGarantiasById(fac.get('idFacilidad').value).subscribe(
      res => { this.detalleGarantiaBD = res; },
      err => { console.log("Fallo la recuperación de propósitos") },
      () => {
        if (this.detalleGarantiaBD.find(x => (x.IdGarantia == idGarantia))) {
          let dpe = this.detalleGarantiaBD.find(x => (x.IdGarantia == idGarantia)).IdDetalleGarantia;
          this.garantiaservice.deleteDataDetalleGarantiasById(dpe).subscribe(
            res => { },
            err => console.log("fallo delete de propositos"),
            () => {
              fac.get("detalleGarantia").removeAt(index);
              this.selectGarantia(fac, index);
            }
          );
        }
      });

    this.garantiaservice.getDataDetalleGarantiasById(fac.get('idFacilidad').value).subscribe(
      res => { this.detalleGarantiaBD = res; },
      err => { console.log("Fallo la recuperación de propósitos") });
  }

  deleteDetalleFianza(fac, index) {
    let idFianza = fac.get("detalleFianza").at(index).get('IdFianza').value;
    this.fianzaservice.getDataDetalleFianzasById(fac.get('idFacilidad').value).subscribe(
      res => { this.detalleFianzaBD = res; },
      err => { console.log("Fallo la recuperación de propósitos") },
      () => {
        if (this.detalleFianzaBD.find(x => (x.IdFianza == idFianza))) {
          let dpe = this.detalleFianzaBD.find(x => (x.IdFianza == idFianza)).IdDetalleFianza;
          this.fianzaservice.deleteDataDetalleFianzasById(dpe).subscribe(
            res => { },
            err => console.log("fallo delete de Fianza"),
            () => {
              fac.get("detalleFianza").removeAt(index);
              // this.selectFianza(fac, index);
            }
          );
        }
      });

    this.fianzaservice.getDataDetalleFianzasById(fac.get('idFacilidad').value).subscribe(
      res => { this.detalleFianzaBD = res; },
      err => { console.log("Fallo la recuperación de fianza") });
  }

  addFacilidad_BD() {
    let n = this.facilidadForm.length;
    let bodyF: Facilidades;
    bodyF = {
      IdFacilidad: "00000000-0000-0000-0000-000000000000",
      IdPropuesta: this.propDevuelta.IdPropuesta,
      NumFacilidad: n + 1,
      Deudor: "",
      Monto: 0.0,
      Saldo: 0.0,
      MontoInicial: 0.0,
      UltimaAprobacion: 0.0,
      FechaPrimeraAprobacion: new Date(),
      ClienteMaster: "",
      TipoPropuesta: "00000000-0000-0000-0000-000000000000",
      SubFacilidad: "00000000-0000-0000-0000-000000000000",
      TipoFacilidad: "00000000-0000-0000-0000-000000000000",
      SubPropuesta: "00000000-0000-0000-0000-000000000000",
      CategoriaRiesgo: "",
      PlazoPrestamo: "",
      PlazoFacilidadAbierto: "",
      PlazoFacilidad: "",
      PlazoDesembolso: "",
      TasaInteres: 0.0,
      TasaPreviaAprobada: 0.0,
      CurvaTesoreria: 0.0,
      Spread: 0.0,
      TasaRecomendada: 0.0,
      ComisionVarias: 0.0,
      ComisionComex: 0.0,
      FormaDesembolso: "",
      VentaRapida: 0.0,
      MontoGarantia: 0.0,
      Ltv: 0.0,
      CondicionesFinancieras: "",
      EstadoDoclegal: "",
      OtrasCondiciones: "",
      OpinionRiesgo: "",
      DetalleCambio: "",
      DetallePropositos: ""
    };

    let i: number;
    let id: string;
    this.facilidadservice.postDataFacilidades(bodyF).subscribe(
      facilidad => { id = facilidad.IdFacilidad; }, //devolver el id en id
      err => { console.log("fallo el agregar una facilidad"); },
      () => { this.facilidadForm.push(this.agregarfacilidad(id)); });
  }

  deleteFacilidad(indice: number) {
    let idfac: string = this.facilidadForm.at(indice).get('idFacilidad').value;

    let dat: string = '';
    let tit: string = '';
    dat = "Esta seguro de remover la facilidad";
    // tit = "Remover propuesta" + row;
    const memoRef = this.dialog.open(MensajeComponent, {
      data: {
        message: dat,
        titulo: tit
      }
    });

    memoRef.afterClosed().subscribe(result => {
      if (result == true) {

        this.propositoservice.deleteDataDetallePropositosByIdFacilidad(idfac).subscribe(
          data => console.log("Facilidad eliminada " + data)
        );

        this.facilidadservice.deleteDataFacilidadesById(idfac).subscribe(
          data => console.log("Facilidad eliminada " + data),
          err => console.error("Fallo eliminar facilidad" + err),
          () => {
            this.facilidadForm.removeAt(indice);
          }
        );
      }
    });
  }

  calcularE(i: number) {

    this.prop0F1C1 = 0.0;
    this.prop0F1C2 = 0.0;
    this.prop0F1C3 = 0.0;
    this.prop0F2C1 = 0.0;
    this.prop0F2C2 = 0.0;
    this.prop0F2C3 = 0.0;
    this.prop0F3C1 = 0.0;
    this.prop0F3C2 = 0.0;
    this.prop0F3C3 = 0.0;

    let MontoActual: number = 0.0;
    let SaldoActual: number = 0.0;
    let MontoAnterior: number = 0.0;
    let SaldoAnterior: number = 0.0;

    this.acumMontoActual = 0.0;
    this.acumSaldoActual = 0.0;
    this.acumMontoAnterior = 0.0;
    this.acumSaldoAnterior = 0.0;

    this.acumGarantiaActual = 0.0;
    this.acumGarantiaAnterior = 0.0;
    this.acumPrendarioMontoActual = 0.0;
    this.acumPrendarioSaldoActual = 0.0;
    this.acumPrendarioMontoAnterior = 0.0;
    this.acumPrendarioSaldoAnterior = 0.0;

    this.TotalRiesgoPropuesto = 0.0;
    this.TotalRiesgoAprobado = 0.0;
    this.TotalVariacion = 0.0;

    let datos: tablaDatosFacilidad[] = [];
    let resum: DetalleExposicion[] = [];
    let tp: string;
    let tf: string;
    let tsp: string;

    var arrayControl = this.propuestaForm.get('facilidades') as FormArray;
    for (let item of arrayControl.controls) {

      this.propu = item.get('propuesta').value;
      this.subpr = item.get('subPropuesta').value;
      this.facil = item.get('tipoFacilidad').value;
      this.monto = item.get('monto').value;
      this.saldo = item.get('saldo').value;
      this.montoInicial = item.get('montoInicial').value;
      this.ultimaAprobacion = item.get('ultimaAprobacion').value;
      this.montoGarantia = item.get('montoGarantia').value;

      tp = this.propuesta.find(x => (x.IdTipoPropuesta == this.propu)).NomTipoPropuesta;
      tf = this.tipoFacilidad.find(x => (x.IdTipoFacilidad == this.facil)).NomTipoFacilidad;

      datos.push({
        Deudor: item.get('deudor').value,
        IdPropuesta: this.propu,
        Propuesta: tp,
        IdSubPropuesta: this.subpr,
        SubPropuesta: "",
        IdTipoFacilidad: this.facil,
        TipoFacilidad: tf,
        Monto: this.monto,
        Saldo: this.saldo,
        MontoInicial: this.montoInicial,
        UltimaAprobacion: this.ultimaAprobacion,
      });

    }
    // this.datosDetalle = datos;

    for (let item of datos) {

      if (this.reglasE.find(x => (x.IdPropuesta == item.IdPropuesta && x.IdFacilidad == item.IdTipoFacilidad))) {
        let msan: string = this.reglasE.find(x => (x.IdPropuesta == item.IdPropuesta && x.IdFacilidad == item.IdTipoFacilidad)).ReglaSumaAnterior;
        let msac: string = this.reglasE.find(x => (x.IdPropuesta == item.IdPropuesta && x.IdFacilidad == item.IdTipoFacilidad)).ReglaSumaActual;
        let opac: string = this.reglasE.find(x => (x.IdPropuesta == item.IdPropuesta && x.IdFacilidad == item.IdTipoFacilidad)).OperacionActual;
        let opan: string = this.reglasE.find(x => (x.IdPropuesta == item.IdPropuesta && x.IdFacilidad == item.IdTipoFacilidad)).OperacionAnterior;
        let etiq: string = this.reglasE.find(x => (x.IdPropuesta == item.IdPropuesta && x.IdFacilidad == item.IdTipoFacilidad)).TipoTotal;
        let LP: string = this.tipoFacilidad.find(x => (x.IdTipoFacilidad == item.IdTipoFacilidad)).Grupo;

        //Riesgo Propuesto
        if (msac == "Monto") {
          if (opac == "Resta") {
            this.acumMontoActual = this.acumMontoActual - item.Monto;
            MontoActual = -item.Monto;
          }
          else if (opac == "Suma") {
            this.acumMontoActual = this.acumMontoActual + item.Monto;
            MontoActual = item.Monto;
          }
        }
        else if (msac == "Saldo") {
          if (opac == "Resta") {
            this.acumSaldoActual = this.acumSaldoActual - item.Saldo;
            SaldoActual = -item.Saldo;
          }
          else if (opac == "Suma") {
            this.acumSaldoActual = this.acumSaldoActual + item.Saldo;
            SaldoActual = item.Saldo;
          }
        }
        else if (msac == "UltimaAprobacion") {
          if (opac == "Resta") {
            this.acumMontoActual = this.acumMontoActual - item.UltimaAprobacion;
          }
          else if (opac == "Suma") {
            this.acumMontoActual = this.acumMontoActual + item.UltimaAprobacion;
          }
        }

        //Riesgo Aprobado
        if (msan == "Monto") {
          if (opan == "Resta") {
            this.acumMontoAnterior = this.acumMontoAnterior - item.Monto;
            MontoAnterior = -item.Monto;
          }
          else if (opan == "Suma") {
            this.acumMontoAnterior = this.acumMontoAnterior + item.Monto;
            MontoAnterior = item.Monto;
          }
        }
        else if (msan == "Saldo") {
          if (opan == "Resta") {
            this.acumSaldoAnterior = this.acumSaldoAnterior - item.Saldo;
            SaldoAnterior = -item.Saldo;
          }
          else if (opan == "Suma") {
            this.acumSaldoAnterior = this.acumSaldoAnterior + item.Saldo;
            SaldoAnterior = item.Saldo;
          }
        }
      }

      /********************************* */

      resum.push({
        Deudor: item.Deudor,
        RiesgoPropuesto: (MontoActual + SaldoActual),
        SaldoUtilizacion: SaldoActual,
        RiesgoAprobado: (MontoAnterior + SaldoAnterior),
        Propuesta: item.Propuesta,
        TipoFacilidad: item.TipoFacilidad,
        Variacion: (MontoActual + SaldoActual) - (MontoAnterior + SaldoAnterior)
      });

    }
    this.datosResumen = resum;

    for (let item of resum) {
      this.TotalRiesgoPropuesto = this.TotalRiesgoPropuesto + item.RiesgoPropuesto;
      this.TotalRiesgoAprobado = this.TotalRiesgoAprobado + item.RiesgoAprobado;
      this.TotalVariacion = this.TotalVariacion + item.Variacion;
    }

    this.prop0F1C1 = this.acumMontoActual + this.acumSaldoActual;
    this.prop0F1C2 = this.acumMontoAnterior + this.acumSaldoAnterior;

    this.prop0F2C1 = this.acumPrendarioMontoActual + this.acumPrendarioSaldoActual + this.acumGarantiaActual;
    this.prop0F2C2 = this.acumPrendarioMontoAnterior + this.acumPrendarioSaldoAnterior;

    this.prop0F1C3 = this.prop0F1C1 - this.prop0F1C2;
    this.prop0F2C3 = this.prop0F2C1 - this.prop0F2C2;
    this.prop0F3C3 = this.prop0F3C1 - this.prop0F3C2;

    this.prop0F3C1 = this.prop0F1C1 - this.prop0F2C1;
    this.prop0F3C2 = this.prop0F1C2 - this.prop0F2C2;
    this.prop0F3C3 = this.prop0F3C1 - this.prop0F3C2;

  } //FIN DEL CALCULAR DETALLE

  plazoFacilidad: Diccionario[] = [
    { value: '1', viewValue: '1 Mes' },
    { value: '2', viewValue: '2 Meses' },
    { value: '3', viewValue: '3 Meses' },
    { value: '6', viewValue: '6 Meses' },
    { value: '12', viewValue: '12 Meses' },
    { value: '24', viewValue: '24 Meses' },
    { value: '36', viewValue: '36 Meses' }
  ];

  plazoDesembolso: Diccionario[] = [
    { value: '1', viewValue: '1 Mes' },
    { value: '2', viewValue: '2 Meses' },
    { value: '3', viewValue: '3 Meses' },
    { value: '6', viewValue: '6 Meses' },
    { value: '12', viewValue: '12 Meses' },
    { value: '24', viewValue: '24 Meses' },
    { value: '36', viewValue: '36 Meses' },
    { value: '48', viewValue: '48 Meses' },
    { value: '60', viewValue: '60 Meses' },
    { value: '72', viewValue: '72 Meses' }
  ];
  cargarSubPropuesta(idTipoPropuesta: string) {
    this.propuestaCondicion = [];
    for (let item of this.tipoSubPropuesta) {
      if (item.IdTipoPropuesta == idTipoPropuesta) {
        this.propuestaCondicion.push(item);
      }
    }
  }

  cargarSubFacilidad(idTipoFacilidad: string) {
    this.facilidadCondicion = [];
    for (let i of this.tipoSubFacilidad) {
      if (i.IdTipoFacilidad == idTipoFacilidad) {
        this.facilidadCondicion.push(i);
      }
    }
  }

  cargarPropositos(idTipoFacilidad: string, idSubTipoFacilidad?: string) {
    this.propositoCondicion = [];
    for (let i of this.proposito) {
      if (i.IdTipoFacilidad == idTipoFacilidad) {
        this.propositoCondicion.push(i);
      }
    }
  }

  selectPropuesta(idTipoPropuesta: string, i: number) {

    this.propuestaCondicion = [];
    this.showMotivoRefinanciamiento = false;
    this.showOpinionRiesgo = false;
    this.showDetalleCambio = false;

    if (idTipoPropuesta.toUpperCase() === '775EA5AF-9710-4557-B9F2-C37E1494AFBB') {
      this.showOpinionRiesgo = true;
    }
    else if (idTipoPropuesta.toUpperCase() === 'A501DA2A-272F-4415-92B6-479632882409') {
      this.showMotivoRefinanciamiento = true;
    }
    else if (idTipoPropuesta.toUpperCase() === 'AF6ADCCD-2120-44EA-9436-2090499978EE' ||
      idTipoPropuesta.toUpperCase() === '68A849E5-62C2-4D8F-93BF-D8DE4D7EF3AB') {
      this.showDetalleCambio = true;
    }

    this.cargarSubPropuesta(idTipoPropuesta);
  }

  selectSubPropuesta(id: string, indice: number) {
    if (id) {
      this.SubPropuesta = this.propuestaCondicion.find(x => (x.IdSubTipoPropuesta == id)).NomSubPropuesta;
    }
  }

  selectTipoFacilidad(idTipoFacilidad: string, i: number): void {
    //Condición para Linea de Crédito Rotativa y No Rotativa

    this.cargarSubFacilidad(idTipoFacilidad);
    this.cargarPropositos(idTipoFacilidad);

    this.showPropositoMultiple[i] = false;
    this.showPropositoSimple = true;
    this.showComisionComex = false;

    //mover el control de esto a base de datos**************
    if (idTipoFacilidad.toUpperCase() === '8B2AF69F-D2CD-4CA8-940C-C1825FAFF14A') {
      //     // Plazo máximo de un año para LCR
      this.pushPlazoDoceMeses();
      this.pushPlazoCurvaDesembolso();
      this.showPlazoCerrado = true;
      this.showPlazoAbierto = false;
      this.showPlazoPrestamo = false;
      this.showPlazoDesembolso = true;
    }
    else if (idTipoFacilidad.toUpperCase() === "1A514F69-9CAA-4085-A6F6-8D2F9696DAD7") {
      // Plazo máximo de un año para Linea de Credito No Rotativa
      this.pushPlazoDoceMeses();
      this.pushPlazoCurvaDesembolso();
      this.showPlazoCerrado = true;
      this.showPlazoAbierto = false;
      this.showPlazoPrestamo = false;
      this.showPlazoDesembolso = true;
    }
    else if (idTipoFacilidad.toUpperCase() === "B50546E2-5A45-4105-93C1-F0C5723B63FC") {
      this.pushPlazoDoceMeses();
      this.pushPlazoCurvaDesembolso();
      this.showPlazoCerrado = true;
      this.showPlazoAbierto = false;
      this.showPlazoPrestamo = true;
      this.showPlazoDesembolso = true;
    }
    else if (idTipoFacilidad.toUpperCase() === "F53920E5-61E0-4D44-B351-B025F59CB900") {
      this.pushPlazoDoceMeses();
      this.showPlazoCerrado = true;
      this.showPlazoAbierto = false;
      this.showPlazoPrestamo = false;
      this.showPlazoDesembolso = false;
    }
    else if (idTipoFacilidad.toUpperCase() === "2F7A28DF-F8D6-418E-B8C2-CD314868071F") {
      //Carta de Credito
      this.pushPlazoDoceMeses();
      this.showPlazoCerrado = true;
      this.showPlazoAbierto = false;
      this.showPlazoPrestamo = false;
      this.showPlazoDesembolso = false;
      this.showComisionComex = true;
    }
    else if ((idTipoFacilidad.toUpperCase() === 'E021079D-1E12-4079-A6E9-53CABC7D1FF7') ||
      (idTipoFacilidad.toUpperCase() === '8A35D381-0258-45BE-A265-FC7AB22F16D0') ||
      (idTipoFacilidad.toUpperCase() === 'F365A68C-64D3-42F8-89CE-5C98314989C6') ||
      (idTipoFacilidad.toUpperCase() === 'B4DE3F4E-D70F-457E-AEEF-1AF05BBCF056') ||
      (idTipoFacilidad.toUpperCase() === 'F9878542-3A68-4F5C-A949-25574469B4DE') ||
      (idTipoFacilidad.toUpperCase() === 'FB9D4AE4-34EB-44A1-84CC-D0E33FD995B0') ||
      (idTipoFacilidad.toUpperCase() === 'A82E48A4-DD9B-4B4D-B3CA-F563C84C158D')) {

      // this.facilidadForm.at(i).get('propositoMultiple').disable();
      // this.facilidadForm.at(i).get('propositoMultiple').setValue('');
      // this.facilidadForm.at(i).get('subTipoFacilidad').disable();
      // this.facilidadForm.at(i).get('subTipoFacilidad').setValue('');

      this.showPlazoCerrado = false;
      this.showPlazoAbierto = true;
      this.showPlazoPrestamo = false;
      this.showPlazoDesembolso = false;
    }
    //**************************************************** */
  }

  //plazo de la Curva de Tesorería
  pushPlazoCurva(): void {
    this.plazoFacilidad = [];
    this.plazoFacilidad.push({ value: '1', viewValue: '1 Mes' });
    this.plazoFacilidad.push({ value: '2', viewValue: '2 Meses' });
    this.plazoFacilidad.push({ value: '3', viewValue: '3 Meses' });
    this.plazoFacilidad.push({ value: '6', viewValue: '6 Meses' });
    this.plazoFacilidad.push({ value: '12', viewValue: '12 Meses' });
    this.plazoFacilidad.push({ value: '24', viewValue: '24 Meses' });
    this.plazoFacilidad.push({ value: '36', viewValue: '36 Meses' });
  }

  pushPlazoDoceMeses(): void {
    this.plazoFacilidad = [];
    this.plazoFacilidad.push({ value: '1', viewValue: '1 Mes' });
    this.plazoFacilidad.push({ value: '2', viewValue: '2 Meses' });
    this.plazoFacilidad.push({ value: '3', viewValue: '3 Meses' });
    this.plazoFacilidad.push({ value: '6', viewValue: '6 Meses' });
    this.plazoFacilidad.push({ value: '12', viewValue: '12 Meses' });
  }

  pushPlazoCurvaDesembolso(): void {
    this.plazoDesembolso = [];
    this.plazoDesembolso.push({ value: '1', viewValue: '1 Mes' });
    this.plazoDesembolso.push({ value: '2', viewValue: '2 Meses' });
    this.plazoDesembolso.push({ value: '3', viewValue: '3 Meses' });
    this.plazoDesembolso.push({ value: '6', viewValue: '6 Meses' });
    this.plazoDesembolso.push({ value: '12', viewValue: '12 Meses' });
    this.plazoDesembolso.push({ value: '24', viewValue: '24 Meses' });
    this.plazoDesembolso.push({ value: '36', viewValue: '36 Meses' });
    this.plazoDesembolso.push({ value: '48', viewValue: '48 Meses' });
    this.plazoDesembolso.push({ value: '60', viewValue: '60 Meses' });
    this.plazoDesembolso.push({ value: '72', viewValue: '72 Meses' });
  }

  selectSubFacilidad(tipo?: string, i?: number, fac?): void {
    this.SubFacilidad = tipo;
    if (fac) {
      if (fac.get("detalleProposito").length > 1) {
        fac.get('subTipoFacilidad').setValue(('AF8D26AD-5C69-4F08-BBBA-A64A06439430').toLowerCase()); //Multiple
      }
      else if (fac.get("detalleProposito").length == 1) {
        fac.get('subTipoFacilidad').setValue(('E7C17135-6043-41DC-A7BF-F2C9E77F5C82').toLowerCase()); //Simple o específica
      }
    }
  }

  selectUnidad(id: string) {
    this.Centro = this.unidadRespon.find(x => (x.IdUnidad == id)).CentroCosto;
    this.Unidad = this.unidadRespon.find(x => (x.IdUnidad == id)).NomUnidad;
    this.idUnidad = this.unidadRespon.find(x => (x.IdUnidad == id)).IdUnidad;
    this.propForm.get('centroCosto').setValue(this.Centro);
  }
  selectRiesgo(id: string) {
    this.Provision = this.clasiRiesgo.find(x => (x.IdRiesgo == id)).Valor;
    this.propForm.get('provisionSIB').setValue(this.Provision);
  }
  selectActividad(id: number) {
    this.Sector = this.actividades.find(x => (x.idActividad == id)).Sector;
    this.propForm.get('sector').setValue(this.Sector.toLowerCase());
  }

  selectNivelAprobacion(id: string) {
    this.Nivel = this.nivelAprobaciones.find(x => (x.IdNivelAprobacion == id)).Autonomia;
    if (this.Nivel == "Autonomía") {
      this.showAproSeccion = true;
      this.showAproDirectivo = true;
      this.showAproDelegada = false;
    }
    else {
      this.showAproSeccion = true;
      this.showAproDirectivo = false;
      this.showAproDelegada = true;
    }
  }

  //********************************************************************************** */
  selectFechaPropuesta(event: MatDatepickerInputEvent<Date>) {
    this.FechaPropuesta = event.value;
  }
  selectFechaUltima(event: MatDatepickerInputEvent<Date>) {
    this.FechaUltima = event.value;
  }
  selectFechaProxima(event: MatDatepickerInputEvent<Date>) {
    this.FechaProxima = event.value;
  }
  selectFechaPrimeraAprobacion(event: MatDatepickerInputEvent<Date>) {
    this.FechaPrimera = event.value;
  }
  //********************************************************************************** */


  selectGarantiaDialog(fac, i?): void {
    let garantiaSeleccionado: Garantia;
    let detalleGarantia: DetalleGarantia;
    let dgsel: string[] = this.localS.getGarantiasId();

    var arrayControl = fac.get("detalleGarantia") as FormArray;

    this.garantiaservice.getDataDetalleGarantiasById(fac.get('idFacilidad').value).subscribe(
      res => { this.detalleGarantiaBD = res; },
      err => { console.log("Fallo la recuperación de propósitos") },
      () => {

        for (let itemP of dgsel) {
          if (!this.detalleGarantiaBD.find(x => (x.IdGarantia == itemP))) {

            garantiaSeleccionado = this.garantia.find(x => (x.IdGarantia == itemP));

            detalleGarantia = {
              IdFacilidad: fac.get('idFacilidad').value,
              IdGarantia: garantiaSeleccionado.IdGarantia,
              NomGarantia: garantiaSeleccionado.NomGarantia,
              Detalle: ""
            };

            this.garantiaservice.postDataDetalleGarantias(detalleGarantia).subscribe(
              res => {
                detalleGarantia.IdDetalleGarantia = res.IdDetalleGarantia;
                fac.get("detalleGarantia").push(
                  this.fb.group(detalleGarantia)
                );

                this.selectGarantia(fac, i);

              });
            this.garantiaservice.getDataDetalleGarantiasById(fac.get('idFacilidad').value).subscribe(
              res => { this.detalleGarantiaBD = res; },
              err => { console.log("Fallo la recuperación de garantias") });
          }
          else {
            alert("Garantia existente");
          }
        } //fin del recorrido de los propositos

      });


  }

  selectPropositoDialog(fac, i?): void {
    let propositoSeleccionado: Proposito;
    let detalleProposito: DetalleProposito;
    let dpsel: string[] = this.localS.getPropositosId();

    // var arrayControl = fac.get("detalleProposito") as FormArray;

    this.propositoservice.getDataDetallePropositosById(fac.get('idFacilidad').value).subscribe(
      res => { this.detallePropositoBD = res; },
      err => { console.log("Fallo la recuperación de propósitos") },
      () => {

        for (let itemP of dpsel) {
          if (!this.detallePropositoBD.find(x => (x.IdProposito == itemP))) {

            propositoSeleccionado = this.proposito.find(x => (x.IdProposito == itemP));

            detalleProposito = {
              IdFacilidad: fac.get('idFacilidad').value,
              IdProposito: propositoSeleccionado.IdProposito,
              NomProposito: propositoSeleccionado.NomProposito,
              Detalle: ""
            };
            this.propositoservice.postDataDetallePropositos(detalleProposito).subscribe(
              res => {
                fac.get("detalleProposito").push(
                  this.fb.group(detalleProposito)
                );
                this.selectSubFacilidad("", i, fac);
              });

            this.propositoservice.getDataDetallePropositosById(fac.get('idFacilidad').value).subscribe(
              res => { this.detallePropositoBD = res; },
              err => { console.log("Fallo la recuperación de propósitos") });

          }
          else {
            alert("El propósito ya esta agregado");
          }
        } //fin del recorrido de los propositos

      });
  }

  selectFianzaDialog(fac, i?): void {
    let fianzaSeleccionado: Fianza;
    let detalleFianza: DetalleFianza;
    let fisel: string[] = this.localS.getFianzaId();

    var arrayControl = fac.get("detalleFianza") as FormArray;

    this.fianzaservice.getDataDetalleFianzasById(fac.get('idFacilidad').value).subscribe(
      res => { this.detalleFianzaBD = res; },
      err => { console.log("Fallo la recuperación de las fianzas") },
      () => {

        for (let itemF of fisel) {
          if (!this.detalleFianzaBD.find(x => (x.IdFianza == itemF))) {

            fianzaSeleccionado = this.fianza.find(x => (x.IdFianza == itemF));

            detalleFianza = {
              IdFacilidad: fac.get('idFacilidad').value,
              IdFianza: fianzaSeleccionado.IdFianza,
              NomFianza: fianzaSeleccionado.NomFianza,
              Detalle: ""
            };

            this.fianzaservice.postDataDetalleFianzas(detalleFianza).subscribe(
              res => {
                detalleFianza.IdDetalleFianza = res.IdDetalleFianza;
                fac.get("detalleFianza").push(
                  this.fb.group(detalleFianza)
                );
                // this.selectFianza(fac, i);
              });
            this.fianzaservice.getDataDetalleFianzasById(fac.get('idFacilidad').value).subscribe(
              res => { this.detalleFianzaBD = res; },
              err => { console.log("Fallo la recuperación de fianzas") });
          }
          else {
            alert("Fianza existente");
          }
        } //fin del recorrido de los propositos
      });
  }

  hintProposito: string = "";
  selectPropositoOpen(tipo: any, i: number): void {
    // let subFac = this.facilidadForm.at(i).get('subTipoFacilidad').value;
    // if (subFac.toUpperCase() == 'AF8D26AD-5C69-4F08-BBBA-A64A06439430') {
    //   if ((this.propositoL.length < 2 && tipo == false)) {
    //     this.hintProposito = 'Selecciona mínimo dos propósitos';
    //   }
    //   else {
    //     this.hintProposito = '';
    //   }
    // }
  }

  selectGarantia(fac?, i?: number) {
    console.log(">>>>>>>" + fac);
    this.showMontoGarantia = false;
    this.showVentaRapida = false;
    this.showPolizaSeguro = false;

    if (fac) {
      let arrayControl = fac.get("detalleGarantia") as FormArray;
      for (let garan of arrayControl.controls) {

        if (garan.get("IdGarantia").value == "402f91dc-b7f3-4e3e-b1c0-e845f2df7453") {
          this.showMontoGarantia = true;
        }
        else if (garan.get("IdGarantia").value == "deefff13-065f-4df1-b3dd-3c8cbda2c471") {
          this.showVentaRapida = true;
        }
      }
      if (arrayControl.length > 0) {
        this.showPolizaSeguro = true;
      } else {
        this.showPolizaSeguro = false;
      }
    }
  }

  calcularLTV(i: number) {
    let m = this.facilidadForm.at(i).get('monto').value;
    let r = this.facilidadForm.at(i).get('ventaRapida').value;
    if (r > 0) {
      let t = m / r;
      this.facilidadForm.at(i).get('ltv').setValue(t);
    }
  }

  calcularTasaLibor(i: number) {

    var arrayControl = this.propuestaForm.get('facilidades') as FormArray;
    var item = arrayControl.at(i);

    item.get('libor').setValue('0.0');
    item.get('spread').setValue('0.0');
    item.get('tasaRecomendada').setValue('0.0');

    let meses: string = item.get('plazoDesembolso').value;

    this.libor = this.tablaLibor.find(x => (x.banca == this.idUnidad && x.meses == meses)).libor;
    this.spread = this.tablaLibor.find(x => (x.banca == this.idUnidad && x.meses == meses)).spread;
    this.ls = this.libor.toString() + " + " + this.spread.toString();
    this.tasarecome = this.libor + this.spread;

    item.get('libor').setValue(this.libor);
    item.get('spread').setValue(this.spread);
    item.get('tasaRecomendada').setValue(this.tasarecome);
  }

  openMsg(i: number) {

    let pro: string = this.facilidadForm.at(i).get('propuesta').value

    let dat: string = '';
    if (pro == undefined || pro == null) {
      dat = "Seleccione el tipo de propuesta";
      const memoRef = this.dialog.open(MensajeComponent, {
        data: {
          message: dat
        }
      });

      memoRef.afterClosed().subscribe((confirmed: boolean) => {
        console.log('Memo de cambio cerrado');
      });
    }
    else if (pro.toLocaleUpperCase() == "041D93A6-F072-4977-89F5-D80AE8C4F968" ||
      pro.toLocaleUpperCase() == "1ADD3AB8-9F43-4642-8534-E220A8A44E06" ||
      pro.toLocaleUpperCase() == "7708E72F-E7BC-4671-BC57-8F0C47BD72AE") {
      dat = "No aplica memo de cambios a propuestas: nuevas, mención o cancelación";
      const memoRef = this.dialog.open(MensajeComponent, {
        data: {
          message: dat
        }
      });

      memoRef.afterClosed().subscribe((confirmed: boolean) => {
        console.log('Memo de cambio cerrado');
      });
    }
    else {
      this.router.navigate(['/Memo']);
    }
  }

  verDetalles() {
    this.showVerDetalle = !this.showVerDetalle;
  }

  dialogoProposito(fac, i) {
    let tf = fac.get('tipoFacilidad').value;
    let ft = this.tipoFacilidad.find(x => (x.IdTipoFacilidad == tf)).NomTipoFacilidad;
    let dat: string = ft;
    let tit = "Propósitos";
    let propSelect: string[] = [];

    const dialogRef = this.dialog.open(DialogPropositosComponent, {
      width: '45%',
      data: {
        message: dat,
        titulo: tit,
        proposito: this.propositoCondicion,
        propSelect: []
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.selectPropositoDialog(fac, i);
      }
    });
  }

  dialogoGarantia(fac, i) {
    let tf = fac.get('tipoFacilidad').value;
    let dat: string = "";
    let tit = "Garantias";

    const dialogRef = this.dialog.open(DialogGarantiasComponent, {
      width: '45%',
      data: {
        message: dat,
        titulo: tit,
        garantia: this.garantia,
        garaSelect: []
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.selectGarantiaDialog(fac, i);
      }
    });
  }

  dialogoFianza(fac, i) {
    let tf = fac.get('tipoFacilidad').value;
    let dat: string = "";
    let tit = "Fianzas";
    let garaSelect: string[] = [];

    const dialogRef = this.dialog.open(DialogFianzaComponent, {
      width: '45%',
      data: {
        message: dat,
        titulo: tit,
        fianza: this.fianza,
        garaSelect: []
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.selectFianzaDialog(fac, i);
      }
    });
  }

  guardarPropuesta() {

    let dat: string = '';
    let tit = "Guardar Propuesta";

    const memoRef = this.dialog.open(MensajeComponent, {
      data: {
        message: dat,
        titulo: tit
      }
    });

    memoRef.afterClosed().subscribe(result => {
      if (result == true) {
        console.log(this.localS.getUserID());
        if (this.ids != null) {
          this.putPropuesta();
        }
        else {
          this.postPropuesta();
        }
      }
    });
  }

  // ****************************************************************************************************
  // Guardar Propuesta
  postPropuesta() {

    let Generales: generalesprop;
    let dataFacilidades: Facilidades;
    // let boolParteRela: boolean = this.propuestaForm.get("parteRelacionada").value == "Si" ? true : false;

    let bodyG: generalesprop = {
      IdPropuesta: "00000000-0000-0000-0000-000000000000",
      NumPropuesta: 0,
      GrupoEconomico: this.propuestaForm.get("grupoEconomico").value,
      NumGrupoEconomico: this.propuestaForm.get("numGrupoEconomico").value,
      CalificacionScoreRate: this.propuestaForm.get("calificacionScoreRate").value,
      IdActividad: this.propuestaForm.get("idActividad").value,
      IdSector: this.propuestaForm.get("sector").value,
      ParteRelacionada: this.propuestaForm.get("parteRelacionada").value,
      ClasificacionRiesgo: this.propuestaForm.get("clasificacionRiesgo").value,
      ProvisionSIB: this.propuestaForm.get("provisionSIB").value,
      ProvisionNIIF: this.propuestaForm.get("provisionNIIF").value,
      idUnidadResponsable: this.propuestaForm.get('unidadResponsable').value,
      CentroCosto: this.Centro,
      EjecutivoCuenta: this.propuestaForm.get("ejecutivoCuenta").value,
      CumpleListaExclusion: false,
      IdNivelAprobacion: this.propuestaForm.get('aprobacionControl').value,
      IdExposicion: "00000000-0000-0000-0000-000000000000",
      IdFacilidades: "00000000-0000-0000-0000-000000000000",
      FechaPropuesta: this.FechaPropuesta,
      FechaUltimaRevision: this.FechaUltima,
      FechaProximaRevision: this.FechaProxima,
      FechaCreacion: new Date(),
      FechaModificacion: new Date(),
      FechaRevision: this.propDevuelta.FechaRevision,
      IdUsuario: this.localS.getUserID(),
      IdCompartida: "00000000-0000-0000-0000-000000000000",
      IdEstado: 1,
      Activa: true
    };

    this.propuestaservice.postDataGeneralesProp(bodyG).subscribe(
      generalesPropuesta => {
        Generales = generalesPropuesta

        if (!Generales) {
          console.log("fallo al insertar datos generales de la propuesta");
        }
        else {
          var arrayControl = this.facilidadForm;
          var bodyF: Facilidades;

          for (var n = 0; n <= arrayControl.length - 1; n++) {
            var tp = arrayControl.at(n).get('propuesta').value;
            var tsp = arrayControl.at(n).get('subPropuesta').value;
            var tf = arrayControl.at(n).get('tipoFacilidad').value;
            var tsf = arrayControl.at(n).get('subTipoFacilidad').value;

            bodyF = {
              IdFacilidad: "00000000-0000-0000-0000-000000000000",
              IdPropuesta: Generales.IdPropuesta,
              NumFacilidad: n + 1,
              Deudor: arrayControl.at(n).get('deudor').value === null ? "" : arrayControl.at(n).get('deudor').value,
              Monto: arrayControl.at(n).get('monto').value === null ? 0 : arrayControl.at(n).get('monto').value,
              Saldo: arrayControl.at(n).get('saldo').value === null ? 0 : arrayControl.at(n).get('saldo').value,
              MontoInicial: arrayControl.at(n).get('montoInicial').value === null ? 0 : arrayControl.at(n).get('montoInicial').value,
              UltimaAprobacion: arrayControl.at(n).get('ultimaAprobacion').value === null ? 0 : arrayControl.at(n).get('ultimaAprobacion').value,
              FechaPrimeraAprobacion: this.FechaPrimera,
              ClienteMaster: arrayControl.at(n).get('fechaPrimeraAprobacion').value === null ? "" : arrayControl.at(n).get('fechaPrimeraAprobacion').value,

              TipoPropuesta: ((tp === null || typeof tp === "undefined"))
                ? "00000000-0000-0000-0000-000000000000"
                : tp,

              SubPropuesta: ((tp === null || typeof tp === "undefined"))
                ? "00000000-0000-0000-0000-000000000000"
                : tsp,

              TipoFacilidad: ((tf === null || typeof tf === "undefined"))
                ? "00000000-0000-0000-0000-000000000000"
                : tf,

              SubFacilidad: ((tf === null || typeof tf === "undefined"))
                ? "00000000-0000-0000-0000-000000000000"
                : tsf,

              CategoriaRiesgo: (arrayControl.at(n).get('categoriaRiesgo').value === null) ? "" : arrayControl.at(n).get('categoriaRiesgo').value,
              PlazoPrestamo: (arrayControl.at(n).get('plazoPrestamo').value === null) ? "" : arrayControl.at(n).get('plazoPrestamo').value,
              PlazoFacilidadAbierto: (arrayControl.at(n).get('plazoFacilidadAbierto').value === null) ? "" : arrayControl.at(n).get('plazoFacilidadAbierto').value,
              PlazoFacilidad: (arrayControl.at(n).get('plazoFacilidad').value === null) ? "" : arrayControl.at(n).get('plazoFacilidad').value,
              PlazoDesembolso: (arrayControl.at(n).get('plazoDesembolso').value === null) ? "" : arrayControl.at(n).get('plazoDesembolso').value,
              TasaInteres: (arrayControl.at(n).get('tasaInteres').value === null) ? 0 : arrayControl.at(n).get('tasaInteres').value,
              TasaPreviaAprobada: (arrayControl.at(n).get('tasaPreviaAprobada').value === null) ? 0 : arrayControl.at(n).get('tasaPreviaAprobada').value,
              CurvaTesoreria: (arrayControl.at(n).get('libor').value === null) ? 0 : arrayControl.at(n).get('libor').value,
              Spread: (arrayControl.at(n).get('spread').value === null) ? 0 : arrayControl.at(n).get('spread').value,
              TasaRecomendada: (arrayControl.at(n).get('tasaRecomendada').value === null) ? 0 : arrayControl.at(n).get('tasaRecomendada').value,
              ComisionVarias: (arrayControl.at(n).get('comisionVarias').value === null) ? 0 : arrayControl.at(n).get('comisionVarias').value,
              ComisionComex: (arrayControl.at(n).get('comisionComex').value === null) ? 0 : arrayControl.at(n).get('comisionComex').value,
              FormaDesembolso: (arrayControl.at(n).get('formaDesembolso').value === null) ? "" : arrayControl.at(n).get('formaDesembolso').value,
              VentaRapida: (arrayControl.at(n).get('ventaRapida').value === null) ? 0 : arrayControl.at(n).get('ventaRapida').value,
              MontoGarantia: (arrayControl.at(n).get('montoGarantia').value === null) ? 0 : arrayControl.at(n).get('montoGarantia').value,
              Ltv: (arrayControl.at(n).get('ltv').value === null) ? 0 : arrayControl.at(n).get('ltv').value,
              CondicionesFinancieras: (arrayControl.at(n).get('condicionesFinancieras').value === null) ? "" : arrayControl.at(n).get('condicionesFinancieras').value,
              EstadoDoclegal: (arrayControl.at(n).get('estadoDoclegal').value === null) ? "" : arrayControl.at(n).get('estadoDoclegal').value,
              OtrasCondiciones: (arrayControl.at(n).get('otrasCondiciones').value === null) ? "" : arrayControl.at(n).get('otrasCondiciones').value,
              OpinionRiesgo: (arrayControl.at(n).get('opinionRiesgo').value === null) ? "" : arrayControl.at(n).get('opinionRiesgo').value,
              DetalleCambio: (arrayControl.at(n).get('detalleCambio').value === null) ? "" : arrayControl.at(n).get('detalleCambio').value,
              DetallePropositos: (arrayControl.at(n).get('detallePropositos').value === null) ? "" : arrayControl.at(n).get('detallePropositos').value
            };

            this.facilidadservice.postDataFacilidades(bodyF).subscribe(
              facilidad => { dataFacilidades = facilidad; });
          }
        }
      }
    );
  }

  // ****************************************************************************************************
  // Actualizar Propuesta
  putPropuesta() {

    let Generales: generalesprop;
    let dataFacilidades: Facilidades;
    let bodyG: generalesprop = {
      IdPropuesta: this.propDevuelta.IdPropuesta,
      NumPropuesta: this.propDevuelta.NumPropuesta,
      GrupoEconomico: this.propForm.get("grupoEconomico").value,
      NumGrupoEconomico: this.propForm.get("numGrupoEconomico").value,
      CalificacionScoreRate: this.propForm.get("calificacionScoreRate").value,
      IdActividad: this.propForm.get("idActividad").value,
      IdSector: this.propForm.get("sector").value,
      ParteRelacionada: this.propForm.get("parteRelacionada").value,
      ClasificacionRiesgo: this.propForm.get("clasificacionRiesgo").value,
      ProvisionSIB: this.propForm.get("provisionSIB").value,
      ProvisionNIIF: this.propForm.get("provisionNIIF").value,
      idUnidadResponsable: this.propForm.get('unidadResponsable').value,
      CentroCosto: this.propForm.get('centroCosto').value,
      EjecutivoCuenta: this.propForm.get("ejecutivoCuenta").value,
      CumpleListaExclusion: false,
      IdNivelAprobacion: this.propForm.get('aprobacionControl').value,
      IdExposicion: "00000000-0000-0000-0000-000000000000",
      IdFacilidades: "00000000-0000-0000-0000-000000000000",
      FechaPropuesta: this.FechaPropuesta,
      FechaUltimaRevision: this.FechaUltima,
      FechaProximaRevision: this.FechaProxima,
      FechaCreacion: this.propDevuelta.FechaCreacion,
      FechaModificacion: new Date(),
      FechaRevision: this.propDevuelta.FechaRevision,
      IdUsuario: this.idUsuario,
      IdCompartida: "00000000-0000-0000-0000-000000000000",
      IdEstado: 2,
      Activa: true
    };

    this.propuestaservice.putDataGeneralesProp(this.propDevuelta.IdPropuesta, bodyG).subscribe(
      generalesPropuesta => {
        Generales = generalesPropuesta;
        if (!Generales) {
          console.log("fallo al insertar datos generales de la propuesta");
        }
        else {
          var arrayControl = this.facilidadForm;
          var bodyF: Facilidades;
          var idFac: string;

          for (var n = 0; n <= arrayControl.length - 1; n++) {
            var tp = arrayControl.at(n).get('propuesta').value;
            var tsp = arrayControl.at(n).get('subPropuesta').value;
            var tf = arrayControl.at(n).get('tipoFacilidad').value;
            var tsf = arrayControl.at(n).get('subTipoFacilidad').value;
            idFac = arrayControl.at(n).get('idFacilidad').value;
            let detGar = arrayControl.at(n).get('detalleGarantia') as FormArray;
            let detFia = arrayControl.at(n).get('detalleFianza') as FormArray;

            bodyF = {

              IdFacilidad: ((idFac === null || typeof idFac === "undefined"))
                ? "00000000-0000-0000-0000-000000000000"
                : idFac,

              IdPropuesta: Generales.IdPropuesta,
              NumFacilidad: n + 1,
              Deudor: arrayControl.at(n).get('deudor').value === null ? "" : arrayControl.at(n).get('deudor').value,
              Monto: arrayControl.at(n).get('monto').value === null ? 0 : arrayControl.at(n).get('monto').value,
              Saldo: arrayControl.at(n).get('saldo').value === null ? 0 : arrayControl.at(n).get('saldo').value,
              MontoInicial: arrayControl.at(n).get('montoInicial').value === null ? 0 : arrayControl.at(n).get('montoInicial').value,
              UltimaAprobacion: arrayControl.at(n).get('ultimaAprobacion').value === null ? 0 : arrayControl.at(n).get('ultimaAprobacion').value,
              FechaPrimeraAprobacion: arrayControl.at(n).get('fechaPrimeraAprobacion').value,
              ClienteMaster: arrayControl.at(n).get('clienteMaster').value === null ? "" : arrayControl.at(n).get('clienteMaster').value,

              TipoPropuesta: ((tp === null || typeof tp === "undefined"))
                ? "00000000-0000-0000-0000-000000000000"
                : tp,

              SubPropuesta: ((tp === null || typeof tp === "undefined"))
                ? "00000000-0000-0000-0000-000000000000"
                : tsp,

              TipoFacilidad: ((tf === null || typeof tf === "undefined"))
                ? "00000000-0000-0000-0000-000000000000"
                : tf,

              SubFacilidad: ((tf === null || typeof tf === "undefined"))
                ? "00000000-0000-0000-0000-000000000000"
                : tsf,

              CategoriaRiesgo: (arrayControl.at(n).get('categoriaRiesgo').value === null) ? "" : arrayControl.at(n).get('categoriaRiesgo').value,
              PlazoPrestamo: (arrayControl.at(n).get('plazoPrestamo').value === null) ? "" : arrayControl.at(n).get('plazoPrestamo').value,
              PlazoFacilidadAbierto: (arrayControl.at(n).get('plazoFacilidadAbierto').value === null) ? "" : arrayControl.at(n).get('plazoFacilidadAbierto').value,
              PlazoFacilidad: (arrayControl.at(n).get('plazoFacilidad').value === null) ? "" : arrayControl.at(n).get('plazoFacilidad').value,
              PlazoDesembolso: (arrayControl.at(n).get('plazoDesembolso').value === null) ? "" : arrayControl.at(n).get('plazoDesembolso').value,
              TasaInteres: (arrayControl.at(n).get('tasaInteres').value === null) ? 0 : arrayControl.at(n).get('tasaInteres').value,
              TasaPreviaAprobada: (arrayControl.at(n).get('tasaPreviaAprobada').value === null) ? 0 : arrayControl.at(n).get('tasaPreviaAprobada').value,
              CurvaTesoreria: (arrayControl.at(n).get('libor').value === null) ? 0 : arrayControl.at(n).get('libor').value,
              Spread: (arrayControl.at(n).get('spread').value === null) ? 0 : arrayControl.at(n).get('spread').value,
              TasaRecomendada: (arrayControl.at(n).get('tasaRecomendada').value === null) ? 0 : arrayControl.at(n).get('tasaRecomendada').value,
              ComisionVarias: (arrayControl.at(n).get('comisionVarias').value === null) ? 0 : arrayControl.at(n).get('comisionVarias').value,
              ComisionComex: (arrayControl.at(n).get('comisionComex').value === null) ? 0 : arrayControl.at(n).get('comisionComex').value,
              FormaDesembolso: (arrayControl.at(n).get('formaDesembolso').value === null) ? "" : arrayControl.at(n).get('formaDesembolso').value,
              VentaRapida: (arrayControl.at(n).get('ventaRapida').value === null) ? 0 : arrayControl.at(n).get('ventaRapida').value,
              MontoGarantia: (arrayControl.at(n).get('montoGarantia').value === null) ? 0 : arrayControl.at(n).get('montoGarantia').value,
              Ltv: (arrayControl.at(n).get('ltv').value === null) ? 0 : arrayControl.at(n).get('ltv').value,
              CondicionesFinancieras: (arrayControl.at(n).get('condicionesFinancieras').value === null) ? "" : arrayControl.at(n).get('condicionesFinancieras').value,
              EstadoDoclegal: (arrayControl.at(n).get('estadoDoclegal').value === null) ? "" : arrayControl.at(n).get('estadoDoclegal').value,
              OtrasCondiciones: (arrayControl.at(n).get('otrasCondiciones').value === null) ? "" : arrayControl.at(n).get('otrasCondiciones').value,
              OpinionRiesgo: (arrayControl.at(n).get('opinionRiesgo').value === null) ? "" : arrayControl.at(n).get('opinionRiesgo').value,
              DetalleCambio: (arrayControl.at(n).get('detalleCambio').value === null) ? "" : arrayControl.at(n).get('detalleCambio').value,
              DetallePropositos: (arrayControl.at(n).get('detallePropositos').value === null) ? "" : arrayControl.at(n).get('detallePropositos').value
            };

            let detalleGarantia: DetalleGarantia;
            for (let item of detGar.controls) {
              detalleGarantia = {
                IdDetalleGarantia: item.get('IdDetalleGarantia').value,
                Detalle: item.get('Detalle').value,
                IdFacilidad: idFac,
                IdGarantia: item.get('IdGarantia').value
              };
              this.garantiaservice.putDataDetalleGarantias(detalleGarantia.IdDetalleGarantia, detalleGarantia).subscribe();
            }

            let detalleFianza: DetalleFianza;
            for (let item of detFia.controls) {
              detalleFianza = {
                IdDetalleFianza: item.get('IdDetalleFianza').value,
                Detalle: item.get('Detalle').value,
                IdFacilidad: idFac,
                IdFianza: item.get('IdFianza').value
              };
              this.fianzaservice.putDataDetalleFianzas(detalleFianza.IdDetalleFianza, detalleFianza).subscribe();
            }

            this.facilidadservice.putDataFacilidades(idFac, bodyF).subscribe(
              facilidad => { dataFacilidades = facilidad; },
              err => { console.log("Error al actualizar las facilidades") });

          }//fin de loop de facilidades de la UI

        } //fin del sino de la facilidad
      }
    );
  }



  enviarPropuesta() {
    let dat: string = '';
    let tit: string = 'Eviara la propuesta a la Autonomía';

    const memoRef = this.dialog.open(MensajeComponent, {
      data: {
        message: dat,
        titulo: tit
      }
    });

    memoRef.afterClosed().subscribe(result => {
      if (result == true) {

        var cam: EstadoPropuesta = {
          IdEstado: this.propDevuelta.IdEstado,
          IdPropuesta: this.ids,
          IdUsuario: this.idUsuario
        };

        this.estadopropuesta.putDataEstadoPropuesta4(cam).subscribe(
          res=>(console.log(res))
         );
      }
    });
  }

  ajustarPropuesta() {
    let tit: string = this.headerProp;
    let dat: string = 'Enviar a Preguntas aclaratorias';

    const memoRef = this.dialog.open(MensajeComponent, {
      data: {
        message: dat,
        titulo: tit
      }
    });

    memoRef.afterClosed().subscribe(result => {
      if (result == true) {

        var cam: EstadoPropuesta = {
          IdEstado: this.propDevuelta.IdEstado,
          IdPropuesta: this.ids,
          IdUsuario: this.idUsuario
        };

        this.estadopropuesta.putDataEstadoPropuesta5(cam).subscribe(
          res => (console.log(res))
        );
      }
    });
  }

}
