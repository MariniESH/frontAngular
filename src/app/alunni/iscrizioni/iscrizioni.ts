import {Component, inject} from '@angular/core';
import {CorsoRepository} from '../../corsi/corso-repository.service';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-iscrizioni',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './iscrizioni.html',
  styleUrl: './iscrizioni.css'
})
export class Iscrizioni {
  private corsoService = inject(CorsoRepository);

  corsi = this.corsoService.getCorsi;

  form = new FormGroup ({
  iscrizione: new FormArray([])
})

  onSubmit() {
    console.log(this.form);
  }
}
