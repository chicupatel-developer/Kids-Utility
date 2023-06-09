import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from '@angular/forms';

import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-my-grocery',
  templateUrl: './my-grocery.component.html',
  styleUrls: ['./my-grocery.component.css']
})
export class MyGroceryComponent implements OnInit {

  addItemApiResponse = '';
  
  apiResponse = '';
  responseColor = ''; 

  groceryCollection: [{name: '', cat: '', selected: false}];
  
  categories = []; 

  formEntry: FormGroup = new FormGroup({
    Category: new FormControl(''),
    ItemName: new FormControl(''),
  });

  form: FormGroup;
 
  constructor(private fb: FormBuilder, public localDataService: LocalDataService,) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    });


    this.formEntry = this.fb.group(
      {
        Category: [
          '',        
        ],
        ItemName: [
          '',        
        ],      
      },     
    );
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.formEntry.controls;
  }
  
  ngOnInit(): void {
    this.getGroceryCollection();

    this.categories = ["Fruit", "Frozen", "Vegitables", "Bakery", "Others"];

    this.formEntry.controls['ItemName'].disable();   
  }
  
  onCheckboxChange(e, data) {
    var checkArray: FormArray = this.form.get('checkArray') as FormArray;

    console.log(e.target.value, ' : ', e.target.checked);    

    let index = this.groceryCollection.findIndex(x => x.name === e.target.value);
    index!==-1 && (this.groceryCollection[index].selected = e.target.checked);
  }
  
  getGroceryCollection() {
    fetch(this.localDataService.getServerUrl()+this.localDataService.getGroceryServiceUrl())
      .then(res => res.json())
      .then(data => {        
        console.log(data);
        this.groceryCollection = data;
      }
    );
  };

  changeCategory(e) {
    console.log(e.target.value);
    if (e.target.value == '') {  
      this.formEntry.patchValue({
        ItemName: '',
      });
      this.formEntry.controls['ItemName'].disable();   
    }
    else {    
      this.formEntry.controls['ItemName'].enable();   
    }
  }
  
  addItem() {     
    console.log(this.formEntry.value);

    this.responseColor = '';
    this.addItemApiResponse = '';

    if (this.formEntry.value["Category"] == '' || this.formEntry.value["ItemName"] == '') {
      this.addItemApiResponse = "Invalid Data Entry!";
      this.responseColor = 'red';
    }
    else {
      var data = {
          cat: this.formEntry.value["Category"],
          name: this.formEntry.value["ItemName"],
          selected: false,
        };
      fetch(this.localDataService.getServerUrl()+this.localDataService.getGroceryServiceUrl()+"add", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.error) {
          this.addItemApiResponse = json.error;
          this.responseColor = 'red';
        }
        else {
          this.addItemApiResponse = json.message;
          this.responseColor = 'green';
          this.getGroceryCollection();
          this.formEntry.patchValue({
            Category: '',
            ItemName: '',
          });       
        }      
      });
    }
    setTimeout(() => {
      this.onReset();
    }, 3000);
  }

  saveMyList() {
    console.log(this.groceryCollection);

    this.responseColor = '';
    this.apiResponse = '';

    // send groceryList to server
    fetch(this.localDataService.getServerUrl()+this.localDataService.getGroceryServiceUrl()+"edit", {
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
    this.addItemApiResponse = '';
  }

  displayOrNot(data, cat) {
    if (data.cat == cat)
      return true;
    else
      return false;
  }
}
