import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   constructor(
    private http: HttpClient,
    public router: Router,
  ) {
  } 
  
  private _authChangeSub = new Subject<boolean>();
  private _unChangeSub = new Subject<string>();
  public authChanged = this._authChangeSub.asObservable();
  public unChanged = this._unChangeSub.asObservable();
  public sendAuthStateChangeNotification = (isAuthenticated: boolean, userName: string) => {
    this._authChangeSub.next(isAuthenticated);
    this._unChangeSub.next(userName);
  }

  get isLoggedIn(): boolean {   
    let userName = localStorage.getItem('userName');
    return (userName !== null) ? true : false;
  }

  doLogout() {
    let removeUserName = localStorage.removeItem('userName');
    let removeParentEmail = localStorage.removeItem('parentEmail');
    let removeIsAuthenticated = localStorage.removeItem('isAuthenticated');

    if (removeUserName == null) {
      this.router.navigate(['/home']);
    }
  }
}
