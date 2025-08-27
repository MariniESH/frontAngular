import {Routes} from '@angular/router';
import {Nav} from './nav/nav';
import {Docenti} from './docenti/docenti';
import {Docente} from './docenti/docente/docente';

export const routes: Routes = [
  {
    path: '',
    component: Nav
  },
  {
    path: 'docenti',
    component: Docenti,
    children: [
      {
        path: 'new',
        component: Docente
      },
      {
        path: ':docenteId',
        component: Docente
      }
    ]
  }
];
