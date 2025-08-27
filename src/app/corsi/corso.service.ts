import {Injectable, signal} from '@angular/core';
import {CORSI_DUMMY} from './corsi.data';
import {CorsoModel} from './corso.model';

@Injectable({
  providedIn: 'root'
})
export class CorsoService {

  private corsi = signal(CORSI_DUMMY);

  // READ ALL
  getCorsi = this.corsi.asReadonly()

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
}
