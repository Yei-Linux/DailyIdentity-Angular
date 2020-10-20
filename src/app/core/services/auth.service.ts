import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public isTokenInLocalStorage() {
    if (localStorage.getItem("access_token") != null) {
      return true;
    }
    return false;
  }

  public authenticationUser(username: any,password: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${environment.identity_credentials.client_id}:${environment.identity_credentials.client_secret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const data = new HttpParams()
    .set('username', username)
    .set('password', password)
    .set('grant_type', environment.identity_credentials.grant_type);

    return this.http.post(
      environment.idnetity_authentication_users,
      data,
      {headers: headers}
    );
  }
}
