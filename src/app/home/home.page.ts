import { UtilService } from './../services/util.service';
import { Component } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  tarefas: any[] = [];

  constructor(private alertCtrl: AlertController, private UtilService:UtilService, private ActionSheetController: ActionSheetController) {
    let tarefaJson = localStorage.getItem('TarefaDB');
    if(tarefaJson!=null){
      this.tarefas = JSON.parse(tarefaJson);
    }
  }

  async showAdd() {
    const alert = await this.alertCtrl.create({
      header: 'Digite a tarefa que deseja adicionar',
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancel',
          cssClass: 'Secondary',
          handler:()=>{
            console.log("cancelado")
            this.UtilService.ShowToast('Cancelado');
          }
        },
        {
          text: 'Adicionar',
          handler: (form)=>{
            this.add(form)
          }
        }
      ],
      inputs: [
        {
          name: 'tarefa',
          type: 'text', 
          placeholder: 'Tarefa',
        },
        {
          name: 'prioridade',
          type: 'text',
          placeholder: 'Prioridade',
        }
      ],
    });

    await alert.present();
  }

  async add(form: any){
    //valida se tem alguma coisa para ser armazenado
    if(form.tarefa.trim().length<1){
      this.UtilService.ShowToast('Digite alguma tarefa');
      return;
    }
    if(form.prioridade.trim().length<1){
      this.UtilService.ShowToast('Digite alguma prioridade');
      return;
    }

    let tarefa = {name:form.tarefa,prioridade:form.prioridade ,done:false};

    this.tarefas.push(tarefa);

    this.updateLocalstorage();

    this.UtilService.ShowToast('Operação realizada com sucesso');
  }


  updateLocalstorage(){
    localStorage.setItem('TarefaDB',JSON.stringify(this.tarefas));
  }


  async openActions(tarefa){
    const actionSheet = await this.ActionSheetController.create({
      header: 'O que deseja fazer?',
      buttons: [
        {
          icon: 'golf',
          text: tarefa.done ? 'Desmarcar': 'marcar',
          cssClass: tarefa.done ? '' : 'colorActionButton',
          handler:()=>{
            tarefa.done = !tarefa.done,
            this.updateLocalstorage();
            this.UtilService.ShowToast('Operação realizada com sucesso');
          }
        },
        {
          text:'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler:()=>{
            this.UtilService.ShowToast('Cancelado');
          }
        }
      ]
    });
    await actionSheet.present();

  }

   async deletar(tarefa: any){
    const alert = await this.alertCtrl.create({
      header: 'Tem certeza de que deseja excluir o item?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancel',
          cssClass: 'Secondary',
          handler:()=>{
            console.log("cancelado")
            this.UtilService.ShowToast('Cancelado');
          }
        },
        {
          text: 'Confirmar',
          handler: ()=>{
            this.tarefas = this.tarefas.filter(item=> item != tarefa)//item = item dentro da lista e tarefa= item que deseja-se excluir
            this.updateLocalstorage();
            this.UtilService.ShowToast('Operação realizada com sucesso');
          }
        }
      ],
    });

    await alert.present();
  }

}
