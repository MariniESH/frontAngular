import {CorsoModel} from './corso.model';

export const CORSI_DUMMY: CorsoModel[] = [
  {
    id: 1,
    nome: "Java",
    ore: 500,
    anno: 2008,
    docente: { id: 3, nome: null, cognome: null, data: null},
    iscritto: false
  },
  {
    id: 2,
    nome: "HTML",
    ore: 60,
    anno: 2003,
    docente: { id: 1, nome: null, cognome: null, data: null},
    iscritto: false
  },
  {
    id: 3,
    nome: "Python",
    ore: 350,
    anno: 2022,
    docente: { id: 2, nome: null, cognome: null, data: null},
    iscritto: false
  },
]
