import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  // Para manejar nuestro cambio de foto
  imagenSubir: File;
  imagenTemp: string;
  constructor(public usuarioService: UsuarioService) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {}

  guardar(usuario: Usuario): void {
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }
    this.usuario.nombre = usuario.nombre;

    this.usuarioService.actualizarUsuario(this.usuario).subscribe((resp) => {});
  }

  seleccionImagen(archivo: File): void {
    // Seleccionamos el primer archivo del arreglo de File
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      Swal.fire('Solo imagenes', 'El archivo seleccionado no es una imagen');
    }
    // Pasamos la iamgen que queremos subir
    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => (this.imagenTemp = reader.result as string);
  }

  cambiarImagen(): void {
    this.usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }
}
