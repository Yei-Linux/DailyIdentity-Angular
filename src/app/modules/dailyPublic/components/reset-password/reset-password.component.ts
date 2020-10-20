import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/core/services/form.service';
import { NzMessageService } from 'ng-zorro-antd';
import { ClientService } from 'src/app/modules/dailyIdentity/services/client.service';
import { Client } from 'src/app/modules/dailyIdentity/models/client.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit {
  public passwordVisible : Boolean = false;
  public resetPasswordVisible : Boolean = false;
  public passwordForm : FormGroup;
  @Input() clientId : any;

  constructor(private formBuilder: FormBuilder,
               private formService: FormService,
               private message: NzMessageService,
               private clientService : ClientService,
               private router: Router) { }

  ngOnInit() {
    this.createPasswordForm();
  }

  private getFieldValueForm(field : string){
    return this.passwordForm.get(field).value;
  }

  createPasswordForm(){
    this.passwordForm = this.formBuilder.group({
      password: [, [Validators.required,Validators.minLength(8)]],
      resetPassword: [, [Validators.required,Validators.minLength(8)]]
    });
  }

  isEqualsPasswords(){
    if(this.getFieldValueForm('password') == this.getFieldValueForm('resetPassword'))
      return true;
    return false;
  }

  changePassword(){
    if(!this.formService.isValidForm(this.passwordForm)){
      this.formService.validateForm(this.passwordForm);
      this.formService.sendMessageError();
      return;
    }

    if(!this.isEqualsPasswords()){
      this.message.create('error',`Passwords must be equals`);
      return;
    }

    this.clientService.updateClientSecret(this.buildingRequest(),this.clientId).subscribe( response => {
      this.message.create('success',`Client secret was updated`);
      this.router.navigateByUrl("/identity/clients/settings");
    });
  }

  buildingRequest() : Client{
    return {client_id: this.clientId,client_secret: this.getFieldValueForm('password')}
  }

}
