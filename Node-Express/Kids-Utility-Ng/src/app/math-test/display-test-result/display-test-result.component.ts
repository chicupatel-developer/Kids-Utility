import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-display-test-result',
  templateUrl: './display-test-result.component.html',
  styleUrls: ['./display-test-result.component.css']
})
export class DisplayTestResultComponent implements OnChanges {

  @Input() testName;
  @Input() minutes;
  @Input() seconds;
  @Input() parentEmail;
  @Input() userName;
  @Input() myProgress;
  @Input() testResult;
  @Input() totalCorrect;
  @Input() totalWrong;
  
 
  constructor() { }

  ngOnChanges() {
   console.log('in the display-test-result component...'+ this.testName);
  }

 

}
