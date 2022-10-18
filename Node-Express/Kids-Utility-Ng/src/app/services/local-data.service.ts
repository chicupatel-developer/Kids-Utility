import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  private UserName;
  private ParentEmail;
  private isAuthenticated;

  
  setUserName(val) {
    this.UserName = val;
  }
  getUserName() {
    return this.UserName;
  }

  setParentEmail(val) {
    this.ParentEmail = val;
  }
  getParentEmail() {
    return this.ParentEmail;
  }

  setIsAuthenticated(val) {
    this.isAuthenticated = val;
  }
  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  constructor() { }
}
