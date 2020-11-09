import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class SubirArchivoService {
  constructor() {}

  subirArchivo(archivo: File, tipo: string, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // Esto es el payload que yo quiero mandar a subir
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);
      // Para ser notificados ante cualquier cambio
      xhr.onreadystatechange = () => {
        // tiene 4 estados y solo nos interesa cuando esta en el 4
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Imagen subida');
            resolve(xhr.response);
          } else {
            console.log('Fallo la subida');
            reject(xhr.response);
            console.log(xhr.response);
          }
        }
      };

      const url = `${URL_SERVICIOS}/upload/${tipo}/${id}`;
      // De que tipo de peticion es
      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }
}
