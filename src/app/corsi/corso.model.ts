import {DocenteModel} from '../docenti/docente.model';

export interface CorsoModel {
  id: number | null | undefined;
  nome: string | undefined;
  ore: number | null | undefined;
  anno: number | null | undefined;
  docente: DocenteModel | null | undefined;
}
