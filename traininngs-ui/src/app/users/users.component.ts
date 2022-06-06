import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {

  userConfig: any = {
    showLoginPopup: false,
    data: {}
  };

  constructor(private readonly usersService: UsersService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') && localStorage.getItem('role') === 'user') {
      this.getUserDetails();
    } else {
      localStorage.clear();
    }
    this.usersService.isLoggedIn.subscribe(value => {
      this.userConfig.data.isLoggedIn  = value;
    });
    this.usersService.showLogin.subscribe(value => {
      this.userConfig.showLoginPopup = value;
    })
  }

  getUserDetails() {
    this.usersService.getTokenDetails().subscribe(response => {
      this.userConfig.data = response;
      this.usersService.isLoggedIn.next(true);
    }, error => {
      console.log(error);
    });
  }

}
