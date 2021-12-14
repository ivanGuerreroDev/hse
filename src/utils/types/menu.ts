export interface IMenu {
  Estado: string;
  IdModulo: string;
  NombreMenu: string;
  Plataforma: number;
}
export interface IInspecciones {
  Id: string;
  expand: string;
  Tipos: string;
  Inspecciones: string;
}
export interface IObservaciones {
  Id: string;
  titulo: string;
  Formulario: string;
}
export interface ICapacitacion {
  IdDetalleCapacitacion: number;
  IdCapacitacion: number;
  Tipo: string;
  Titulo: string;
  Descripcion: string;
  Categoria: string;
  IdPersona: number,
  EstadoParticipante: boolean
  NombreCompleto: string
}
