import {computed, inject, Injectable} from '@angular/core';
import {CorsoRepository} from './corso-repository.service';
import {CorsoModel} from './corso.model';
import {DocenteRepository} from '../docenti/docente-repository.service';
import {DocenteModel} from '../docenti/docente.model';

@Injectable({
  providedIn: 'root'
})
export class CorsoService {

  private corsoRepository = inject(CorsoRepository);
  private docenteRepository = inject(DocenteRepository);

  getCorsi()  {
  return computed(() => this.corsoRepository.getCorsi().map((corso) => {
    corso.docente = this.findDocente(corso);
    return corso
  }))
  }

  getCorsoById(id: number) {
    const corso = this.corsoRepository.getCorsoById(id)
    if (!corso) {
      return;
    } else {
      corso.docente = this.findDocente(corso);
      return corso
    }
  }

  addCorso(corso: CorsoModel) {
    this.corsoRepository.addCorso(corso);
  }

  updateCorso(corso: CorsoModel) {
    this.corsoRepository.updateCorso(corso);
  }

  deleteCorso(id:number) {
    this.corsoRepository.deleteCorso(id);
  }

  private findDocente(corso: CorsoModel): DocenteModel | null | undefined {
    let docente;
    if (corso.docente === undefined || corso.docente === null) {
      docente = null
    } else {
      if (corso.docente.id !== null && corso.docente.id !== undefined) {
        docente = this.docenteRepository.getDocenteById(corso.docente.id)
      }
    }
    return docente;
  }

}
