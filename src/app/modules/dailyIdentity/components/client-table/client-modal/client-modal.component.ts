import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Client } from "../../../models/client.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NzModalRef, NzModalService, NzMessageService } from "ng-zorro-antd";
import { ClientService } from '../../../services/client.service';
import { FormService } from 'src/app/core/services/form.service';
import { Notification } from '../../../models/notification.model';
import { NotificationService } from '../../../services/notification.service';

const resourcesIdsOptionsStatic = [
  "dailyIdentity",
  "dailyCrypt",
  "dailyMusic",
  "dailyCode",
  "dailyChess",
  "dailyNotification",
];
const scopeOptionsStatic = ["read", "write", "delete", "update"];
const grantsOptionsStatic = [
  "authorization_code",
  "password",
  "client_credentials",
  "refresh_token",
];

@Component({
  selector: "app-client-modal",
  templateUrl: "./client-modal.component.html",
  styleUrls: ["./client-modal.component.css"],
})
export class ClientModalComponent implements OnInit {
  @Input() public client: Client = null;
  @Input() public isEdit: boolean = false;
  @Input() public title: string = '';

  private clientForm: FormGroup;
  private currentStepIndex: number = 0;
  private resourcesIdsOptions: any[] = [];
  private scopeOptions: any[] = [];
  private grantsOptions: any[] = [];
  private isLoadingClient: boolean = false;
  private additionalInformationClient : string = '';

  private visible = false;
  private passwordVisible = false;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NzModalService,
    private clientService: ClientService,
    private modal: NzModalRef,
    private formService: FormService,
    private notificationService: NotificationService,
    private message: NzMessageService,
  ) {}

  ngOnInit() {
    this.initializingOptionsSelects();
    this.createClientFormGroup();
    this.isEdit && this.patchClientValueToForm(this.client);
    this.additionalInformationClient = this.getClientFormValue('additionalInformation');
  }

  get tokenId(){
    return JSON.parse(localStorage.getItem('additional_information_user'))['tokenId'];
  }

  public getClientFormValue(field: string) {
    return this.clientForm.get(field).value;
  }

  public getClientFormControl(field : string){
    return this.clientForm.get(field);
  }

  private createClientFormGroup() {
    this.clientForm = this.formBuilder.group({ 
      clientId: [,Validators.required],
      description: [,Validators.required],
      resourceIds: [,Validators.required],
      scope: [,Validators.required],
      grantTypes: [,Validators.required],
      redirectUri: [],
      authorities: [],
      clientSecret: [,Validators.required],
      accessTokenTime: [,Validators.required],
      refreshTokenTime: [,Validators.required],
      additionalInformation: [],
      autoapprove: [],
      tokenId: [this.tokenId]
    });
  }

  private patchClientValueToForm(client : Client){
    this.clientForm.patchValue({
      clientId: client.client_id,
      description: client.description,
      resourceIds: client.resource_ids != '' ? this.convertStringDataInArray(client.resource_ids, ",") : [],
      scope: client.scope != '' ? this.convertStringDataInArray(client.scope, ",") : [],
      grantTypes: client.authorized_grant_types != '' ? this.convertStringDataInArray(client.authorized_grant_types, ",") : [],
      redirectUri: client.web_server_redirect_uri,
      authorities: client.authorities,
      accessTokenTime: client.access_token_validity,
      refreshTokenTime: client.refresh_token_validity,
      additionalInformation: client.additional_information,
      autoapprove: client.autoapprove,
      tokenId: client.tokenId
    });
  }

  initializingOptionsSelects(){
    this.resourcesIdsOptions = resourcesIdsOptionsStatic;
    this.scopeOptions = scopeOptionsStatic;
    this.grantsOptions = grantsOptionsStatic;
  }

  convertStringDataInArray(dataString: string, definer: string) {
    return dataString.split(definer);
  }

  convertArrayInStringData(array: any[]) {
    return array.toString();
  }

  buildingClient(): Client {
    let client_id = this.getClientFormValue("clientId");
    let description = this.getClientFormValue("description");
    let client_secret = !this.isEdit ? this.getClientFormValue("clientSecret") : '123';

    let resource_ids = this.convertArrayInStringData(this.getClientFormValue("resourceIds")) ;
    let scope = this.convertArrayInStringData(this.getClientFormValue("scope"));
    let authorized_grant_types = this.convertArrayInStringData(this.getClientFormValue("grantTypes"));
    let web_server_redirect_uri = this.getClientFormValue("redirectUri");
    let authorities = this.getClientFormValue("authorities");
    let access_token_validity = this.getClientFormValue("accessTokenTime");
    let refresh_token_validity = this.getClientFormValue("refreshTokenTime");
    let additional_information = this.getClientFormValue(
      "additionalInformation"
    );
    let autoapprove = this.getClientFormValue("autoapprove");
    let tokenId = this.getClientFormValue("tokenId");

    return {
      client_id,
      description,
      client_secret,
      resource_ids,
      scope,
      authorized_grant_types,
      web_server_redirect_uri,
      authorities,
      access_token_validity,
      refresh_token_validity,
      additional_information,
      autoapprove,
      tokenId
    };
  }

  updateClient() {
    if(!this.formService.isValidForm(this.clientForm)){
      this.formService.validateForm(this.clientForm);
      this.formService.sendMessageError();
      return;
    }
    this.isLoadingClient = true;
    this.clientService.updateClientById(this.buildingClient(),this.getClientFormValue('clientId')).subscribe((response)=>{
      this.isLoadingClient = false;
      this.modal.destroy();
    })
  }

  createClient(){
    if(!this.formService.isValidForm(this.clientForm)){
      this.formService.validateForm(this.clientForm);
      this.formService.sendMessageError();
      return;
    }
    this.isLoadingClient = true;
    this.clientService.createClient(this.buildingClient()).subscribe((response)=>{
      this.isLoadingClient = false;
      this.modal.destroy();
    })
  }

  updateAdditionalField(event){
    this.getClientFormControl('additionalInformation').setValue(event);
  }

  goBack(): void {
    this.currentStepIndex -= 1;
  }

  next(): void {
    this.currentStepIndex += 1;
  }

  openDrawer(){
    this.visible = true;
  }

  closeDrawer(event){
    this.visible = event;
  }

  sendNotification(type : string){
    let clientId = this.getClientFormValue("clientId");
    this.notificationService.postNotification(this.buildingNotificationRequest(clientId, type), type).subscribe( response => {
      this.message.create('success',`${type} was sent correctly`);
    });
  }

  buildingNotificationRequest(clientId,type) : Notification{
    let subject = '';
    let to = ''; 
    if(type == 'EMAIL'){
      subject = 'Envio de correo para cambio de contraseña';
      to = localStorage.getItem('email');
    }
    if(type == 'SMS'){
      to = '+51'+localStorage.getItem('phone');
    }
    return {to: to,message: clientId,subject: subject};
  }
}
