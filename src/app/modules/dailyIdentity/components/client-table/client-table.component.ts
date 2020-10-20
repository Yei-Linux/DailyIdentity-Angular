import { Component, OnInit } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { Client } from "../../models/client.model";
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ClientModalComponent } from './client-modal/client-modal.component';

@Component({
  selector: "app-client-table",
  templateUrl: "./client-table.component.html",
  styleUrls: ["./client-table.component.css"]
})
export class ClientTableComponent implements OnInit {
  private clients: Client[] = [];
  private client: Client = null;

  constructor(private clientService : ClientService,
              private modalService  : NzModalService,
              private messageService: NzMessageService) {}
  ngOnInit(): void {
    this.getClients();
  }

  get tokenId(){
    return JSON.parse(localStorage.getItem('additional_information_user'))['tokenId'];
  }

  getClients() {
    this.clientService.getClients(this.tokenId).subscribe(response => {
      this.clients = response;
    });
  }

  async getClientById(clientId) {
    this.client = await this.clientService.getClientById(clientId).toPromise();
  }

  async editClientByClientId(clientId) {
    await this.getClientById(clientId);
    await this.launchModalClient('Edit Client',true,'Update');
  }

  deleteClientByClientId(clientId) {
    this.clientService.deleteClientById(clientId).subscribe(response => {
      this.getClients();
      this.messageService.success(`${clientId} has been deleted`);
    });
  }

  cancelDeleteClient(clientId): void {
    this.messageService.info(`You didnt want to delete ${clientId}`);
  }

  launchModalClient(title : string, isEdit : boolean ,titleButton : string) {
    const modal = this.modalService.create({
      nzTitle: title,
      nzContent: ClientModalComponent,
      nzComponentParams: {
        client: this.client,
        isEdit: isEdit,
        title: titleButton
      },
      nzFooter: null,
      nzWidth: '400px',
      nzMaskClosable: false,
      nzClosable: true,
      nzOkDisabled: true,
      nzOkText: null,
      nzCancelDisabled: true,
      nzCancelText: null,
    });

    modal.afterClose.subscribe((response : any)=>{
      this.getClients();
    })
  }
}
