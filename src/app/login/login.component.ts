import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario/usuario.service';

// De esta manera podemos llamar scripts que esten fueran de angular
// Funciona ejemplos con plugins carruseles que estan externas
declare function init_plugins();
// Google
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(public router: Router, public usuarioService: UsuarioService) {}

  ngOnInit(): void {
    init_plugins();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
    this.googleInit();
  }

  ingresar(forma: NgForm): void {
    console.log(forma.valid);
    console.log(forma.value);
    if (forma.invalid) {
      return;
    }

    const usuario = new Usuario(null, forma.value.email, forma.value.password);
    this.usuarioService
      .login(usuario, forma.value.recuerdame)
      .subscribe((resp: any) => this.router.navigate(['/dashboard']));
  }

  googleInit(): void {
    gapi.load('auth2', () => {
      // Client id
      this.auth2 = gapi.auth2.init({
        client_id:
          '870962014750-14s8g3l4il0tvps7d6blj78ul97hkra4.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email',
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element): void {
    // Recibo el google user
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this.usuarioService.loginGoogle(token).subscribe(() => {
        // this.router.navigate(['/dashboard']);
        // Mejor manejamos una redireccion manual
        window.location.href = '#/dashboard';
      });
      console.log(token);
    });
  }
}
