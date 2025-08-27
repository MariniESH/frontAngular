import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupName, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {AlunnoService} from '../alunno.service';
import {AlunnoModel} from '../alunno.model';

let idGenerator = 5;

@Component({
  selector: 'app-alunno',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './alunno.html',
  styleUrl: './alunno.css'
})
export class Alunno implements OnInit {

  private alunnoService = inject(AlunnoService)
  private route = inject(ActivatedRoute)

  isEdit = false;

  myForm = new FormGroup({
    id: new FormControl<number | null>(null),
    nome: new FormControl<string>('', {
      validators: [Validators.required]
    }),
    cognome: new FormControl<string>('',
      {validators: [Validators.required]
      }),
    data: new FormControl<string>('', {
      validators: [Validators.required]
    }),
    citta: new FormControl<string>('', {
      validators: [Validators.required]
    }),
    voto: new FormControl<number | null>(null),
  })

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('alunnoId')
      this.loadAlunno(idParam)
    })
  }

  private loadAlunno(idParam: string | null) {
    if (!idParam || idParam === 'new') {
      this.myForm.reset({id: null, nome: '', cognome: '', data: '', citta: '', voto: null});
      return;
    }

    const id = +idParam;
    const alunno = this.alunnoService.getAlunnoById(id)

    if (!alunno) {
      this.isEdit = false;
      this.myForm.reset({id: null, nome: '', cognome: '', data: '', citta: '', voto: null});
      return;
    }


    this.isEdit= true;
    this.myForm.patchValue({
      id: alunno.id,
      nome: alunno.nome,
      cognome: alunno.cognome,
      data: alunno.data,
      citta: alunno.citta,
      voto: alunno.voto,
    });
  }


  onSubmit() {
    if (this.myForm.invalid) {
      return;
    }

    const {id, nome, cognome, data, citta, voto} = this.myForm.value;

    if (!id) {
      const nuovoAlunno: AlunnoModel = {
        id: idGenerator++,
        nome: nome!,
        cognome: cognome!,
        data: data!,
        citta: citta!,
        voto: voto
      }

      this.alunnoService.addAlunno(nuovoAlunno)
    } else {
      const editedAlunno: AlunnoModel = {
        id: id,
        nome: nome!,
        cognome: cognome!,
        data: data!,
        citta: citta!,
        voto: voto
      }

      this.alunnoService.updateAlunno(editedAlunno)
    }

    console.log(this.myForm)
  }
}
