import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AlunnoService} from './alunno.service';

@Component({
  selector: 'app-alunni',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './alunni.html',
  styleUrl: './alunni.css'
})
export class Alunni {
  private alunnoService = inject(AlunnoService);

  alunni = this.alunnoService.getAlunni;


  onCancel(id: number) {
    this.alunnoService.deleteAlunno(id);
  }
}
