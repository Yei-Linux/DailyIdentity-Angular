import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  get companyName(){
    return JSON.parse(localStorage.getItem('additional_information_user'))['companyName'];
  }

}
