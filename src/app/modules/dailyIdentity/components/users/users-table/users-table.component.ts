import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.sass']
})
export class UsersTableComponent implements OnInit {

  private users = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserByCompanyId();
  }
  
  get companyId(){
    return Number(JSON.parse(localStorage.getItem('additional_information_user'))['companyId']);
  }

  getUserByCompanyId(){
    this.userService.getUsersByCompanyId(this.companyId).subscribe( response => {
      this.users = response;
    });
  }

}
