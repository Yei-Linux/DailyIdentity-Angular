import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/modules/dailyIdentity/services/company.service';
import { UserService } from 'src/app/modules/dailyIdentity/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/core/services/form.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  private companyOptions = [];
  private passwordVisible = false;
  public signUpForm : FormGroup;
  private currentStepIndex: number = 0;

  constructor(private formBuilder: FormBuilder,
              private companyService : CompanyService,
              private userService : UserService,
              private route: ActivatedRoute,
              private router: Router,
              private formService: FormService) { 
                
              }

  ngOnInit() {
    this.createSignUpForm();
    this.getCompanies();
  }

  private getFieldSignUpForm(field : string){
    return this.signUpForm.get(field);
  }

  createSignUpForm(){
    this.signUpForm = this.formBuilder.group({
      firstName: [,Validators.required],
      middleName: [,Validators.required],
      lastName: [,Validators.required],
      age: [,Validators.required],
      genderId: [,Validators.required],
      address: [,Validators.required],
      username: [,[Validators.required,Validators.email,Validators.pattern('[^ @]*@[^ @]*')]],
      password: [,[Validators.required,Validators.minLength(8)]],
      phoneNumber: [,[Validators.required,,Validators.minLength(9)]],
      company:[,Validators.required]
    });
  }

  getCompanies(){
    this.companyService.getCompanies().subscribe( response =>{
      this.companyOptions = response;
    });
  }

  onSignUp(){
    if(!this.formService.isValidForm(this.signUpForm)){
      this.formService.validateForm(this.signUpForm);
      this.formService.sendMessageError();
      return;
    }
    let currentCompanyField = this.getFieldSignUpForm('company').value;
    this.getFieldSignUpForm('company').setValue(this.validateIfIsNewCompany(currentCompanyField));
    this.userService.postUser(this.buildingRequest()).subscribe( response => {
      this.router.parseUrl("/user/signin");
    });
  }

  validateIfIsNewCompany(companySelected : any){
    if(typeof companySelected[0] === 'string'){
      return [{id: 0, name: companySelected[0], token_id: 0}]
    }
    return companySelected
  }

  buildingRequest(){
    let firstName = this.getFieldSignUpForm('firstName').value;
    let middleName = this.getFieldSignUpForm('middleName').value;
    let lastName = this.getFieldSignUpForm('lastName').value;
    let age = this.getFieldSignUpForm('age').value;
    let address = this.getFieldSignUpForm('address').value;
    let typeUserId = 1;
    let genderId = this.getFieldSignUpForm('genderId').value;
    let user = { userName: this.getFieldSignUpForm('username').value, phoneNumber: this.getFieldSignUpForm('phoneNumber').value, password: this.getFieldSignUpForm('password').value};
    let company = this.getFieldSignUpForm('company').value[0];
    return {firstName,middleName,lastName,age,address,typeUserId,genderId,user,company};
  }

  goBack(): void {
    this.currentStepIndex -= 1;
  }

  next(): void {
    this.currentStepIndex += 1;
  }

}
