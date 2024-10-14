import { Component, Input, OnInit } from '@angular/core';
import { ListaService } from 'src/app/services/lista.service';
import { Lista } from 'src/app/models/lista.model'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent  implements OnInit {

  @Input() tipo:string = ''; 

  constructor(
    public listaService: ListaService,
    private roter: Router
  ) { }

  ngOnInit() {}


  editarLista(listaItem: Lista) { 
    this.editarLista(listaItem); 
    console.log("Editar lista:", listaItem); 
  } 

  eliminarLista(listaItem: Lista) { 
    this.listaService.eliminarLista(listaItem); 
    console.log("Eliminar lista:", listaItem); 
  }

  async EditarLista(lista: Lista) { 
    let alerta = await this.listaService.alertController.create({ 
      header: "Editar lista", 
      inputs: [ 
        { 
          type: "text", 
          name: "titulo", 
          placeholder: "Ingresar nuevo nombre de la lista", 
          value: lista.titulo 
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
              lista.titulo = data.titulo, 
              this.listaService.editarLista(lista);              
 
              this.listaService.presentToast('Lista editada correctamente!');               
            }          
          } 
        } 
      ] 
    }) 
 
    await alerta.present();     
  }

  listaSeleccionada(listaItem: Lista) {
    const URL = '/agregar/' + listaItem.id 
  this.roter.navigateByUrl(URL);
  }
}
