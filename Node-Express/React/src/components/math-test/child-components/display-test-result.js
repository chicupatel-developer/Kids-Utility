import React, { Component } from "react";

export default class DisplayTestResult extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            totalCorrect: 0,
            totalWrong: 0
        };     
    }

    componentDidMount() {
        this.displayTestResult();
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('userName'));
    }

    // display test result
    // reset myProgress to [] @ local-storage
    // calculate totalCorrect and totalWrong
    displayTestResult() {
        var testCollection = JSON.parse(localStorage.getItem("my-progress") || "[]");
        if (testCollection) {
            const correctResponse = testCollection.filter(item => item.questionResult === 'Correct');
            const wrongResponse = testCollection.filter(item => item.questionResult === 'Wrong');

            this.setState({
                totalCorrect: correctResponse.length,
                totalWrong: wrongResponse.length              
            });


            // post test result to json file
            const testresult = {
                userName: this.getCurrentUser(),
                testName: this.props.testName,
                totalCorrect: correctResponse.length + '',
                totalWrong: wrongResponse.length + '',
                timeMinutes: this.props.minutes + '',
                timeSeconds: this.props.seconds + ''
            };
            fetch('/math-test/test-result-create', {
                method: 'POST',
                body: JSON.stringify(testresult),
                headers: { 'Content-Type': 'application/json' }
            }).then(res => res.json())
                .then(json => {
                    console.log(json);
                    // this.getTestResults();
                }
                );


            // email to parent
            this.sendResultToMyParent(testresult);
        }      

        // @last reset local-storage
        this.resetMyProgressAtLocalStorage();
    }

    resetMyProgressAtLocalStorage() {
        localStorage.setItem("my-progress", []);
    }

    sendResultToMyParent(testresult) {
        // prepare data for api call
        var data = {
            // to: 'chicupatel202122@gmail.com',
            // to: 'ankitjpatel2007@hotmail.com',
            to: this.props.parentEmail,
            subject: 'Math - Test Result!',
            text: 'Math - Test Result!',
            testName: testresult.testName,
            totalCorrect: testresult.totalCorrect,
            totalWrong: testresult.totalWrong,
            testMinutes: testresult.timeMinutes,
            testSeconds: testresult.timeSeconds
        };

        // api call
        fetch('/email/send', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(json => {
                console.log(json);
            }
        );
    }
    
    render() {
        const { myProgress, testName, minutes, seconds, parentEmail } = this.props;
        const { totalCorrect, totalWrong } = this.state;
        
        let questionList = myProgress.length > 0
            && myProgress.map((item, i) => {
                return (
                    <div key={i} >
                        {item.questionResult == "Correct" ? (
                            <div className="correctResponse">
                                Question : [{item.questionNumber}] : {item.question}
                                <br />
                                Your Answer : {item.myAnswer}
                                <br />
                                Correct Answer : {item.correctAnswer}
                                <br />
                                Response : {item.questionResult}
                            </div>
                        ) : (
                            <div className="wrongResponse">
                                Question : [{item.questionNumber}] : {item.question}
                                <br />
                                Your Answer : {item.myAnswer}
                                <br />
                                Correct Answer : {item.correctAnswer}
                                <br />
                                Response : {item.questionResult}
                            </div>
                        )}
                        <p></p>
                        <hr />
                        <p></p>
                    </div>
                )
            }, this);
        
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-10">
                        <h2>Test Result !</h2>
                        <p></p>
                        <h4>{testName}</h4>
                    </div>
                </div>

                <p></p>
                <div className="row">
                    <div className="col-sm-3">
                    </div>
                    <div className="col-sm-6  testResultTime">
                        Time To Complete Test : {minutes}M : {seconds}S
                    </div>
                    <div className="col-sm-3">
                    </div>
                </div>
                <p></p>
                <hr />
                <p></p>
                <div className="row">
                    <div className="correctTotal col-sm-4">
                        Total Correct : {totalCorrect}
                        <p></p>
                    </div>
                    <div className="col-sm-4">
                    </div>
                    <div className="wrongTotal col-sm-4">
                        Total Wrong : {totalWrong}
                        <p></p>
                    </div>
                </div>
                <hr />
                <p></p>
                <div>
                    {questionList}
                </div>
            </div>
        );
    }
}