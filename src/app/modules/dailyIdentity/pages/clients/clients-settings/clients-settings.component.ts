import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ClientModalComponent } from '../../../components/client-table/client-modal/client-modal.component';
import { NzModalService } from 'ng-zorro-antd';
import { ClientTableComponent } from '../../../components/client-table/client-table.component';

@Component({
  selector: 'app-clients-settings',
  templateUrl: './clients-settings.component.html',
  styleUrls: ['./clients-settings.component.sass']
})
export class ClientsSettingsComponent implements OnInit {
  @ViewChild(ClientTableComponent,{static:false}) clientTableChild:ClientTableComponent;

  constructor(private modalService  : NzModalService){} 

  ngOnInit(): void {}

  launchModalClient(title : string,isEdit : boolean, titleButton : string) {
    const modal = this.modalService.create({
      nzTitle: title,
      nzContent: ClientModalComponent,
      nzComponentParams: {
        isEdit : isEdit,
        title: titleButton
      },
      nzFooter: null,
      nzMaskClosable: false,
      nzWidth: "576px",
      nzClosable: true,
      nzOkDisabled: true,
      nzOkText: null,
      nzCancelDisabled: true,
      nzCancelText: null,
    });

    modal.afterClose.subscribe((response : any)=>{
      this.clientTableChild.getClients();
    })
  }

}
