import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ListaService } from '../services/lista.service';
import { Lista } from '../models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    public alertController: AlertController, 
    public toastController:ToastController, 
    public listaService:ListaService 
  ) {}

  /**
   * @function validarInput
   * @param input es de tipo any, se desconoce su tipo
   * @returns devuelve true si el valor tiene contenido, false si esta vacio
   * @description: valida si la variables enviada por parametro tiene un valor
   */
  async AgregarLista() 
  {
    let alerta = await this.alertController.create({ 
      header: "Agregar lista", 
      inputs: [ 
        { 
          type: "text", 
          name: "titulo", 
          placeholder: "Ingresar nombre de la lista" 
        } 
      ], 
      buttons: 
      [ 
        { 
          text: "Cancelar", 
          role: "cancel" 
        }, 
        { 
          text: "Crear", 
          handler: (data:any)=> {
            if (this.listaService.validarInput(data.titulo)) { 
              let creadaOk = this.listaService.crearLista(data.titulo); 

              if(creadaOk) { //Se verifica si la variable tiene un valor, es decir, que fue creada 
                this.listaService.presentToast('Lista creada correctamente!'); 
              }
            } 
          }
        }
      ] 
      });

      await alerta.present(); 
  }

  
}
