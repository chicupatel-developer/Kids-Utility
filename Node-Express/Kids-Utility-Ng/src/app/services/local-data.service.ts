import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  private UserName;
  private ParentEmail;
  private isAuthenticated;  
  private MyEvent;
  private EventOption;

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
  getEventServiceUrl() {
    return "event/";
  }

  // send email to parent-email
  // fetch api
  // node-express
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

  // generates id for event database
  getGUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // store event object for further viewing @ event-details component
  setMyEvent(val) {
    this.MyEvent = val;
  }
  getMyEvent() {
    return this.MyEvent;
  }
  setEventOption(val) {
    this.EventOption = val;
  }
  getEventOption() {
    return this.EventOption;
  }
}
