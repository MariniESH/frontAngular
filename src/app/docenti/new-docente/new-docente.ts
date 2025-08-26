import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DocenteModel} from '../docente.model';
import {DocenteService} from '../docente.service';

@Component({
  selector: 'app-new-docente',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './new-docente.html',
  styleUrl: './new-docente.css'
})
export class NewDocente {

  private docenteService = inject(DocenteService);

  myForm = new FormGroup({
    id: new FormControl('', {
      validators: [Validators.required],
    }),
    nome: new FormControl(''),
    cognome: new FormControl(''),
    data: new FormControl(''),
  });

  onSubmit() {

    if (this.myForm.invalid) {
      return;
    }

    const enteredId = this.myForm.value.id;
    const enteredNome = this.myForm.value.nome;
    const enteredCognome = this.myForm.value.cognome;
    const enteredData = this.myForm.value.data;

    const docente: DocenteModel = {
      id: enteredId,
      nome: enteredNome,
      cognome: enteredCognome,
      data: enteredData
    };

    this.docenteService.addDocente(docente);

    console.log(docente);
  }
}
