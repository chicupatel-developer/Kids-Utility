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

      this.form = this.fb.group({
        eventTitle: ['', Validators.required],
        eventDesc: ['', Validators.required],
        eventDateValue: new FormControl(''),
        eventTimeValue: new FormControl(''),
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
  }
}
