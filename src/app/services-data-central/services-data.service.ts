import { Injectable } from '@angular/core';

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
import { MotivosrefinanciamientoService } from '../services/motivosrefinanciamiento.service'
import { AuthService } from 'src/app/services/auth.service';
import { CargosService } from 'src/app/services/cargos.service';
import { GencuadroautonomiasService } from '../services/gencuadroautonomias.service';
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
  DetalleFianza,
  MotivoRefinanciamientos,
  RelUserCargo,
  CuadroAutonomia,
  NetUser
} from '../modelo/Interfaces';
import { GarantiaService } from '../services/garantia.service';
import { FianzaService } from '../services/fianza.service';
import { ParteRelacionada } from '../ver-propuesta/ver-propuesta.component';
import { forkJoin, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServicesDataService {

  public propDevuelta: generalesprop;
  public facilidades: Facilidades[] = [];
  public clasiRiesgo: Riesgos[];
  public unidadRespon: Unidades[];
  public tablaLibor: Libor[];
  public propuesta: TipoPropuestas[];
  public tipoFacilidad: TipoFacilidades[];
  public tipoSubPropuesta: SubTipoPropuestas[];
  public tipoSubFacilidad: SubTipoFacilidad[];
  public proposito: Proposito[];
  public garantia: Garantia[];
  public fianza: Fianza[];
  public motivosRefinanciamiento: MotivoRefinanciamientos[];
  public reglasE: Reglas[];
  public estados: Estados[];
  public actividades: Actividades[];
  public nivelAprobaciones: CuadroAutonomia[];

  /********************************* */
  //aprobaciones
  public cargosUsuario: RelUserCargo[] = [];
  public cargosSinUnidad: RelUserCargo[] = [];
  public gerenteRelacion: RelUserCargo[] = [];
  public gerenteSectorial: RelUserCargo[] = [];
  public gerenteRegional: RelUserCargo[] = [];
  public vpejecutivocredito: RelUserCargo[] = [];
  public vpejecutivonegocio: RelUserCargo[] = [];
  public vpnegocio: RelUserCargo[] = [];
  public vpcredito: RelUserCargo[] = [];
  public oficialcredito: RelUserCargo[] = [];
  public gerentes: RelUserCargo[] = [];
  /********************************* */

  constructor(
    private propuestaservice: PropuestaService,
    private unidadesService: UnidadService,
    private riesgoservice: RiesgoService,
    private storageService: LocalStorageService,
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
    private motivosrefiservice: MotivosrefinanciamientoService,
    private cargo: CargosService,
  ) { }


  iniciar(ids: string) {
    forkJoin(
      this.propuestaservice.getDataGeneralesPropById(ids),
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
      this.motivosrefiservice.getDataMotivoRefinanciamientos(),
      this.cargo.getDataRelUserCargo(),
      this.cargo.getDataRelUserCargosSinUnidad(),
    ).subscribe(([PropuestaID, U, R, P, F, E, ME, A, NA, TSP, TSF, PROPO, GARA, FIAN, REFI, CAR, CARSINUNIDAD]) => {
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
      this.motivosRefinanciamiento = REFI;
      this.cargosUsuario = CAR;
      this.cargosSinUnidad = CARSINUNIDAD;
    }, error => {
      console.error(error);
    },
      () => {
        this.facilidadservice.getDataFacilidadesById(this.propDevuelta.IdPropuesta).subscribe(
          facDevuelta => { this.facilidades = facDevuelta; },
          err => { console.log("fallo al cargar las facilides") },
          () => {
            if (!this.facilidades) {
              alert('No se recuperaron datos de las Facilidades');
            }
          });
      });
  }

  public getEstado(): any {
    let e = this.estados.find(x => (x.IdEstado == this.propDevuelta.IdEstado));
    return e;
  }

  public getUnidadResponsable(): any {
    let u = this.unidadRespon.find(x => (x.IdUnidad == this.propDevuelta.idUnidadResponsable));
    return u;
  }

  public getNombreById(id: string): NetUser{
    let u: NetUser;
    this.cargo.getDataNetUserById(id).subscribe(data => { u = data; });
    console.log(u);
    return u;
  }

  public getIDUsuario() {
    let idUsuario: string = JSON.parse(localStorage.getItem('id'));
    return idUsuario;
  }

  // //***************************************************************************** */
  // this.cargo.getDataNetUserById(this.propDevuelta.IdUsuario).subscribe(data => {
  //   this.revisorForm.get("idUsuario").setValue(data[0].FirstName + " " + data[0].LastName);
  // });
  // this.cargo.getDataNetUserById(this.propDevuelta.IdRevisor).subscribe(data => {
  //   this.revisorForm.get("idRevisor").setValue(data[0].FirstName + " " + data[0].LastName);
  // });
  // //***************************************************************************** */

}
