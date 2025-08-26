import {Injectable, signal} from '@angular/core';
import {DocenteModel} from './docente.model';
import {DOCENTI} from './docenti.data';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  private docenti = signal<DocenteModel[]>(DOCENTI)

  showDocenti = this.docenti.asReadonly();


  addDocente(docente: DocenteModel) {
    this.docenti.update((oldDocenti) => [...oldDocenti, docente])
  }
}
