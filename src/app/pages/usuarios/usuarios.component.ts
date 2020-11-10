import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalResgitros: number = 0;
  cargando: boolean = true;
  constructor(
    public usuarioService: UsuarioService,
    public modalUploadService: ModalUploadService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.modalUploadService.notificacion.subscribe((resp: any) => this.cargarUsuarios());
  }

  mostrarModal(id: string): void {
    this.modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios(): void {
    this.cargando = true;
    this.usuarioService.listarUsuarios(this.desde).subscribe((resp) => {
      console.log(resp);
      this.totalResgitros = resp.total;
      this.usuarios = resp.usuarios;
    });
    this.cargando = false;
  }

  cambiarDesde(valor: number): void {
    const desde = this.desde + valor;
    console.log('ga');

    console.log(desde);
    if (desde >= this.totalResgitros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string): void {
    console.log(termino);
    this.usuarioService
      .buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      });
  }

  borrarUsuario(usuario: Usuario): void {
    // Borrarse a si mismo
    if (usuario._id === this.usuarioService.usuario._id) {
      Swal.fire(
        'No puede borrar usuario',
        'No se puede borrar a si mísmo',
        'error'
      );
      return;
    }

    Swal.fire({
      title: '¿Estas seguro?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!',
    }).then((borrar) => {
      /* if (borrar.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      } */
      console.log(borrar);
      if (borrar) {
        this.usuarioService
          .borrarUsuario(usuario._id)
          .subscribe((resp: boolean) => {
            console.log(resp);
            this.cargarUsuarios();
          });
      }
    });
  }

  guardarcambiosUsuario(usuario: Usuario): void {
    this.usuarioService.actualizarUsuario(usuario).subscribe();
  }
}
