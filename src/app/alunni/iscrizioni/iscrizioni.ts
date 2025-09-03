import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CorsoModel } from '../../corsi/corso.model';
import { CorsoService } from '../../corsi/corso.service';
import { AlunnoService } from '../alunno.service';
import { AlunnoModel } from '../alunno.model';

@Component({
  selector: 'app-iscrizioni',
  imports: [
    RouterLink
  ],
  templateUrl: './iscrizioni.html',
  styleUrl: './iscrizioni.css'
})
export class Iscrizioni implements OnInit {

  private route = inject(ActivatedRoute);
  private alunnoService = inject(AlunnoService);
  private corsoService = inject(CorsoService);

  alunno: AlunnoModel | null | undefined = null;
  corsi = this.corsoService.getCorsi();
  idCorsi: number[] = [];

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('alunnoId');
      this.loadAlunno(idParam);
    });
  }

  private loadAlunno(idParam: string | null) {
    if (!idParam || idParam === 'new') {
      return;
    }

    const id = +idParam;
    this.alunno = this.alunnoService.getAlunnoById(id);
    this.idCorsi = [];

    if (!this.alunno) {
      return;
    }
  }

  isEnrolled(corsoId: number| null | undefined): boolean {
    return this.alunno?.corsi?.some(corso => corso.id === corsoId) || false;
  }

  onChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const id = Number(input.value);

    if (input.checked) {
      if (!this.idCorsi.includes(id)) {
        this.idCorsi = [...this.idCorsi, id];
      }
    } else {
      this.idCorsi = this.idCorsi.filter(oldId => oldId !== id);
    }
  }

  onSubmit() {
    let corsi: CorsoModel[] = [];
    this.idCorsi.map((idCorso) => {
      let corso: CorsoModel = { id: idCorso, nome: null, ore: null, anno: null, docente: null, iscritto: null };
      corsi = [...corsi, corso];
      let enrolledAlunno = this.alunno;
      enrolledAlunno!.corsi = corsi;
      this.alunnoService.updateAlunno(enrolledAlunno!)
    });

    console.log(this.alunno);
  }
}
