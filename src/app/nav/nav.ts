import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-nav',
  imports: [
    RouterLink,
    Button
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {

}
