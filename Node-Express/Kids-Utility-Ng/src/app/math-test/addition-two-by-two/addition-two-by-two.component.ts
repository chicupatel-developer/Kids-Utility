import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { LocalDataService } from '../../services/local-data.service';

@Component({
  selector: 'app-addition-two-by-two',
  templateUrl: './addition-two-by-two.component.html',
  styleUrls: ['./addition-two-by-two.component.css']
})
  

export class AdditionTwoByTwoComponent implements OnInit {

  // Addition 2 digits
  number1Lower = 0;
  number1Upper = 99;
  number2Lower = 0;
  number2Upper = 99;

  testName = 'Addition [2 Digits + 2 Digits]';  
  operator = '+';

  parentEmail = '';

  // timer
  seconds = 0;
  minutes = 0;
  time = 0;
  isOn = false;
  start = 0;

  // start test
  startTest = false;

  location = 0;
  wrongLocation1 = 0;
  wrongLocation2 = 0;
  questionNumber = 0;
  answerOption = '-';
  number1 = 0;
  number2 = 0;
  correctAnswer = 0;
  wrongAnswer1 = 0;
  wrongAnswer2 = 0;
  myProgress = [];
  totalCorrect = 0;
  totalWrong = 0;
  displayTestResult = false;
  
  constructor(
    public localDataService: LocalDataService,
    public userService: UserService,
    private formBuilder: FormBuilder,
    public router: Router,
  ) { }
  
  ngOnInit(): void {
    if (!this.userService.isLoggedIn) {
      this.router.navigate(['/home']);
    }
    this.setParentEmail();

    this.onStartTest();
  }

  setParentEmail() {
    if ((localStorage.getItem('parentEmail')) != "") {
      this.parentEmail = (localStorage.getItem('parentEmail'));
    }
    else {
      this.parentEmail = "";
    }
  }
 
  onStartTest() {
    this.startTest = true;
    this.myProgress = [];
    localStorage.setItem("my-progress", JSON.stringify([]));
    this.getStart();
    this.getMyProgressFromLocalStorage();
  }
  startTimer() {  
  }
  

  // next test
  resetTest() {
    this.location = 0;
    this.wrongLocation1 = 0;
    this.wrongLocation2 = 0;
    this.questionNumber = 0;
    this.answerOption = '-';
    this.number1 = 0;
    this.number2 = 0;
    this.correctAnswer = 0;
    this.wrongAnswer1 = 0;
    this.wrongAnswer2 = 0;
    this.myProgress = [];
    this.totalCorrect = 0;
    this.totalWrong = 0;
    this.displayTestResult = false;
    this.getStart();
    this.getMyProgressFromLocalStorage();
  }
  
  getStart() {
    this.getQuestionNumber();
    this.getNumber1(this.number1Lower, this.number1Upper);
    this.getNumber2(this.number2Lower, this.number2Upper);
    this.getCorrectAnswer();
    this.getWrongAnswer1();
    this.getWrongAnswer2();
  }
  getMyProgressFromLocalStorage() {
    
  }
  getQuestionNumber() {
    this.getRandomLocation();
    var questionNumber = this.questionNumber;
    this.questionNumber = this.questionNumber + 1;
    return this.questionNumber;
  }
  getRandomNumber(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  getRandomLocation() {
    var location = this.getRandomNumber(1, 3);
    var nums = [1, 2, 3];
    const filter = nums.filter((number) => number != location);
    var wrongLocation1 = filter[0];
    var wrongLocation2 = filter[1];
    console.log(location + ' : ' + wrongLocation1 + ' : ' + wrongLocation2);
    this.location = location;
    this.wrongLocation1 = wrongLocation1;
    this.wrongLocation2 = wrongLocation2;
  }    
  getNumber1 = (min, max) => {
    var number1 = Math.floor(Math.random() * (max - min + 1)) + min;
    this.number1 = number1;
    return number1;
  }
  getNumber2 = (min, max) => {
    var number2 = Math.floor(Math.random() * (max - min + 1)) + min;
    this.number2 = number2;
    return number2;
  }
  getCorrectAnswer = () => {
    var correctAnswer = this.number1 + this.number2;
    this.correctAnswer = correctAnswer;
    return correctAnswer;
  }
  // +1
  getWrongAnswer1 = () => {
    var wrongAnswer1 = this.correctAnswer + 1;
    this.wrongAnswer1 = wrongAnswer1;
    return wrongAnswer1;
  }
  // -1
  getWrongAnswer2 = () => {
    var wrongAnswer2 = this.correctAnswer - 1;
    this.wrongAnswer2 = wrongAnswer2;
    return wrongAnswer2;
  }


  displayTestResultNow() {
    var testCollection = JSON.parse(localStorage.getItem("my-progress") || "[]");
    if (testCollection) {
      this.displayTestResult = true;
      this.questionNumber = 0;
    }
    else {
      this.displayTestResult = false;
    }
  }

  // next question
  onNextQuestion() {
    //store currect question-answer,,, to state and local-storage
    var progressItem = {
      questionNumber: this.questionNumber,
      question: this.number1 + ' + ' + this.number2 + ' = ___',
      myAnswer: this.answerOption,
      correctAnswer: this.getCorrectAnswer(),
      questionResult: this.answerOption == this.getCorrectAnswer().toString() ? "Correct" : "Wrong"
    };
    let currentProgress = this.myProgress;
    currentProgress.push(progressItem);
    this.myProgress = currentProgress;
    localStorage.setItem("my-progress", JSON.stringify(this.myProgress));

    // if last question, then display test result
    if (this.questionNumber == 20) {
      this.displayTestResultNow();

      // stop timer
      // this.stopTimer();
      return;
    }

    // continue with next question
    this.getStart();
  }

  getOptionValueForRightAnswer() {
    if (this.answerOption == (this.number1 + this.number2).toString())
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

  onAnswerOptionChange(e) {
    console.log(e.target.value);
    this.answerOption = e.target.value;
  }
}
