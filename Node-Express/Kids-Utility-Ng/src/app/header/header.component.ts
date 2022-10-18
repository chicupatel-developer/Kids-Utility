import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { LocalDataService } from '../services/local-data.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isUserAuthenticated: boolean;
  public userName: string;

  constructor(public _localService: LocalDataService, public _userService: UserService, private _router: Router) {
    this._userService.authChanged
      .subscribe(res => {
        this.isUserAuthenticated = res;
    });
     this._userService.unChanged
      .subscribe(res => {
        this.userName = res;
    })
  }

  ngOnInit(): void {
    
    console.log('getting is-authenticated and user-name values,,,');
  
    this.userName = localStorage.getItem("userName");
    console.log('user name ,,, ', this.userName);
    this.isUserAuthenticated = (localStorage.getItem("isAuthenticated") =="true"); 
    console.log('is-authenticated ,,, ',this.isUserAuthenticated);
  }

  logout() {
    this._userService.doLogout();
  }
  
}
