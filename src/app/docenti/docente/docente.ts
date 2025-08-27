import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DocenteModel} from '../docente.model';
import {DocenteService} from '../docente.service';
import {ActivatedRoute, RouterLink} from '@angular/router';

let idGenerator = 4;

@Component({
  selector: 'app-docente',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './docente.html',
  styleUrl: './docente.css'
})
export class Docente implements OnInit {

  private docenteService = inject(DocenteService);
  private route = inject(ActivatedRoute);

  // Mi serve per cambiare il layout della pagina HTML
  isEdit = false;

  myForm = new FormGroup({
    id: new FormControl<number | null>(null),
    nome: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    cognome: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    data: new FormControl<string>('', {
      validators: [Validators.required],
    }),
  });

  ngOnInit(): void {

    // chiamato ogni volta che ci sono delle modifiche al param
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('docenteId');
      this.loadDocente(idParam);
    })
  }

  private loadDocente(idParam: string | null) {
    if (!idParam || idParam === 'new') {
      // create mode
      this.isEdit = false;
      this.myForm.reset({id: null, nome: '', cognome: '', data: ''});
      return;
    }

    const id = +idParam;
    const docente = this.docenteService.getDocenteById(id);

    if (!docente) {
      // optional: handle 404/unknown id
      this.isEdit = false;
      this.myForm.reset({id: null, nome: '', cognome: '', data: ''});
      return;
    }

    this.isEdit = true;
    this.myForm.patchValue({
      id: docente.id,
      nome: docente.nome,
      cognome: docente.cognome,
      data: docente.data
    });
  }

  onSubmit() {

    if (this.myForm.invalid) {
      return;
    }

    const {id, nome, cognome, data} = this.myForm.value;

    if (!id) {

      const nuovoDocente: DocenteModel = {
        id: idGenerator++,
        nome: nome!,
        cognome: cognome!,
        data: data!
      };

      this.docenteService.addDocente(nuovoDocente);
    } else {

      const editedDocente: DocenteModel = {
        id: id,
        nome: nome!,
        cognome: cognome!,
        data: data!
      }

      this.docenteService.updateDocente(editedDocente);

    }

    console.log(this.myForm)
  }


}
