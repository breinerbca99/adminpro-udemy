import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: [],
})
export class AccoutSettingsComponent implements OnInit {
  constructor(public ajustes: SettingsService ) {}

  ngOnInit(): void {
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: any): void {
    this.aplicarCheck(link);
    this.ajustes.aplicarTema(tema);
  }

  aplicarCheck(link: any): void {
    const selectores: any = document.getElementsByClassName('selector');
    for (let ref of selectores) {
      // Removemos el working del anterior tema seleccionado
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  colocarCheck(): void{
    const selectores: any = document.getElementsByClassName('selector');
    const tema = this.ajustes.ajustes.tema;
    for( let ref  of selectores){
      if(ref.getAttribute('data-theme') === tema){
        ref.classList.add('working');
        break;
      }
    }
  }
}
