import {Injectable, signal} from '@angular/core';
import {CORSI_DUMMY} from './corsi.data';

@Injectable({
  providedIn: 'root'
})
export class CorsoService {

  private corsi = signal(CORSI_DUMMY);

  getCorsi = this.corsi.asReadonly()
}
