import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private message: NzMessageService) { }

  validateForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateForm(control);
      }
    });
  }

  public isValidForm(formGroup : FormGroup) : Boolean{
    return formGroup.valid;
  }

  public sendMessageError(){
    this.message.create('error',`Empty or Invalid Fields in Form`);
  }
}
