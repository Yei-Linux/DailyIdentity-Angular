import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { FormService } from 'src/app/core/services/form.service';

@Component({
  selector: 'app-additional-information-modal',
  templateUrl: './additional-information-modal.component.html',
  styleUrls: ['./additional-information-modal.component.sass']
})
export class AdditionalInformationModalComponent implements OnInit {
  private additionalInformationForm : FormGroup;

  constructor(private formBuilder : FormBuilder,
              private modal: NzModalRef,
              private formService: FormService ) { }

  ngOnInit() {
    this.createFormGroup();
  }

  private createFormGroup(){
    this.additionalInformationForm = this.formBuilder.group({
      field: [,Validators.required],
      value: [,Validators.required]
    });
  }

  private addField(){
    if(!this.formService.isValidForm(this.additionalInformationForm)){
      this.formService.validateForm(this.additionalInformationForm);
      this.formService.sendMessageError();
      return;
    }
    this.modal.destroy(this.additionalInformationForm.value);
  }

}
