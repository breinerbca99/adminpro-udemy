import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css'],
})
export class ModalUploadComponent implements OnInit {
  imagenSubir: File;
  imagenTemp: string;
  constructor(
    public subirArchivoService: SubirArchivoService,
    public modalUploadService: ModalUploadService
  ) {
    console.log('Modal listo');
  }

  ngOnInit(): void {}

  seleccionImagen(archivo: File): void {
    // Seleccionamos el primer archivo del arreglo de File
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    // Pasamos la iamgen que queremos subir
    this.imagenSubir = archivo;

    // Para ver la foto subida
    const reader = new FileReader();
    const ulrImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => (this.imagenTemp = reader.result as string);
  }

  cerrarModal(): void {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this.modalUploadService.ocultarModal();
  }

  subirImagen(): void {
    // Si sube la imagen
    this.subirArchivoService
      .subirArchivo(
        this.imagenSubir,
        this.modalUploadService.tipo,
        this.modalUploadService.id
      )
      .then((resp) => {
        // Emitimos a todos que esta subiendo una imagen
        console.log(resp);
        this.modalUploadService.notificacion.emit(resp);
        this.cerrarModal();
      })
      .catch((err) => {
        console.log('Error en la carga...');
      });
  }
}
