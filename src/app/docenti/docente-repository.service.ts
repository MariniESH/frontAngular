import {inject, Injectable, signal} from '@angular/core';
import {DocenteModel} from './docente.model';
import {DOCENTI_DUMMY} from './docenti.data';
import {DocenteService} from './docente.service';

@Injectable({
  providedIn: 'root'
})
export class DocenteRepository {

  // private corsoService = inject(DocenteService)
  private docenti = signal<DocenteModel[]>(DOCENTI_DUMMY)

  // GET ALL
  getDocenti = this.docenti;


  // GET
  getDocenteById(id: number): DocenteModel | undefined {
    return this.docenti().find(docente => docente.id === id);
  }

  // CREATE
  addDocente(docente: DocenteModel) {
    this.docenti.update((oldDocenti) => [...oldDocenti, docente])
  }

  // UPDATE
  updateDocente(docente: DocenteModel) {
    this.docenti.update((oldDocenti) => oldDocenti.map(oldDoc => oldDoc.id === docente.id ? docente : oldDoc))
  }

  // DELETE
  deleteDocente(id: number) {
    this.docenti.update((oldDocenti) => oldDocenti.filter((docente) => docente.id !== id))
  }
}
