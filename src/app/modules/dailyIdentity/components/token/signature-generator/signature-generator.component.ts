import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenService } from '../../../services/token.service';
import { Token } from '../../../models/token.model';
import { NzMessageService } from 'ng-zorro-antd';
import { FormService } from 'src/app/core/services/form.service';

@Component({
  selector: 'app-signature-generator',
  templateUrl: './signature-generator.component.html',
  styleUrls: ['./signature-generator.component.sass']
})
export class SignatureGeneratorComponent implements OnInit {
  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }
  private signatureForm : FormGroup;

  constructor(private formBuilder : FormBuilder,
              private tokenService : TokenService,
              private message: NzMessageService,
              private formService: FormService) { }

  ngOnInit() {
    this.creatSignatureForm();
  }


  get tokenId(){
    return JSON.parse(localStorage.getItem('additional_information_user'))['tokenId'];
  }

  private getSignatureField(field : string){
    return this.signatureForm.get(field);
  }

  private creatSignatureForm(){
    this.signatureForm = this.formBuilder.group({
      privateKey: [,Validators.required],
      publicKey: [,Validators.required]
    });
  }

  generateSignature(){
    if(!this.formService.isValidForm(this.signatureForm)){
      this.formService.validateForm(this.signatureForm);
      this.formService.sendMessageError();
      return;
    }
    let timestamp = Date.now()
    let privateFile = 'private'+timestamp
    let publicFile = 'public'+timestamp
    this.generateSignatureFile(privateFile,this.getSignatureField('privateKey').value);
    this.generateSignatureFile(publicFile,this.getSignatureField('publicKey').value);

    this.updateSignatureToken();
  }

  generateSignatureFile( fileName : string, text : string){
    this.setting.element.dynamicDownload = document.createElement('a')
    const element = this.setting.element.dynamicDownload
    const fileType ='text/plain'
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent('')}`)
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(text)}`)
    element.setAttribute('download', fileName)

    var event = new MouseEvent('click')
    element.dispatchEvent(event)
  }

  updateSignatureToken(){
    this.tokenService.updateSignatureToken(this.buildingTokenSignature()).subscribe(response =>{
      this.message.create('success',`Updated Succesfully signature of your token`);
      this.resetFormGroup('privateKey');
      this.resetFormGroup('publicKey');
    });
  }

  buildingTokenSignature() : Token{
    let id = Number(this.tokenId);
    let signingKey = this.getSignatureField('privateKey').value;
    let verifierKey = this.getSignatureField('publicKey').value;

    return {id,signingKey,verifierKey}
  }

  resetFormGroup(field : string){
    this.getSignatureField(field).setValue(null);
  }

}
