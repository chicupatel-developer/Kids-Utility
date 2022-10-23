import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';
import { LocalDataService } from '../services/local-data.service';
import Validation from '../services/validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  responseColor = '';
  apiResponse = '';

  form: FormGroup = new FormGroup({
    UserName: new FormControl(''),
    Password: new FormControl(''),
    ConfirmPassword: new FormControl(''),
    ParentEmail: new FormControl(''),
  });
  submitted = false;
  registerModel = {
    userName: '',
    password: '',
    confirmPassword: '',
    email: ''
  };
  
  constructor(
    public localDataService: LocalDataService,
    public userService: UserService,
    private formBuilder: FormBuilder,
    public router: Router,
  ) { }

  ngOnInit() {
    if (this.userService.isLoggedIn) {
      this.router.navigate(['/home']);
    }
   
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
        ConfirmPassword: [
          '',
          [
            Validators.required,
          ]
        ],
        ParentEmail: ['', [Validators.required, Validators.email]],
      },    
      {
        validators: [Validation.match('Password', 'ConfirmPassword')]
      }
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

    this.registerModel.userName = this.form.value["UserName"];
    this.registerModel.password = this.form.value["Password"];
    this.registerModel.email = this.form.value["ParentEmail"];
      
    console.log(this.registerModel);

    // api call
    fetch(this.localDataService.getServerUrl()+this.localDataService.getAuthServiceUrl()+"usercreate", {
      method: "POST",
      body: JSON.stringify(this.registerModel),
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);   
      if (json.error) {
        this.responseColor = 'red';
        this.apiResponse = json.error;
        console.log('Error : ' + this.apiResponse);    
      }
      else {
        this.responseColor = 'green';
        this.apiResponse = "Success!";
       
        setTimeout(() => {
          this.onReset();
          this.router.navigate(['/signin']);
        }, 3000);
      }
    });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
    this.responseColor = '';
    this.apiResponse = '';
  }
}
