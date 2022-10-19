import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from '@angular/forms';

@Component({
  selector: 'app-my-grocery',
  templateUrl: './my-grocery.component.html',
  styleUrls: ['./my-grocery.component.css']
})
export class MyGroceryComponent implements OnInit {

  baseServerUrl = 'http://localhost:5000/';
  baseGroceryUrl = 'grocery/';

  groceryCollection: [{name: '', cat: '', selected: false}];
  cat: '';
  itemName: '';
  selected: false;
  isDisabled: true;

 
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })
  }

  ngOnInit(): void {
    this.getGroceryCollection();
  }
  getGroceryCollection() {
    fetch(this.baseServerUrl+this.baseGroceryUrl)
      .then(res => res.json())
      .then(data => {        
        console.log(data);
        this.groceryCollection = data;
      }
    );
  };


  Data: Array<any> = [
    { name: 'Pear', value: 'pear', selected: false },
    { name: 'Plum', value: 'plum', selected: false },
    { name: 'Kiwi', value: 'kiwi', selected: true },
    { name: 'Apple', value: 'apple', selected: false },
    { name: 'Lime', value: 'lime', selected: false }
  ];
  form: FormGroup;
  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    console.log(e.target.value, ' : ', e.target.checked);
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {        
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }

    checkArray.controls.forEach((item: FormControl) => {        
      console.log(item.value);
    });
  }
  submitForm() {
    console.log(this.form.value);
  }
}
