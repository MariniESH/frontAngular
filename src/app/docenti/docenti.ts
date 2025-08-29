import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {DocenteRepository} from './docente-repository.service';
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

  docenti = this.docenteService.getDocenti();

  onCancel(id: number) {
     this.docenteService.deleteDocente(id);
  }
}
