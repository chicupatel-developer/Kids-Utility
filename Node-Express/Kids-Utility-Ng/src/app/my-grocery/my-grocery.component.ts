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

  apiResponse = '';
  responseColor = '';

  baseServerUrl = 'http://localhost:5000/';
  baseGroceryUrl = 'grocery/';

  groceryCollection: [{name: '', cat: '', selected: false}];
  
  cat: '';
  itemName: '';
  selected: false;
  isDisabled: true;
  
  form: FormGroup;
 
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })
  }
  ngOnInit(): void {
    this.getGroceryCollection();
  }
  
  onCheckboxChange(e, data) {
    var checkArray: FormArray = this.form.get('checkArray') as FormArray;

    console.log(e.target.value, ' : ', e.target.checked);    

    let index = this.groceryCollection.findIndex(x => x.name === e.target.value);
    index!==-1 && (this.groceryCollection[index].selected = e.target.checked);
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

  saveMyList() {
    console.log(this.groceryCollection);

    this.responseColor = '';
    this.apiResponse = '';

    // send groceryList to server
    fetch(this.baseServerUrl+this.baseGroceryUrl+"edit", {
      method: "POST",
      // body: JSON.stringify(groceryCollection),
      body: JSON.stringify(this.groceryCollection),
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);

      if (json.error) {
        this.responseColor = 'red';
        this.apiResponse = json.error;        
      }
      else {
        this.responseColor = 'green';
        this.apiResponse = json.success;
      
        setTimeout(() => {
          this.onReset();
        }, 3000);
      }
    });
  }
  
  onReset() {
    this.responseColor = '';
    this.apiResponse = '';
  }

  displayOrNot(data, cat) {
    if (data.cat == cat)
      return true;
    else
      return false;
  }
}
