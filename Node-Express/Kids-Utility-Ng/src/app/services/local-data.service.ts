import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  private UserName;
  private ParentEmail;
  private isAuthenticated;  

  constructor() { }

  
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

  getServerUrl() {
    return "http://localhost:5000/";
  }
  getAuthServiceUrl() {    
    return "auth/";
  }
  getGroceryServiceUrl() {
    return "grocery/";
  }
  getMathTestServiceUrl() {
    return "math-test/";
  }
  getEmailServiceUrl() {
    return "email/";
  }
  sendResultToMyParent(testresult) {
    // prepare data for api call
    var data = {
      to: testresult.parentEmail,
      subject: 'Math - Test Result!',
      text: 'Math - Test Result!',
      testName: testresult.testName,
      totalCorrect: testresult.totalCorrect,
      totalWrong: testresult.totalWrong,
      testMinutes: testresult.timeMinutes,
      testSeconds: testresult.timeSeconds
    };

    // api call
    fetch(this.getServerUrl() + this.getEmailServiceUrl() + 'send', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .then(json => {
        console.log(json);
      }
      );
  }
}
