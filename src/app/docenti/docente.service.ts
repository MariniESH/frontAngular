import {computed, inject, Injectable} from '@angular/core';
import {DocenteRepository} from './docente-repository.service';
import {CorsoRepository} from '../corsi/corso-repository.service';
import {CorsoModel} from '../corsi/corso.model';
import {DocenteModel} from './docente.model';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  private corsoRepository = inject(CorsoRepository);
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
    const corsi = this.corsoRepository.findCorsiByDocentId(id);
    if (corsi) {
      corsi.map((corso) => {
        corso.docente = null
        this.corsoRepository.updateCorso(corso);
      })
    }
    this.docenteRepo.deleteDocente(id);
  }

}
