import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from "@angular/core";
import { TokenService } from "../../../../services/token.service";
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl,
} from "@angular/forms";
import { AdditionalInformationModalComponent } from "./additional-information-modal/additional-information-modal.component";
import { NzModalService, NzMessageService } from "ng-zorro-antd";
import { FormService } from 'src/app/core/services/form.service';

@Component({
  selector: "app-token-additional",
  templateUrl: "./client-additional.component.html",
  styleUrls: ["./client-additional.component.sass"],
})
export class ClientAdditionalComponent implements OnInit {

  @Input() public additionalInformation : string = null;
  @Output() public updateAdditionalInformationClient = new EventEmitter<any>();

  private dynamicalFormGroup: FormGroup = new FormGroup({});
  private isSpinning : boolean = false;
  private isJsonTest : boolean = false;

  constructor(
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private changeDedectionRef: ChangeDetectorRef,
    private modalService: NzModalService,
    private message: NzMessageService,
    private formService: FormService
  ) {}

  ngAfterContentChecked(): void {
    this.changeDedectionRef.detectChanges();
  }

  ngOnInit() {
    this.buildingDynamicalForm(JSON.parse(this.additionalInformation));
  }

  get dynamicalFormGroupArray() {
    return this.dynamicalFormGroup.controls;
  }

  get controlsNameOfDynamicalForm() {
    return Object.keys(this.dynamicalFormGroupArray);
  }


  updateAdditionalInformation(){
    if(!this.formService.isValidForm(this.dynamicalFormGroup)){
      this.formService.validateForm(this.dynamicalFormGroup);
      this.formService.sendMessageError();
      return;
    }
    this.isSpinning = true;
    this.updateAdditionalInformationClient.emit(JSON.stringify(this.dynamicalFormGroup.value));
    this.isSpinning = false;
    this.message.create('success','Additional information updated correctly');
  }

  launchModalAddField(title: string) {
    const modal = this.modalService.create({
      nzTitle: title,
      nzContent: AdditionalInformationModalComponent,
      nzFooter: null,
      nzMaskClosable: false,
      nzWidth: "500px",
      nzClosable: true,
      nzOkDisabled: true,
      nzOkText: null,
      nzCancelDisabled: true,
      nzCancelText: null,
    });

    modal.afterClose.subscribe((response: any) => {
      if(response){
        this.message.create('success','Field added correctly');
        this.addFieldToDynamicalForm(response.field,response.value);  
      }
    });
  }

  cancelDeleteField(field : string){
    this.message.create('info',`Field ${field} hasnt been deleted`);
  }

  //TODO: Convert this feature into service or pipe
  buildingDynamicalForm(data: any): void {
    let formGroup = {};
    if(data == null){
      return
    }
    
    Object.keys(data).map((keyOfJson: any) => {
      formGroup[keyOfJson] = [
        data[keyOfJson],
        Validators.required,
      ];
    })
    this.dynamicalFormGroup = this.formBuilder.group(formGroup);
  }

  addFieldToDynamicalForm(field: string, value: string) {
    this.dynamicalFormGroup.addControl(
      field,
      new FormControl(value, Validators.required)
    );
  }

  deleteFieldToDynamicalForm(field: string){
    this.dynamicalFormGroup.removeControl(field);
    this.message.create('success',`Field ${field} has been deleted`);
  }

  clearDynamicalForm(data: any[]) {
    data.map((elementOfForm) => {
      this.dynamicalFormGroup.controls[elementOfForm.field].reset({
        value: null,
        disabled: false,
      });
    });
  }
}
