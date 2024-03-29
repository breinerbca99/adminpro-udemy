import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;
  constructor(public usuarioService: UsuarioService, public router: Router) {}

  ngOnInit(): void {
    init_plugins();
    this.forma = new FormGroup(
      {
        nombre: new FormControl(null, Validators.required),
        correo: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        condiciones: new FormControl(false),
      },
      { validators: this.sonIguales('password', 'password2') }
    );

    this.forma.setValue({
      nombre: 'Breiner',
      correo: 'breiner@gmail.com',
      password: '1234',
      password2: '1234',
      condiciones: true,
    });
  }

  sonIguales(campo1: string, campo2: string): any {
    return (group: FormGroup) => {
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;
      if (pass1 === pass2) {
        return null;
      }

      return { sonIguales: true };
    };
  }

  registrarUsuario(): void {
    if (this.forma.invalid) {
      return;
    }

    if (!this.forma.value.condiciones) {
      Swal.fire('Importante', ' Debe de aceptar las condiciones', 'warning');
    }
    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    // Llamamos al servicio
    this.usuarioService
      .crearUsuario(usuario)
      .subscribe((resp) => this.router.navigate(['/login']));
  }
}
