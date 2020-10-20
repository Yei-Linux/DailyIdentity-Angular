import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  replaceVariablesInUrl(uri : string, pathVariable : string, value : string){
    return uri.replace(pathVariable,value);
  }

  public getUsersByCompanyId(companyId : number){
    return this.http.get<any>(this.replaceVariablesInUrl(environment.identity_get_users,'{companyId}',companyId + ''));
  }

  public postUser(userRequest : any){
    return this.http.post<any>(environment.identity_post_users,userRequest);
  }
}
