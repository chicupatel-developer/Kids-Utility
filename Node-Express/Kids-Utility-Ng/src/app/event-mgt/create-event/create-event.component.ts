import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { LocalDataService } from '../../services/local-data.service';

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
  eventModel = {
    eventDate: '',
    eventTitle: '',
    eventDesc: '',
    userName: '',
    id: '',
  };
  
  constructor(
    public localDataService: LocalDataService,
    public userService: UserService,
    private formBuilder: FormBuilder,
    public router: Router,
  ) { }

  ngOnInit(): void {
    if (!this.userService.isLoggedIn) {
      this.router.navigate(['/home']);
    }
   
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
      // return;
    }
    console.log(this.form.value);   
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
    this.responseColor = '';
    this.apiResponse = '';
  }

}
