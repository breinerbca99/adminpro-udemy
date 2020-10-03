import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {
  // Recibe como parametro una referencia al html , y lo manejamos al lado de typescripth por txtProgress
  // con el ElementRef tengo una referencia sin importar en que elemento estoy
  @ViewChild('txtProgress') txtProgress: ElementRef;

  // Input ya que estas variables pueden venir de afuera
  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    console.log('Leyenda', this.leyenda);
    console.log('Progreso', this.progreso);
  }

  ngOnInit(): void {
    console.log('Leyenda', this.leyenda);
    console.log('Progreso', this.progreso);
  }

  onChanges( newValue: number): void {
    // let elementHTML: any = document.getElementsByName('progreso')[0];
    console.log(this.txtProgress);
    if( newValue >= 100){
      this.progreso = 100;
    }else if( newValue <=0 ){
      this.progreso = 0;
    }else{
      this.progreso = newValue;
    }

    // elementHTML.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit( this.progreso );

  }

  cambiarValor(valor: number): void {
    if (this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    }

    if (this.progreso <= 0 && valor <= 0) {
      this.progreso = 0;
      return;
    }

    this.progreso += valor;

    this.cambioValor.emit(this.progreso);

    // Damosel focus al elemento que dimos click en su componente
    this.txtProgress.nativeElement.focus();
  }

}
