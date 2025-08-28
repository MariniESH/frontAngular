import {computed, inject, Injectable, signal} from '@angular/core';
import {CORSI_DUMMY} from './corsi.data';
import {CorsoModel} from './corso.model';
import {DocenteService} from '../docenti/docente.service';
import {DocenteModel} from '../docenti/docente.model';

@Injectable({
  providedIn: 'root'
})
export class CorsoService {
  private docenteService = inject(DocenteService)

  private corsi = signal(CORSI_DUMMY);

  // READ ALL
  getCorsi = computed(() => this.corsi().map((corso) => {
    corso.docente = this.findDocente(corso);
    return corso
  }))

  // READ SINGOLO
  getCorsoById(id: number): CorsoModel | undefined {
    const corso = this.corsi().find((corso) => corso.id === id)
    if (!corso) {
      return;
    } else {
      corso.docente = this.findDocente(corso);
      return corso
    }
  }

  // CREATE
  addCorso(nuovoCorso: CorsoModel) {
    this.corsi.update((oldCorsi) => [...oldCorsi, nuovoCorso])
  }

  // UPDATE
  updateCorso(editedCorso: CorsoModel) {
    this.corsi.update((oldCorsi) => oldCorsi.map(oldCorso => oldCorso.id === editedCorso.id ? editedCorso : oldCorso))
  }

  // DELETE
  deleteCorso(id: number) {
    this.corsi.update((oldCorsi) => oldCorsi.filter((corso) => corso.id !== id))
  }

  private findDocente(corso: CorsoModel): DocenteModel | null | undefined {
    let docente;
    if (corso.docente === undefined || corso.docente === null) {
      docente = null
    } else {
      if (corso.docente.id !== null && corso.docente.id !== undefined) {
        docente = this.docenteService.getDocenteById(corso.docente.id)
      }
    }

    return docente;
  }
}
