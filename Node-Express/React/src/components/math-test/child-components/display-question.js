import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";

export default class DisplayQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answerOption: '-',
        };

        this.onAnswerOptionChange = this.onAnswerOptionChange.bind(this);
        this.onNextQuestion = this.onNextQuestion.bind(this);
    }

    componentDidMount() {
        
    } 

    onAnswerOptionChange(event) {
        this.setState({
            answerOption: event.target.value
        });
        this.props.parentCallback(event.target.value);
    }

    onNextQuestion() {      
        this.props.parentCallbackNextQuestion();
    }

    render() {
        const { testName, wrongAnswer2, wrongAnswer1, value, operator, wrongLocation1, wrongLocation2, location, minutes, seconds, questionNumber, number1, number2 } = this.props;
        const { answerOption } = this.state;  

        return (
            <div>
                <div className="test-name-header">
                    Test : {testName}
                </div>
                <Card>
                    <Card.Header as="h5" style={{ backgroundColor: "lightskyblue" }}>
                        <div className="row">
                            <div className="col-sm-2 timer">
                                <span>[{minutes} : {seconds}]</span>
                            </div>
                            <div className="col-sm-7">
                                [Q : {questionNumber}] {number1} {operator} {number2} = ___
                            </div>
                            <div className="col-sm-3">
                                <Button variant="success"
                                    onClick={() => this.onNextQuestion()}
                                    size="md">
                                    N.E.X.T
                                </Button>
                            </div>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <div>
                            {
                                1 == location ? (
                                    <div className="radio radioLeft">
                                        <label>
                                            <span className="optionDisplay">
                                                <input
                                                    type="radio"
                                                    value={value}
                                                    checked={answerOption === value}
                                                    onChange={this.onAnswerOptionChange}
                                                />
                                            </span>
                                            <span>
                                                {value}
                                            </span>
                                        </label>
                                    </div>
                                ) : (
                                    <div>
                                    </div>
                                )
                            }
                            {
                                1 == wrongLocation1 ? (
                                    <div className="radio radioLeft">
                                        <label>
                                            <span className="optionDisplay">
                                                <input
                                                    type="radio"
                                                    value={wrongAnswer1}
                                                    checked={answerOption === wrongAnswer1}
                                                    onChange={this.onAnswerOptionChange}
                                                />
                                            </span>
                                            <span>
                                                {wrongAnswer1}
                                            </span>
                                        </label>
                                    </div>
                                ) : (
                                    <div>
                                    </div>
                                )
                            }
                            {
                                1 == wrongLocation2 ? (
                                    <div className="radio radioLeft">
                                        <label>
                                            <span className="optionDisplay">
                                                <input
                                                    type="radio"
                                                    value={wrongAnswer2}
                                                    checked={answerOption === wrongAnswer2}
                                                    onChange={this.onAnswerOptionChange}
                                                />
                                            </span>
                                            <span>
                                                {wrongAnswer2}
                                            </span>
                                        </label>
                                    </div>
                                ) : (
                                    <div>
                                    </div>
                                )
                            }


                            {
                                2 == location ? (
                                    <div className="radio radioLeft">
                                        <label>
                                            <span className="optionDisplay">
                                                <input
                                                    type="radio"
                                                    value={value}
                                                    checked={answerOption === value}
                                                    onChange={this.onAnswerOptionChange}
                                                />
                                            </span>
                                            <span>
                                                {value}
                                            </span>
                                        </label>
                                    </div>
                                ) : (
                                    <div>
                                    </div>
                                )
                            }
                            {
                                2 == wrongLocation1 ? (
                                    <div className="radio radioLeft">
                                        <label>
                                            <span className="optionDisplay">
                                                <input
                                                    type="radio"
                                                    value={wrongAnswer1}
                                                    checked={answerOption === wrongAnswer1}
                                                    onChange={this.onAnswerOptionChange}
                                                />
                                            </span>
                                            <span>
                                                {wrongAnswer1}
                                            </span>
                                        </label>
                                    </div>
                                ) : (
                                    <div>
                                    </div>
                                )
                            }
                            {
                                2 == wrongLocation2 ? (
                                    <div className="radio radioLeft">
                                        <label>
                                            <span className="optionDisplay">
                                                <input
                                                    type="radio"
                                                    value={wrongAnswer2}
                                                    checked={answerOption === wrongAnswer2}
                                                    onChange={this.onAnswerOptionChange}
                                                />
                                            </span>
                                            <span>
                                                {wrongAnswer2}
                                            </span>
                                        </label>
                                    </div>
                                ) : (
                                    <div>
                                    </div>
                                )
                            }



                            {
                                3 == location ? (
                                    <div className="radio radioLeft">
                                        <label>
                                            <span className="optionDisplay">
                                                <input
                                                    type="radio"
                                                    value={value}
                                                    checked={answerOption === value}
                                                    onChange={this.onAnswerOptionChange}
                                                />
                                            </span>
                                            <span>
                                                {value}
                                            </span>
                                        </label>
                                    </div>
                                ) : (
                                    <div>
                                    </div>
                                )
                            }
                            {
                                3 == wrongLocation1 ? (
                                    <div className="radio radioLeft">
                                        <label>
                                            <span className="optionDisplay">
                                                <input
                                                    type="radio"
                                                    value={wrongAnswer1}
                                                    checked={answerOption === wrongAnswer1}
                                                    onChange={this.onAnswerOptionChange}
                                                />
                                            </span>
                                            <span>
                                                {wrongAnswer1}
                                            </span>
                                        </label>
                                    </div>
                                ) : (
                                    <div>
                                    </div>
                                )
                            }
                            {
                                3 == wrongLocation2 ? (
                                    <div className="radio radioLeft">
                                        <label>
                                            <span className="optionDisplay">
                                                <input
                                                    type="radio"
                                                    value={wrongAnswer2}
                                                    checked={answerOption === wrongAnswer2}
                                                    onChange={this.onAnswerOptionChange}
                                                />
                                            </span>
                                            <span>
                                                {wrongAnswer2}
                                            </span>
                                        </label>
                                    </div>
                                ) : (
                                    <div>
                                    </div>
                                )
                            }









                            <hr />
                            <p></p>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        
        );
    }
}