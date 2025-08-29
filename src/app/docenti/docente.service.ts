import {computed, inject, Injectable} from '@angular/core';
import {DocenteRepository} from './docente-repository.service';
import {CorsoRepository} from '../corsi/corso-repository.service';
import {CorsoModel} from '../corsi/corso.model';
import {DocenteModel} from './docente.model';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  private corsoService = inject(CorsoRepository);
  private docenteRepo = inject(DocenteRepository)


  getDocenti() {
    return computed(this.docenteRepo.getDocenti);
  }

  getDocenteById(id: number): DocenteModel | undefined {
    return this.docenteRepo.getDocenteById(id)
  }

  addDocente(docente: DocenteModel) {
    this.docenteRepo.addDocente(docente);
  }

  updateDocente(docente: DocenteModel) {
    this.docenteRepo.updateDocente(docente);
  }

  deleteDocente(id: number) {
    const corsi = this.corsoService.findCorsiByDocentId(id);
    console.log(corsi)
    this.docenteRepo.deleteDocente(id);
  }

  findCorsiByDocentId(docenteId: number):CorsoModel[] | null | undefined {
    let corsi;
    if (docenteId === null) {
      corsi = null
    } else {
      corsi = this.corsoService.getCorsi().filter((corso) => corso.docente?.id === docenteId)
    }
    return corsi
  }

}
