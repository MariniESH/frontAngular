import { Component } from '@angular/core';
import {DocenteModel} from './docente.model';
import {RouterLink, RouterOutlet} from '@angular/router';

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

  docenti: DocenteModel[] = [{
    id: '1',
    nome: 'Emma',
    cognome: 'Rossi',
    data: '1990-10-23',
    },
    {
      id: '2',
      nome: 'Gesus',
      cognome: 'Verdi',
      data: '2000-04-09',
    },
    {
      id: '3',
      nome: 'Branca',
      cognome: 'Menta',
      data: '1845-05-17',
    },
  ]
}
