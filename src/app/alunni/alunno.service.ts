import {Injectable, signal} from '@angular/core';
import {ALUNNI_DUMMY} from './alunni.data';
import {AlunnoModel} from './alunno.model';

@Injectable({
  providedIn: 'root'
})
export class AlunnoService {

  alunni = signal<AlunnoModel[]>(ALUNNI_DUMMY)

  // READ ALL
  getAlunni = this.alunni.asReadonly()

  // READ SINGOLO
  getAlunnoById(id: number): AlunnoModel | undefined {
    return this.alunni().find((alunno) => alunno.id === id)
  }

  // CREATE
  addAlunno(nuovoAlunno: AlunnoModel) {
    this.alunni.update((oldAlunni) => [...oldAlunni, nuovoAlunno])
  }

  // UPDATE
  updateAlunno(editedAlunno: AlunnoModel) {
    this.alunni.update((oldAlunni) => oldAlunni.map((alunno) => alunno.id === editedAlunno.id ? editedAlunno : alunno))
  }

  // DELETE
  deleteAlunno(id: number) {
    this.alunni.update((oldAlunni) => oldAlunni.filter((alunno) => alunno.id !== id));
  }


}
