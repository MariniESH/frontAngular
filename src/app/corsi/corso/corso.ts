import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DocenteService} from '../../docenti/docente.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {DocenteModel} from '../../docenti/docente.model';
import {CorsoService} from '../corso.service';
import {CorsoModel} from '../corso.model';

let idGenerator = 4;

@Component({
  selector: 'app-corso',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './corso.html',
  styleUrl: './corso.css'
})
export class Corso implements OnInit {
  private corsoService = inject(CorsoService);
  private route = inject(ActivatedRoute);

  // Mi serve per cambiare il layout della pagina HTML
  isEdit = false;

  myForm = new FormGroup({
    id: new FormControl<number | null>(null),
    nome: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    ore: new FormControl<number | null>(null , {
      validators: [Validators.required],
    }),
    anno: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
    docenteId: new FormControl<number | null>(null)
  });

  ngOnInit(): void {

    // chiamato ogni volta che ci sono delle modifiche al param
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('corsoId');
      this.loadCorso(idParam);
    })
  }

  private loadCorso(idParam: string | null) {
    if (!idParam || idParam === 'new') {
      // create mode
      this.isEdit = false;
      this.myForm.reset({id: null, nome: '', ore: null, anno: null, docenteId: null});
      return;
    }

    const id = +idParam;
    const corso = this.corsoService.getCorsoById(id);

    if (!corso) {
      // optional: handle 404/unknown id
      this.isEdit = false;
      this.myForm.reset({id: null, nome: '', ore: null, anno: null, docenteId: null});
      return;
    }

    this.isEdit = true;
    this.myForm.patchValue({
      id: corso.id,
      nome: corso.nome,
      ore: corso.ore,
      anno: corso.anno,
      docenteId: corso.docenteId,
    });
  }

  onSubmit() {

    if (this.myForm.invalid) {
      return;
    }

    const {id, nome, ore, anno, docenteId} = this.myForm.value;

    if (!id) {

      const nuovoCorso: CorsoModel = {
        id: idGenerator++,
        nome: nome!,
        ore: ore,
        anno: anno,
        docenteId: docenteId
      };

      this.corsoService.addCorso(nuovoCorso);

    } else {

      const editedCorso: CorsoModel = {
        id: id,
        nome: nome!,
        ore: ore,
        anno: anno,
        docenteId: docenteId
      }

      this.corsoService.updateCorso(editedCorso);

    }

    console.log(this.myForm)
  }
}
