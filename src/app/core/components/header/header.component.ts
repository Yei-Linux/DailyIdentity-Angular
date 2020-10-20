import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  get fullName(){
    return localStorage.getItem('fullname');
  }

  get email(){
    return localStorage.getItem('email');
  }

  logOut(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('additional_information_user');
    localStorage.removeItem('fullname');
    localStorage.removeItem('email');
    localStorage.removeItem('phone');
    this.router.navigateByUrl('/user/signin');
  }

}
