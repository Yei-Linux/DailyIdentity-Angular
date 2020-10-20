import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private replaceVariablesInUrl(uri : string, pathVariable : string, value : string){
    return uri.replace(pathVariable,value);
  }

  constructor(private http: HttpClient) { }

  public getCompanies(){
    return this.http.get<any>(environment.identity_get_companies);
  }
}
