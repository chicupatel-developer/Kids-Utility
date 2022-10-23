import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  number1 = 9.1291754;
  number2 = 9.1391754;
  plusVariant = 0.01;
  minusVariant = 0.01;

 
  timeStartRunTime = { hour: 13, minute: 30 };
  meridian = true;    

	constructor() {}
 
  
  ngOnInit(): void {
   
    console.log((Number(this.number1.toFixed(2)) + Number(this.number2.toFixed(2))).toFixed(2));
    console.log((Number(this.number1.toFixed(2))+Number(this.number2.toFixed(2))+Number(this.plusVariant.toFixed(2))).toFixed(2) );
    console.log((Number(this.number1.toFixed(2))+Number(this.number2.toFixed(2))-Number(this.minusVariant.toFixed(2))).toFixed(2) );
    

    
  }

}
