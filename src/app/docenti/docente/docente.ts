import {Component, inject, input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DocenteModel} from '../docente.model';
import {DocenteService} from '../docente.service';
import {ActivatedRoute, RouterLink} from '@angular/router';

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


  private idGenerator = 4;

  myForm = new FormGroup({
    id: new FormControl(),
    nome: new FormControl('', {
      validators: [Validators.required],
    }),
    cognome: new FormControl('', {
      validators: [Validators.required],
    }),
    data: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('docenteId');
    if (!idParam) {
      return
    }

    const id = +idParam;
    const docente = this.docenteService.getDocenteById(id);

    if (!docente) {
      return
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

    const enteredNome = this.myForm.value.nome;
    const enteredCognome = this.myForm.value.cognome;
    const enteredData = this.myForm.value.data;

    if (this.myForm.value.id === null) {


      const nuovoDocente: DocenteModel = {
        id: this.idGenerator++,
        nome: enteredNome,
        cognome: enteredCognome,
        data: enteredData
      };

      this.docenteService.addDocente(nuovoDocente);
    } else {

      const editedDocente: DocenteModel = {
        id: this.myForm.value.id,
        nome: enteredNome,
        cognome: enteredCognome,
        data: enteredData
      }

      this.docenteService.updateDocente(editedDocente);

    }

    console.log(this.myForm)
  }


}
