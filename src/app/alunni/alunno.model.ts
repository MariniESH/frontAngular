import {CorsoModel} from '../corsi/corso.model';

export interface AlunnoModel {
  id: number | undefined | null;
  nome: string;
  cognome: string;
  data: string;
  citta: string;
  voto: number | null | undefined;
  corsi?: CorsoModel[] | null | undefined;
}
