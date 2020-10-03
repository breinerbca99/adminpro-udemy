import { Component, OnInit } from '@angular/core';

// De esta manera podemos llamar scripts que esten fueran de angular
// Funciona ejemplos con plugins carruseles que estan externas
declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    init_plugins();
  }

}
