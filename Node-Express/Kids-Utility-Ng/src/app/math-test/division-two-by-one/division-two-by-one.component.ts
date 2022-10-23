import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { LocalDataService } from '../../services/local-data.service';

@Component({
  selector: 'app-division-two-by-one',
  templateUrl: './division-two-by-one.component.html',
  styleUrls: ['./division-two-by-one.component.css']
})
  

export class DivisionTwoByOneComponent implements OnInit {

  // Division 2 digits
  number1Lower = 0;
  number1Upper = 99;
  number2Lower = 1;
  number2Upper = 9;

  testName = 'Division [2 Digits / 1 Digit]';  
  operator = '/';
  totalQuestions = 10;

  parentEmail = '';
  currentUser = '';

  // timer
  timer;
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
  correctAnswer;
  wrongAnswer1;
  wrongAnswer2;
  myProgress = [];
  totalCorrect = 0;
  totalWrong = 0;
  displayTestResult = false;
  testResult = {};
  
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
    this.setCurrentUser();

    this.onStartTest();
  }

  // set username and parentemail
  setParentEmail() {
    if ((localStorage.getItem('parentEmail')) != "") {
      this.parentEmail = (localStorage.getItem('parentEmail'));
    }
    else {
      this.parentEmail = "";
    }
  }
  setCurrentUser() {
    if ((localStorage.getItem('userName')) != "") {
      this.currentUser = (localStorage.getItem('userName'));
    }
    else {
      this.currentUser = "";
    }
  }
 
  // when user press START TEST button
  // test start
  onStartTest() {
    this.startTest = true;
    this.myProgress = [];
    localStorage.setItem("my-progress", JSON.stringify([]));
    this.getStart();
    this.getMyProgressFromLocalStorage();

    // timer
    // this will start timer when user START test
    this.startTimer();
  }

  // timer
  startTimer() {
    this.seconds = 0;
    this.minutes = 0;
    this.isOn = true;
    this.time = this.time;
    this.start = Date.now() - this.time;
    this.timer = setInterval(() => {
      var seconds_ = this.seconds;
      var minutes_ = this.minutes;
      this.time = Date.now() - this.start;
      this.seconds = (seconds_ == 59) ? (0) : (seconds_ + 1);
      this.minutes = (seconds_ == 59) ? (minutes_ + 1) : (minutes_);
    }, 1000);
  }
  stopTimer() {
    this.isOn = false;
    clearInterval(this.timer)
  }
  resetTimer() {
    this.time = 0;
    this.isOn = false;
  }
 
  // when user press NEXT question button
  // get new question/right-answer/2 wrong-answers randomly
  getStart() {
    this.getQuestionNumber();
    this.getNumber1(this.number1Lower, this.number1Upper);
    this.getNumber2(this.number2Lower, this.number2Upper);
    this.getCorrectAnswer();
    this.getWrongAnswer1();
    this.getWrongAnswer2();
  }
  getMyProgressFromLocalStorage() {
    this.myProgress = JSON.parse(localStorage.getItem("my-progress") || "[]");
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
    var correctAnswer = parseFloat((Math.round(this.number1 / this.number2 * 10) / 10).toFixed(1));
    this.correctAnswer = correctAnswer;
    return correctAnswer;
  }
  // +1
  getWrongAnswer1 = () => {
    var wrongAnswer1 = parseFloat(this.correctAnswer + 1).toFixed(1);
    this.wrongAnswer1 = wrongAnswer1;
    return wrongAnswer1;
  }
  // +2
  getWrongAnswer2 = () => {
    var wrongAnswer2 = parseFloat(this.correctAnswer + 2).toFixed(1);
    this.wrongAnswer2 = wrongAnswer2;
    return wrongAnswer2;
  }

  // call back from display-question component
  // when user press NEXT question button
  // next question
  onNextQuestion() {
    //store currect question-answer,,, to state and local-storage
    var progressItem = {
      questionNumber: this.questionNumber,
      question: this.number1 + ' / ' + this.number2 + ' = ___',
      myAnswer: this.answerOption,
      correctAnswer: this.getCorrectAnswer(),
      questionResult: this.answerOption == this.getCorrectAnswer().toString() ? "Correct" : "Wrong"
    };
    let currentProgress = this.myProgress;
    currentProgress.push(progressItem);
    this.myProgress = currentProgress;
    localStorage.setItem("my-progress", JSON.stringify(this.myProgress));

    // if last question, then display test result
    if (this.questionNumber == this.totalQuestions) {
      this.displayTestResultNow();

      // stop timer
      this.stopTimer();
      return;
    }

    // continue with next question
    this.answerOption = '-';
    this.getStart();
  }

  // call back from display-question component
  onAnswerOptionChange(userAnswer) {
    console.log(userAnswer);
    this.answerOption = userAnswer;
  }  

  // display test result
  // reset myProgress to [] @ local-storage
  // calculate totalCorrect and totalWrong  
  displayTestResultNow() {
    var testCollection = JSON.parse(localStorage.getItem("my-progress") || "[]");
    if (testCollection) {
      this.displayTestResult = true;
      this.questionNumber = 0;

      this.displayFinalTestResult();
    }
    else {
      this.displayTestResult = false;
    }
  }
  displayFinalTestResult() {
    var testCollection = JSON.parse(localStorage.getItem("my-progress") || "[]");
    if (testCollection) {
      const correctResponse = testCollection.filter(item => item.questionResult === 'Correct');
      const wrongResponse = testCollection.filter(item => item.questionResult === 'Wrong');

      this.totalCorrect = correctResponse.length;
      this.totalWrong = wrongResponse.length;
          

      // post test result to json file
      const testresult = {
        parentEmail: this.parentEmail,
        userName: this.currentUser,
        testName: this.testName,
        totalCorrect: correctResponse.length + '',
        totalWrong: wrongResponse.length + '',
        timeMinutes: this.minutes + '',
        timeSeconds: this.seconds + ''
      };
          
      console.log(testresult);
      this.testResult = testresult;

      fetch(this.localDataService.getServerUrl() + this.localDataService.getMathTestServiceUrl() + 'test-result-create', {
        method: 'POST',
        body: JSON.stringify(testresult),
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json())
        .then(json => {
          console.log(json);
        }
        );
      
      // call to local-data-service
      // email to parent
      this.localDataService.sendResultToMyParent(testresult);
    }

    // @last reset local-storage
    this.resetMyProgressAtLocalStorage();
  }

  // reset current test
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
  }
  resetMyProgressAtLocalStorage() {
    localStorage.setItem("my-progress", JSON.stringify([]));
  }
}
