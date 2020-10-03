import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// De esta manera podemos llamar scripts que esten fueran de angular
// Funciona ejemplos con plugins carruseles que estan externas
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:  ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
    init_plugins();
  }

  ingresar(): void{
    console.log('Ingresar');
    this.router.navigate(['/dashboard']);
  }

}
