import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from '../../services/service.index';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  usuario: Usuario;
  constructor(
    public sidebar: SidebarService,
    public usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
  }
}
