import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  baseServerUrl = 'http://localhost:5000/';
  baseAuthUrl = 'auth/';

  responseColor = '';
  apiResponse = '';
  parentEmail = '';

  form: FormGroup = new FormGroup({
    UserName: new FormControl(''),
    Password: new FormControl(''),
  });
  submitted = false;
  signinModel = {
    userName: '',
    password: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        UserName: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        Password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
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
    this.parentEmail = '';

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.signinModel.userName = this.form.value["UserName"];
    this.signinModel.password = this.form.value["Password"];
      
    console.log(this.signinModel);

      // api call
    fetch(this.baseServerUrl+this.baseAuthUrl+"login", {
      method: "POST",
      body: JSON.stringify(this.signinModel),
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);   
      if (json.error) {
        this.responseColor = 'red';
        this.apiResponse = json.error;
        console.log('Error : '+this.apiResponse);
      }
      else {
        this.responseColor = 'green';
        this.apiResponse = "Success!";
        this.parentEmail = json.parentEmail;
        localStorage.setItem("userName", JSON.stringify(this.signinModel.userName));
        localStorage.setItem("parentEmail", JSON.stringify(json.parentEmail));

        setTimeout(() => {
          this.onReset();
          this.router.navigate(['/home']);
        }, 3000);
      }
    });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
    this.responseColor = '';
    this.apiResponse = '';
    this.parentEmail = '';
  }
}
