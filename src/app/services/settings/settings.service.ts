import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  }

  constructor(@Inject(DOCUMENT) private documento) {
    this.cargarAjustes();
   }

  guardarAjustes(): void {
    console.log('Guardando en el localStorage');
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes(): void {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      console.log('Cargando del localstorage');
      this.aplicarTema(this.ajustes.tema);
    }else{
      console.log('Usando valores por defectos');
    }
  }

  aplicarTema(tema: string): void{
    const url = `assets/css/colors/${tema}.css`;
    this.documento.getElementById('tema').setAttribute('href', url);
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
