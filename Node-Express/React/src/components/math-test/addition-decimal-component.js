import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";
import DisplayTestResult from "./child-components/display-test-result";
import DisplayQuestion from "./child-components/display-question";

export default class AdditionDecimal extends Component {
    constructor(props) {
        super(props);

        this.state = {

            parentEmail: '',

            testName: 'Addition - Decimal',

            // timer
            seconds: 0,
            minutes: 0,
            time: 0,
            isOn: false,
            start: 0,

            // start test
            startTest: false,

            location: 0,
            wrongLocation1: 0,
            wrongLocation2: 0,

            questionNumber: 0,
            answerOption: '-',
            number1: 0,
            number2: 0,
            correctAnswer: 0,
            wrongAnswer1: 0,
            wrongAnswer2: 0,

            myProgress: [],
            totalCorrect: 0,
            totalWrong: 0,
            displayTestResult: false
        };

        this.startTest = this.onStartTest.bind(this);
        this.onAnswerOptionChange = this.onAnswerOptionChange.bind(this);
        this.onNextQuestion = this.onNextQuestion.bind(this);
        this.nextText = this.onNextTest.bind(this);

        // timer
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
    }

    componentDidMount() {
        const user = this.getCurrentUser();
        if (!user) {
            this.props.history.push('/login');
            window.location.reload();
        }
        this.setParentEmail();
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('userName'));
    }
    setParentEmail() {
        this.setState({
            parentEmail: JSON.parse(localStorage.getItem('parentEmail'))
        });
    }


    onStartTest() {
        this.setState({
            startTest: true,
            myProgress: []
        });
        localStorage.setItem("my-progress", []);

        this.getStart();
        this.getMyProgressFromLocalStorage();

        this.startTimer();
    }

    // timer
    startTimer() {
        this.setState({
            seconds: 0,
            minutes: 0,
            isOn: true,
            time: this.state.time,
            start: Date.now() - this.state.time
        })
        this.timer = setInterval(() => {
            var seconds_ = this.state.seconds;
            var minutes_ = this.state.minutes;
            this.setState({
                time: Date.now() - this.state.start,
                seconds: (seconds_ == 59) ? (0) : (seconds_ + 1),
                minutes: (seconds_ == 59) ? (minutes_ + 1) : (minutes_),
            })
        }, 1000);
    }
    stopTimer() {
        this.setState({ isOn: false })
        clearInterval(this.timer)
    }
    resetTimer() {
        this.setState({ time: 0, isOn: false })
    }

    // next test
    resetTest() {
        this.setState({
            location: 0,
            wrongLocation1: 0,
            wrongLocation2: 0,

            questionNumber: 0,
            answerOption: '-',
            number1: 0,
            number2: 0,
            correctAnswer: 0,
            wrongAnswer1: 0,
            wrongAnswer2: 0,

            myProgress: [],
            totalCorrect: 0,
            totalWrong: 0,
            displayTestResult: false
        });
        this.getStart();
        this.getMyProgressFromLocalStorage();
    }

    getStart() {
        this.getQuestionNumber();
        this.getNumber1();
        this.getNumber2();
        this.getCorrectAnswer();
        this.getWrongAnswer1();
        this.getWrongAnswer2();
    }
    getMyProgressFromLocalStorage() {
        this.setState({
            myProgress: JSON.parse(localStorage.getItem("my-progress") || "[]")
        });
    }

    onAnswerOptionChange(childData) {
        this.setState({
            answerOption: childData
        });
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
        this.setState({
            location: location,
            wrongLocation1: wrongLocation1,
            wrongLocation2: wrongLocation2
        });
    }

    getQuestionNumber() {
        this.getRandomLocation();

        var questionNumber = this.state.questionNumber;
        this.setState({
            questionNumber: questionNumber + 1
        });
        return this.state.questionNumber;
    }
    getNumber1 = () => {
        var number1 = this.genRand(1, 99, 2);
        this.setState({
            number1: number1
        });
        return number1;
    }
    getNumber2 = () => {
        var number2 = this.genRand(1, 99, 2);
        this.setState({
            number2: number2
        });
        return number2;
    }

    getCorrectAnswer = () => {
        var number1 = this.state.number1;
        var number2 = this.state.number2;
        var correctAnswer = (number1 + number2).toFixed(2);      
        this.setState({
            correctAnswer: correctAnswer
        });
        return correctAnswer;
    }
    getWrongAnswer1 = () => {        
        var number1 = this.state.number1;
        var number2 = this.state.number2;
        var wrongAnswer1 = (number1 + number2 + 0.01).toFixed(2);      
        this.setState({
            wrongAnswer1: wrongAnswer1
        });
        return wrongAnswer1;
    }
    getWrongAnswer2 = () => {
        var number1 = this.state.number1;
        var number2 = this.state.number2;
        var wrongAnswer2 = (number1 + number2 - 0.01).toFixed(2);
        this.setState({
            wrongAnswer2: wrongAnswer2
        });
        return wrongAnswer2;
    }

    // display test result
    // call child component
    displayTestResult() {
        var testCollection = JSON.parse(localStorage.getItem("my-progress") || "[]");
        if (testCollection) {
            this.setState({
                displayTestResult: true,
                questionNumber: 0
            });
        }
        else {
            this.setState({
                displayTestResult: false
            });
        }
    }

    // next question
    onNextQuestion() {
        //store currect question-answer,,, to state and local-storage
        var progressItem = {
            questionNumber: this.state.questionNumber,
            question: this.state.number1 + ' + ' + this.state.number2 + ' = ___',
            myAnswer: this.state.answerOption,
            correctAnswer: this.getCorrectAnswer(),
            questionResult: this.state.answerOption == this.getCorrectAnswer() ? "Correct" : "Wrong"
        };
        let currentProgress = this.state.myProgress;
        currentProgress.push(progressItem);
        this.setState({
            myProgress: currentProgress
        });
        localStorage.setItem("my-progress", JSON.stringify(this.state.myProgress));

        // if last question, then display test result
        if (this.state.questionNumber == 20) {
            this.displayTestResult();

            // stop timer
            this.stopTimer();
            return;
        }

        // continue with next question
        this.getStart();
    }

    onNextTest() {
        this.resetTest();
    }

    render() {
        const { testName, parentEmail, startTest, seconds, minutes, wrongLocation1, wrongLocation2, location, myProgress, displayTestResult, totalCorrect, totalWrong, questionNumber, number1, number2, answerOption, correctAnswer, wrongAnswer1, wrongAnswer2 } = this.state;

        return (
            <div>
                {startTest ? (
                    <div className="row">
                        <div className="col-sm-1">
                        </div>

                        {displayTestResult ? (
                            <div className="col-sm-10">
                                <DisplayTestResult
                                    testName={testName}
                                    minutes={minutes}
                                    seconds={seconds}
                                    parentEmail={parentEmail}
                                    myProgress={myProgress}
                                />
                            </div>
                        ) : (
                                <div className="col-sm-10" >
                                    <div>
                                        <DisplayQuestion
                                            parentCallback={this.onAnswerOptionChange}
                                            parentCallbackNextQuestion={this.onNextQuestion}
                                            testName={testName}
                                            minutes={minutes}
                                            seconds={seconds}
                                            questionNumber={questionNumber}
                                            number1={number1}
                                            number2={number2}
                                            location={location}
                                            wrongLocation1={wrongLocation1}
                                            wrongLocation2={wrongLocation2}
                                            operator={'+'}
                                            value={((number1 + number2).toFixed(2)).toString()}
                                            wrongAnswer1={((number1 + number2 + 0.01).toFixed(2)).toString()}
                                            wrongAnswer2={((number1 + number2 - 0.01).toFixed(2)).toString()}
                                        />
                                    </div>
                                </div >
                        )}

                        <div className="col-sm-1" >
                        </div>
                    </div>                    
                ) : (
                    <div className="row">
                        <div>
                            <h4><b>{testName}</b></h4>
                            <p></p>
                            <span>
                                <Button variant="info"
                                    onClick={() => this.onStartTest()}
                                    size="md">
                                    S.T.A.R.T &nbsp;&nbsp; T.E.S.T
                                </Button>
                            </span>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}