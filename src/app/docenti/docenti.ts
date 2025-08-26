import {Component, inject} from '@angular/core';
import {DocenteModel} from './docente.model';
import {RouterLink, RouterOutlet} from '@angular/router';
import {DOCENTI} from './docenti.data';
import {DocenteService} from './docente.service';

@Component({
  selector: 'app-docenti',
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './docenti.html',
  styleUrl: './docenti.css'
})
export class Docenti {

  private docenteService = inject(DocenteService);

  docenti = this.docenteService.showDocenti;
}
