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
  IdCapacitacion: string;
  IdTipoCapacitacion: string;
  Tipo: string;
  Titulo: string;
  Categoria: string;
  Cargo: string | undefined;
}
