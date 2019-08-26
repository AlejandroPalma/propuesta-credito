export interface Aprobacion {
  IdNivelAprobacion: string;
  Aprobador: string;
}

export interface AprobacionGroup {
  disabled?: boolean;
  Autonomia: string;
  Aprobacion?: Aprobacion[];
}

export interface Libor {
  banca: string;
  meses: string;
  libor: number;
  spread: number;
}

export interface Task {
  title: string;
  descripcion: string;
}




