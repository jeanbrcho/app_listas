import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaService } from '../services/lista.service';
import { Lista } from '../models/lista.model';
import { Actividad } from '../models/actividades.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista ;
  nombreItem: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    public listaService: ListaService
  ) { 
    let idLista = this.activatedRoute.snapshot.paramMap.get('idLista');

    this.lista = new Lista(''); 
    this.nombreItem = ''; 
    if(idLista) { 
      let ObjetoLista = this.listaService.obtenerLista(idLista); 
      if(ObjetoLista){ 
        this.lista = ObjetoLista; 
      } 
    }
  }

  ngOnInit() {
  }

  agregar() { 
    if(this.nombreItem.length === 0) { 
      return 
    }
    const actividad = new Actividad(this.nombreItem);
    this.lista.item.push(actividad); 
    this.listaService.guardarStorage(); 
    this.nombreItem = '';
  } 

  editar(actividad: Actividad) { 
    this.EditarActividad(actividad);
  } 

  eliminar(actividad: Actividad) { 
    this.lista.item = this.lista.item.filter((item)=> item !== actividad); 
    this.listaService.guardarStorage();
  }

  cambioCkeck() {
    const pendientes = this.lista.item.filter((actividades)=> actividades.completado == false).length; 
    if(pendientes == 0) { 
      this.lista.completada = true; 
      this.lista.terminadaEn = new Date(); 
    } else { 
      this.lista.completada = false; 
      this.lista.terminadaEn = undefined; 
    } 
    this.listaService.guardarStorage(); 
  }

  async EditarActividad(actividad: Actividad) { 
    let alerta = await this.listaService.alertController.create({ 
      header: "Editar Actividad", 
      inputs: [ 
        { 
          type: "text", 
          name: "descripcion", 
          placeholder: "Ingresar nuevo nombre de la actividad", 
          value: actividad.descripcion 
        } 
      ], 
      buttons: [ 
        { 
          text: "Cancelar", 
          role: "cancel" 
        }, 
        { 
          text: "Editar", 
          handler: (data:any)=> { 
            let esValido: boolean = this.listaService.validarInput(data); 
            if (esValido){ 
              actividad.descripcion = data.descripcion, 
              this.listaService.guardarStorage();              
 
              this.listaService.presentToast('Actividad editada correctamente!');               
            }          
          } 
        } 
      ] 
    }) 
 
    await alerta.present();     
  }

}