import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Client } from "../models/client.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ClientService {
  constructor(private http: HttpClient) {}

  replaceVariablesInUrl(uri : string, pathVariable : string, value : string){
    return uri.replace(pathVariable,value);
  }

  getClients(tokenId : string): Observable<Client[]> {
    let params = new HttpParams();
    params = params.append('tokenId',tokenId);
    return this.http.get<Client[]>(environment.identity_get_client,{params: params});
  }
  getClientById(clientId : string): Observable<Client> {
    return this.http.get<Client>(this.replaceVariablesInUrl(environment.identity_get_client_by_id,'{client_id}',clientId + ''));
  }
  updateClientById(client : Client,clientId : string){
    return this.http.put<any>(this.replaceVariablesInUrl(environment.identity_update_client_by_id,'{client_id}',clientId + ''),client);
  }
  updateClientSecret(client : Client,clientId : string){
    return this.http.put<any>(this.replaceVariablesInUrl(environment.identity_update_client_secret_by_id,'{client_id}',clientId + ''),client);
  }
  createClient(client : Client){
    return this.http.post<any>(environment.identity_post_client,client);
  }
  deleteClientById(clientId : string){
    return this.http.delete(this.replaceVariablesInUrl(environment.identity_delete_client,'{client_id}',clientId + ''));
  }
}
