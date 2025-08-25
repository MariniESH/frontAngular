import { Routes } from '@angular/router';
import {Nav} from './nav/nav';
import {Docenti} from './docenti/docenti';
import {NewDocente} from './docenti/new-docente/new-docente';

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
        component: NewDocente
      }
    ]
  }
];
