import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  template: ` <p>rxjs works!</p> `,
  styles: [],
})
export class RxjsComponent implements OnInit, OnDestroy {

  // Creamos para hacer referencia a la subscripcion
  subscription: Subscription;

  constructor() {
    this.subscription = this.regresaObservable().subscribe(
      (numero) => console.log('Subs', numero),
      (error) => console.log('Error en el obs', error),
      () => console.log('El observador termino!')
    );
  }

  ngOnDestroy(): void {
    console.log('La pagina se va cerrar');
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}

  regresaObservable(): Observable<any> {
    const obs = new Observable<any>((observer) => {
      let contador = 0;

      const intervalo = setInterval(() => {
        contador++;
        const salida = {
          valor: contador,
        };
        observer.next(salida);

        /* if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        } */
      }, 1000);
    }).pipe(
      map((resp) => {
        return resp.valor;
      }),
      filter((valor, index) => {
        if (valor % 2 === 1) {
          // Numero impar
          return true;
        } else {
          return false;
        }
      })
    );

    return obs;
  }
}
