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



  form: FormGroup;
  onCheckboxChange(e, data) {
    var checkArray: FormArray = this.form.get('checkArray') as FormArray;

    console.log(e.target.value, ' : ', e.target.checked);    

    let index = this.groceryCollection.findIndex(x => x.name === e.target.value);
    index!==-1 && (this.groceryCollection[index].selected = e.target.checked);
  }
  saveMyList() {
    console.log(this.groceryCollection);
  }
}
