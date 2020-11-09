import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    private router: Router,
    public subirArchivoService: SubirArchivoService
  ) {
    console.log('Servicio de usuario listo');
    this.cargarStorage();
  }

  guardarStorage(id: string, token: string, usuario: Usuario): void {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  // Para saber si su token esta en el localstorage
  estaLogueado(): boolean {
    return this.token.length > 5 ? true : false;
  }

  // Cargamos del localStorage
  cargarStorage(): void {
    // Si existe el token
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    const url = `${URL_SERVICIOS}/usuario`;
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        Swal.fire('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      })
    ) as Observable<Usuario>;
  }

  actualizarUsuario(usuario: Usuario): Observable<Usuario> {
    let url = `${URL_SERVICIOS}/usuario/${usuario._id}`;
    url += `?token=${this.token}`;
    console.log(url);
    return this.http.put(url, usuario).pipe(
      map((resp: any) => {
        const usuariodb: Usuario = resp.usuario;
        this.guardarStorage(usuariodb._id, this.token, usuariodb);
        Swal.fire('Usuario actualizado', usuario.nombre, 'success');
        return resp.usuario;
      })
    ) as Observable<Usuario>;
  }

  login(usuario: Usuario, recordar: boolean = false): any {
    // Opcion de Recordar
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = `${URL_SERVICIOS}/login`;
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
      })
    );
  }

  loginGoogle(token: string): any {
    const url = `${URL_SERVICIOS}/login/google`;
    return this.http.post(url, { token }).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  logout(): void {
    this.usuario = null;
    this.token = '';
    // Borramos del localStorage
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  cambiarImagen(archivo: File, id: string): any {
    this.subirArchivoService
      .subirArchivo(archivo, 'usuarios', id)
      .then((resp) => {
        this.usuario.img = resp.usuario.img;
        Swal.fire('Imagen actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario);
        console.log(resp);
      })
      .catch((resp) => {
        console.log(resp);
      });
  }
}
