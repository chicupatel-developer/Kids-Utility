import React, { Component } from 'react';
import axios from 'axios';
import { Table } from "react-bootstrap";

export default class TestResultDatabase extends Component {

    constructor(props) {
        super(props);
        this.state = {
            testResultCollection: []
        };
    }

    componentDidMount() {
        const user = this.getCurrentUser();
        if (!user) {
            this.props.history.push('/login');
            window.location.reload();
        }
        this.getTestResults();
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('userName'));
    }

    getTestResults() {
        fetch('/math-test/my-all-test-result')
            .then(res => res.json())
            .then(data => {
                var currentUser = this.getCurrentUser();
                var newArray = data.filter(entry => entry.userName == currentUser);
                this.setState({ testResultCollection: newArray })
            });
    } 
  
    render() {
        const { testResultCollection } = this.state;   

        return (
            <div className="wrapper-users">
                <h2>
                    <b>Test-Result-Database</b>
                </h2>
                <p></p>
                <hr />
                <div className="container">
                    {
                        (testResultCollection && testResultCollection[0]) ? (
                            <div>
                                <span className="testResultUserName">
                                    Test-Result For : &nbsp;
                                    <b>
                                        <u>{testResultCollection[0].userName}</u>
                                    </b>
                                </span>
                            </div>
                        ): (
                            <span></span>
                        )
                    }
                 
                    <hr />
                    <Table striped hover variant="dark">
                        <thead>
                            <tr>
                                <th>Test</th>
                                <th>Time (M:S)</th>
                                <th>Correct</th>
                                <th>Wrong</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testResultCollection &&
                                testResultCollection.map((test, index) => (
                                    <tr key={index}>                                   
                                        <td>
                                            {test.testName}
                                        </td>
                                        <td>
                                            {test.timeMinutes}M :  {test.timeSeconds}S
                                        </td>
                                        <td>
                                            {test.totalCorrect}
                                        </td>
                                        <td>
                                            {test.totalWrong}
                                        </td>                                       
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </div>
                <hr />             
            </div>
        )
    }
}