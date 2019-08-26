export interface UserInterface {
  id?: string;
  Username?: string;
  Password?: string;
}

export interface UserRole {
  IdUsuario?: string;
  Rol?: string;
  NomUsuario?: string;
}

export interface User {
  UserName: string,
  Password: string,
  Email?: string,
  FirstName?: string,
  LastName?: string,
}

export interface tokenResp {
  access_token: string,
  token_type: string,
  expires_in: string
}


export interface generalesprop {
  IdPropuesta: string,
  NumPropuesta: number,
  GrupoEconomico: string,
  NumGrupoEconomico: string,
  CalificacionScoreRate: string,
  IdActividad: number,
  IdSector: string,
  ParteRelacionada: boolean,
  ClasificacionRiesgo: string,
  ProvisionSIB: string,
  ProvisionNIIF: string,
  idUnidadResponsable: string,
  CentroCosto: string,
  EjecutivoCuenta: string,
  CumpleListaExclusion: boolean,
  IdNivelAprobacion: number,
  IdExposicion: string,
  IdFacilidades: string,
  FechaPropuesta: Date,
  FechaUltimaRevision: Date,
  FechaProximaRevision: Date,
  FechaCreacion: Date,
  FechaModificacion: Date,
  FechaRevision: Date,
  IdUsuario?: string,
  IdCompartida: string,
  IdRevisor?: string,
  IdEstado: number,
  Activa: boolean,
};

export interface ListaPropuestas {
  IdPropuesta: string;
  NumPropuesta: number;
  GrupoEconomico: string;
  NomUnidad: string;
  IdEstado: number;
  NomEstado: string;
  FirstName: string;
  LastName: string;
};

export interface Facilidades {
  IdFacilidad: string;
  IdPropuesta: string;
  NumFacilidad: number;
  TipoPropuesta: string;
  SubPropuesta: string;
  TipoFacilidad: string;
  SubFacilidad: string;
  Deudor: string;
  Monto: number;
  Saldo: number;
  MontoInicial: number;
  UltimaAprobacion: number;
  FechaPrimeraAprobacion: Date;
  ClienteMaster: string;
  CategoriaRiesgo: string;
  ComisionVarias: number;
  ComisionComex: number;
  CondicionesFinancieras: string;
  CurvaTesoreria: number;
  EstadoDoclegal: string;
  FormaDesembolso: string;
  Ltv: number;
  MontoGarantia: number;
  OtrasCondiciones: string;
  PlazoDesembolso: string;
  PlazoFacilidad: string;
  PlazoFacilidadAbierto: string;
  PlazoPrestamo: string;
  Spread: number;
  TasaInteres: number;
  TasaPreviaAprobada: number;
  TasaRecomendada: number;
  VentaRapida: number;
  OpinionRiesgo: string;
  DetalleCambio?: string;
  DetallePropositos?: string
}

export interface Riesgos {
  IdRiesgo: string;
  NomRiesgo: string;
  Valor: string;
  Descripcion: string;
  Activa: boolean;
}

export interface Aprobacion {
  value: string;
  viewValue: string;
}

export interface AprobacionGroup {
  disabled?: boolean;
  name: string;
  aprobador?: Aprobacion[];
}

export interface NivelAprobaciones {
  IdNivelAprobacion: string;
  Autonomia: string;
  Aprobador: string;
  NomAprobador: string;
}

export interface Libor {
  banca: string;
  meses: string;
  libor: number;
  spread: number;
}

export interface TipoFacilidades {
  IdTipoFacilidad: string;
  NomTipoFacilidad: string;
  Grupo: string;
  Activa: boolean;
}

export interface SubTipoFacilidad {
  IdTipoFacilidad: string,
  IdSubTipoFacilidad: string,
  NomSubTipoFacilidad: string,
}

export interface TipoPropuestas {
  IdTipoPropuesta: string,
  NomTipoPropuesta: string,
  Descripcion: string,
  Activa: boolean
}

export interface SubTipoPropuestas {
  IdTipoPropuesta: string,
  IdSubTipoPropuesta: string,
  NomSubPropuesta: string,
}

export interface Unidades {
  IdUnidad: string,
  NomUnidad: string,
  CentroCosto: string,
  Descripcion: string,
  Activa: boolean
}

export interface Reglas {
  GrupoReglas: string,
  IdReglaExposicion: string,
  TipoTotal: string,
  IdPropuesta: string,
  IdFacilidad: string,
  NomTipoPropuesta: string,
  NomTipoFacilidad: string,
  ReglaSumaActual: string,
  ReglaSumaAnterior: string,
  OperacionActual: string,
  OperacionAnterior: string
}

export interface Estados {
  IdEstado: number,
  NomEstado: string,
  Predecesor: string,
  Sucesor: string,
  Descripcion: string,
  Activa: boolean
}

export interface Actividades {
  idActividad: number,
  ActividadEconomica: string,
  Sector: string,
  SubSector: string,
  Categoria: string,
  Activa: boolean
}

export interface CurvaLibor {
  IdCurva: string,
  IdUnidad: string,
  Etiqueta: string,
  C1: number,
  C2: number,
  C3: number,
  C4: number,
  C5: number,
  C6: number,
  C7: number,
  C8: number,
  C9: number,
  C10: number
}

export interface EstadoPropuesta {
  IdPropuesta: string,
  IdUsuario: string,
  IdEstado: number,
  IdRevisor?: string,
  FechaRevision?: Date,
}

export interface Proposito {
  IdTipoFacilidad: string,
  IdProposito: string,
  NomProposito: string
}

export interface DetalleProposito {
  IdDetalleProposito?: string,
  IdProposito: string,
  IdFacilidad: string,
  Detalle?: string,
  NomProposito?: string
}

export interface Garantia {
  IdTipoFacilidad?: string,
  IdGarantia: string,
  NomGarantia: string
}

export interface DetalleGarantia {
  IdDetalleGarantia?: string,
  IdGarantia: string,
  IdFacilidad: string,
  Detalle?: string,
  NomGarantia?: string
}

export interface Fianza {
  IdTipoFacilidad?: string,
  IdFianza: string,
  NomFianza: string,
}

export interface DetalleFianza {
  IdDetalleFianza?: string,
  IdFianza: string,
  IdFacilidad: string,
  Detalle?: string,
  NomFianza?: string
}

export interface DetalleGarantia {
  IdDetalleGarantia?: string,
  IdGarantia: string,
  IdFacilidad: string,
  Detalle?: string,
  NomGarantia?: string
}

export interface DetalleExposicion {
  Deudor: string,
  TipoFacilidad: string,
  Propuesta: string,
  RiesgoAprobado: number,
  SaldoUtilizacion: number,
  RiesgoPropuesto: number,
  Variacion: number
}

export interface tablaDatosFacilidad {
  Deudor: string,
  IdPropuesta: string,
  Propuesta: string,
  IdSubPropuesta: string,
  SubPropuesta: string,
  IdTipoFacilidad: string,
  TipoFacilidad: string,
  Monto: number,
  Saldo: number,
  MontoInicial: number,
  UltimaAprobacion: number
}

export interface Cargo {
  IdCargo?: string,
  Nivel: string,
  NomCargo: string,
}

export interface UserCargo {
  IdUser: string,
  FirstName: string,
  LastName: string,
  IdCargo: string,
  NomCargo: string
}

export interface NetUser {
  Id?: string,
  FirstName: string,
  LastName: string
}

export interface RelUserCargo {
  IdUser: string,
  IdCargo: string,
  Nivel?: string,
  IdUnidad: string,
  NomCargo?: string,
  NomUnidad?: string,
  Firma?: string,
  FirstName?: string,
  LastName?: string, 
  ValorConGarantiaA?: number,
  ValorSBLC?: number,
	ValorSinGarantia?: number,
	IdGrupoCargo?: number,
	NomGrupoCargo?: string
}

export interface AutonomiaCuadro { 
  IdCargoA: number,
  IdGrupoCargo: number,
  NomGrupoCargo: string, 
  NomCargo: string, 
  Nivel: number,
  ValorConGarantiaA: number,
  ValorSinGarantia: number,
  ValorSBLC: number,
}

export interface CuadroAutonomia {
  IdGrupoCargo: number, 
  IdTipoAutonomia?: number,
  NomGrupoCargo: string,
  NomCargoA: string,
  NomCargoB: string,
  ValorConGarantiaA: number,
  ValorConGarantiaB: number,
  ValorSinGarantia: number,
  ValorSBLC: number
}

export interface CargosAutonomia {
  Id: string, 
  IdGrupoCargo: number, 
  NomGrupoCargo: string,
  IdCargoA: number,
  IdCargoB: number
}

export interface MotivoRefinanciamientos {
IdMotivoRefina: string,
NomMotivoRefina: string,
Activa:  boolean
}

export interface userClaims {
  Id: string,
  UserName: string,
  Password: string,
  FirstName: string,
  LastName: string,
  Roles: string[]
};