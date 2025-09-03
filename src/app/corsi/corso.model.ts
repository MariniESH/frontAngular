import {DocenteModel} from '../docenti/docente.model';

export interface CorsoModel {
  id: number | null | undefined;
  nome: string | undefined | null;
  ore: number | null | undefined;
  anno: number | null | undefined;
  docente: DocenteModel | null | undefined;
  iscritto: boolean | null | undefined;
}
