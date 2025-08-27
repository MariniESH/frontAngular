import {Routes} from '@angular/router';
import {Nav} from './nav/nav';
import {Docenti} from './docenti/docenti';
import {Docente} from './docenti/docente/docente';
import {Corsi} from './corsi/corsi';
import {Corso} from './corsi/corso/corso';
import {Alunni} from './alunni/alunni';
import {Alunno} from './alunni/alunno/alunno';

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
  },
  {
    path: 'corsi',
    component: Corsi,
    children: [
      {
        path: 'new',
        component: Corso
      },
      {
        path: ':corsoId',
        component: Corso
      }
    ]
  },
  {
    path: 'alunni',
    component: Alunni,
    children: [
      {
        path: 'new',
        component: Alunno
      },
      {
        path: ':alunnoId',
        component: Alunno
      }
    ]
  }
];
