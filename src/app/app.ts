import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PrimeNG} from 'primeng/config';
import {Button} from 'primeng/button';
import {Docenti} from './docenti/docenti';
import {Nav} from './nav/nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Button, Docenti, Nav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  constructor(private primeng: PrimeNG) {
  }

  ngOnInit() {
    this.primeng.ripple.set(true)
  }

  protected title = 'frontAcademy';
}
