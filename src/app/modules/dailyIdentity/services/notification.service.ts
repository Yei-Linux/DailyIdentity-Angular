import { Injectable } from '@angular/core';
import { Notification } from '../models/notification.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http : HttpClient) { }

  postNotification(notification : Notification, type : string){
    let params = new HttpParams();
    params = params.append('type',type);
    return this.http.post<any>(environment.identity_send_notifications,notification,{params: params});
  }
}
