import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocalDataService } from '../../services/local-data.service';
import { Observable } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  
  editingEvent;

  form: FormGroup;
  submitted = false;

  responseColor = '';
  apiResponse = ''; 


  eventTimeValue = { hour: 13, minute: 30 };
  meridian = true;

  currentUser = '';

  constructor(
    public localDataService: LocalDataService, 
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.editingEvent = this.localDataService.getMyEvent();
  
    if (this.editingEvent == null || this.editingEvent == undefined)
      this.router.navigate(['/view-event']);
    else {

      this.setCurrentUser();

      this.form = this.fb.group({
        eventTitle: ['', Validators.required],
        eventDesc: ['', Validators.required],
        eventDateValue: ['', Validators.required],
        eventTimeValue: ['', Validators.required],
      });

      this.eventTimeValue.hour = new Date(this.editingEvent.eventData.eventDate).getHours();
      this.eventTimeValue.minute = new Date(this.editingEvent.eventData.eventDate).getMinutes();
      this.form.setValue({
        eventTitle: this.editingEvent.eventData.eventTitle,
        eventDesc: this.editingEvent.eventData.eventDesc,
        eventDateValue: new Date(this.editingEvent.eventData.eventDate),
        eventTimeValue: this.eventTimeValue,
      });
    }
  }

  setCurrentUser() {
    if ((localStorage.getItem('userName')) != "") {
      this.currentUser = (localStorage.getItem('userName'));
    }
    else {
      this.currentUser = "";
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  
  editEvent() {
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

    var eventModel = {
      id: this.editingEvent.eventData.id,
      userName: this.currentUser,
      eventDate: edate.toUTCString() + "-0500 (Central Standard Time)",
      eventTitle: this.form.value["eventTitle"],
      eventDesc: this.form.value["eventDesc"],
    }

    console.log(eventModel);

    // api call
    fetch(this.localDataService.getServerUrl() + this.localDataService.getEventServiceUrl() + 'edit', {
      method: 'POST',
      body: JSON.stringify(eventModel),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.error) {
          this.responseColor = 'red';
          this.apiResponse = json.error;
        }
        else {
          this.responseColor = 'green';
          this.apiResponse = json.message;

          this.onReset();

          // redirect to view-event
          setTimeout(() => {
            this.apiResponse = '';
            this.responseColor = '';
            this.router.navigate(['/view-event']);
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
