import { Component, inject } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {CorsoService} from './corso.service';

@Component({
  selector: 'app-corsi',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './corsi.html',
  styleUrl: './corsi.css'
})
export class Corsi {
  private corsoService = inject(CorsoService);

  corsi = this.corsoService.getCorsi;

  onCancel(id: number) {
    this.corsoService.deleteCorso(id);
  }
}
