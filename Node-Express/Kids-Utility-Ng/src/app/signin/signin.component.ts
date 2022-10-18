import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  responseColor = '';
  errors = [];

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
    this.errors = [];  

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    
      var userTokenData = {
        UserName: '',
        Token: '',
        LoginTime: '',
        ResponseCode: 0,
        ResponseMessage: '',       
        MyRole: ''
      }
          
      this.signinModel.userName = this.form.value["UserName"];
      this.signinModel.password = this.form.value["Password"];
      
    console.log(this.signinModel);

      // api call
    fetch("http://localhost:5000/auth/login", {
      method: "POST",
      body: JSON.stringify(this.signinModel),
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);      
    });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
    this.responseColor = '';
    this.errors = [];    
  }
}
