import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { LocalDataService } from '../../services/local-data.service';
import { ToastService } from '../../services/toast.service';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  responseColor = '';
  apiResponse = '';

  eventTimeValue = { hour: 13, minute: 30 };
  meridian = true;

  form: FormGroup = new FormGroup({
    eventDateValue: new FormControl(''),
    eventTimeValue: new FormControl(''),
    eventTitle: new FormControl(''),
    eventDesc: new FormControl(''),
  });
  submitted = false;
 
  currentUser = '';
  
  constructor(
    private toastService : ToastService,
    public localDataService: LocalDataService,
    public userService: UserService,
    private formBuilder: FormBuilder,
    public router: Router,
  ) { }

  setCurrentUser() {
    if ((localStorage.getItem('userName')) != "") {
      this.currentUser = (localStorage.getItem('userName'));
    }
    else {
      this.currentUser = "";
    }
  }
  
  ngOnInit(): void {
    if (!this.userService.isLoggedIn) {
      this.router.navigate(['/home']);
    }
   
    this.setCurrentUser();

    this.form = this.formBuilder.group(
      {
        eventDateValue: [
          '',
          [
            Validators.required,
          ]
        ],
        eventTimeValue: [
          '',
          [
            Validators.required,
          ]
        ],
        eventTitle: [
          '',
          [
            Validators.required,
          ]
        ],
        eventDesc: [
          '',
          [
            Validators.required,
          ]
        ],
      
      },
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.responseColor = '';
    this.apiResponse = '';
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);


    var eventDate_ = this.form.value["eventDateValue"];
    var edate = new Date(eventDate_);
    edate.setHours(this.eventTimeValue.hour - 5, this.eventTimeValue.minute, 0);   // Set hours, minutes and seconds
    // console.log(edate.toUTCString()+"-0500 (Central Standard Time)");

    var eventModel = {
      id: this.localDataService.getGUID(),
      userName: this.currentUser,
      eventDate: edate.toUTCString() + "-0500 (Central Standard Time)",
      eventTitle: this.form.value["eventTitle"],
      eventDesc: this.form.value["eventDesc"],
    }

    console.log(eventModel);

    // api call
    fetch(this.localDataService.getServerUrl()+this.localDataService.getEventServiceUrl()+'create', {
      method: 'POST',
      body: JSON.stringify(eventModel),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.error) {
          this.responseColor = 'red';
          this.apiResponse = json.error;
          this.toastService.showError('Event - Create ',json.error);
        }
        else {
          this.responseColor = 'green';
          this.apiResponse = json.message;
          this.toastService.showSuccess('Event - Create ',json.message);

          this.onReset();

          // redirect to view-event
          setTimeout(() => {
            this.apiResponse = '';
            this.responseColor = '';
          }, 2000);
        }
      }
      );
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
