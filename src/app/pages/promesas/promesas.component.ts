import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  template: ` <p>promesas works!</p> `,
  styles: [],
})
export class PromesasComponent implements OnInit {
  constructor() {
    this.contarTres()
      .then((mensaje) => console.log('Termino', mensaje))
      .catch((error: any) => console.log('Error en la promesa', error));
  }

  ngOnInit(): void {}

  contarTres(): Promise<string> {
    const promesa = new Promise<string>((resolve, reject) => {
      let contador = 0;

      // Cada cierto cantidad de tiempo disparara esta funcion
      const intervalo = setInterval(() => {
        contador += 1;
        console.log(contador);

        if (contador === 3) {
          resolve('OK');
          clearInterval(intervalo);
        }
      }, 1000);
    });

    return promesa;
  }
}
