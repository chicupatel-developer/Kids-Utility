import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { LocalDataService } from '../../services/local-data.service';

@Component({
  selector: 'app-addition-decimal',
  templateUrl: './addition-decimal.component.html',
  styleUrls: ['./addition-decimal.component.css']
})
export class AdditionDecimalComponent implements OnInit {

  testName = 'Addition [Decimal]';
  operator = '+';

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
  plusVariant = 0.01;
  minusVariant = 0.01;


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
    this.getNumber1();
    this.getNumber2();
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
  // get random number
  genRand(min, max, decimalPlaces) {
    return (Math.random() * (max - min) + min).toFixed(decimalPlaces) * 1;
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
  getNumber1 = () => {
    var number1 = this.genRand(1, 99, 2);
    this.number1 = number1;    
    return number1;
  }
  getNumber2 = () => {
    var number2 = this.genRand(1, 99, 2);
    this.number2 = number2;
    return number2;
  }
  getCorrectAnswer = () => {    
    this.correctAnswer = (Number(this.number1.toFixed(2)) + Number(this.number2.toFixed(2))).toFixed(2);    
    return this.correctAnswer;
  }
  getWrongAnswer1 = () => {    
    this.wrongAnswer1 = (Number(this.number1.toFixed(2)) + Number(this.number2.toFixed(2)) + Number(this.plusVariant.toFixed(2))).toFixed(2);
    return this.wrongAnswer1;
  }
  getWrongAnswer2 = () => {    
    this.wrongAnswer2 = (Number(this.number1.toFixed(2)) + Number(this.number2.toFixed(2)) - Number(this.minusVariant.toFixed(2))).toFixed(2);
    return this.wrongAnswer2;
  }

  // call back from display-question component
  // when user press NEXT question button
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
        userName: this.currentUser,
        testName: this.testName,
        totalCorrect: correctResponse.length + '',
        totalWrong: wrongResponse.length + '',
      };
          
      console.log(testresult);
      this.testResult = testresult;
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
