import { Component, OnInit } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { FormService } from 'src/app/core/services/form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginForm : FormGroup;
  private passwordVisible = false;

  constructor(private formBuilder : FormBuilder,
               private authService : AuthService,
               private router: Router,
               private formService : FormService) { 
    this.createLoginForm();
  }

  ngOnInit() {
  }
  
  private getLoginField(field : string){
    return this.loginForm.get(field);
  }

  private createLoginForm(){
    this.loginForm = this.formBuilder.group({
      username: [null,[Validators.required,Validators.email,Validators.pattern('[^ @]*@[^ @]*')]],
      password: [null, [Validators.required,Validators.minLength(8)]]
    });
  }

  private signIn(){
    if(!this.formService.isValidForm(this.loginForm)){
      this.formService.validateForm(this.loginForm);
      this.formService.sendMessageError();
      return;
    }
    this.authService.authenticationUser(this.getLoginField('username').value,this.getLoginField('password').value).subscribe( (response : any) => {
      localStorage.setItem('access_token',response.access_token);
      localStorage.setItem('additional_information_user',JSON.stringify(response.additional_information_user));
      localStorage.setItem('fullname',response.first_name + ' ' + response.middle_name + ' ' + response.last_name);
      localStorage.setItem('email',response.email);
      localStorage.setItem('phone',response.phone);
      this.router.navigateByUrl("/identity/clients/settings");
    });
  }
}
