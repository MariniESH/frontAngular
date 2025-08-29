import {computed, inject, Injectable, signal} from '@angular/core';
import {CORSI_DUMMY} from './corsi.data';
import {CorsoModel} from './corso.model';
import {DocenteRepository} from '../docenti/docente-repository.service';
import {DocenteModel} from '../docenti/docente.model';

@Injectable({
  providedIn: 'root'
})
export class CorsoRepository {

  // private docenteRepository = inject(DocenteRepository)

  private corsi = signal(CORSI_DUMMY);

  // READ ALL
  getCorsi = this.corsi;

  // READ SINGOLO
  getCorsoById(id: number): CorsoModel | undefined {
    return this.corsi().find((corso) => corso.id === id)
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

  // private findDocente(corso: CorsoModel): DocenteModel | null | undefined {
  //   let docente;
  //   if (corso.docente === undefined || corso.docente === null) {
  //     docente = null
  //   } else {
  //     if (corso.docente.id !== null && corso.docente.id !== undefined) {
  //       docente = this.docenteRepository.getDocenteById(corso.docente.id)
  //     }
  //   }
  //
  //   return docente;
  // }

  findCorsiByDocentId(docenteId: number):CorsoModel[] | null | undefined {
    let corsi;
    if (docenteId === null) {
      corsi = null
    } else {
      corsi = this.corsi().filter((corso) => corso.docente?.id === docenteId)
    }
    return corsi
  }
}
