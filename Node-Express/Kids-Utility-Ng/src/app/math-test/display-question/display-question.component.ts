import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-display-question',
  templateUrl: './display-question.component.html',
  styleUrls: ['./display-question.component.css']
})
export class DisplayQuestionComponent implements OnChanges {

  @Input() testName;
  @Input() minutes;
  @Input() seconds;
  @Input() questionNumber;
  @Input() number1;
  @Input() number2;
  @Input() location;
  @Input() wrongLocation1;
  @Input() wrongLocation2;
  @Input() operator;
  @Input() value; // correct-answer
  @Input() wrongAnswer1;
  @Input() wrongAnswer2;
  
  @Output() onAnswerOptionChange = new EventEmitter();
  @Output() onNextQuestion = new EventEmitter();

  answerOption = '';

  constructor() { }

  ngOnChanges() {   
  }

  answerOptionChange(event) {
    this.answerOption = event.target.value;
    this.onAnswerOptionChange.emit(event.target.value);
  }
  nextQuestion() {
    this.onNextQuestion.emit();
  }

  getOptionValueForRightAnswer() {
    if (this.answerOption == this.value.toString())
      return true;
    else
      return false;
  }
  getOptionValueForWrongAnswer1() {
    if (this.answerOption == this.wrongAnswer1.toString())
      return true;
    else
      return false;
  }
  getOptionValueForWrongAnswer2() {
    if (this.answerOption == this.wrongAnswer2.toString())
      return true;
    else
      return false;
  }
}
