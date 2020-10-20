import { Injectable } from '@angular/core';
import { Token } from '../models/token.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private replaceVariablesInUrl(uri : string, pathVariable : string, value : string){
    return uri.replace(pathVariable,value);
  }

  constructor(private http : HttpClient) { }

  public updateSignatureToken(token : Token){
    return this.http.put<any>(environment.identity_update_signature_token,token);
  }
  public postAdditionalInformationForToken(tokenId: any,additionalInformation : string){
    return this.http.post<any>(this.replaceVariablesInUrl(environment.identity_post_additional_information_token,'{tokenId}',tokenId + ''),additionalInformation);
  }
  public getAdditionalInformationForToken(tokenId : any){
    return this.http.get<any>(this.replaceVariablesInUrl(environment.identity_get_additional_information_token,'{tokenId}',tokenId + ''));
  }
  public getAdditionalInformationFieldsUser(){
    return this.http.get<any>(environment.identity_get_additional_information_fields_by_user);
  }
}
