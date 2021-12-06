import React, { Component } from "react";
import { Card } from "react-bootstrap";

const formValid = ({ isError, ...rest }) => {
    let isValid = false;
    var BreakException = {};
    try {
        Object.values(isError).forEach(val => {
            console.log('checking... ' + val);
            if (val.length > 0) {
                isValid = false
                throw BreakException;
            } else {
                isValid = true
            }
        });
    } catch (e) {
        return isValid;
    }
    return isValid;
};

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.resetLoginFormState = this.resetLoginFormState.bind(this);

        this.state = {
            parentEmail : '',

            apiResponse: '',

            userName: '',
            password: '',
            submitted: false,
            isError: {
                userName: '',
                password: ''
            }
        }
    }
    componentDidMount() {
        const user = this.getCurrentUser();
        if (user) {
            this.props.history.push('/home');
            window.location.reload();
        }
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('userName'));
    }

    onSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
            console.log(this.state)
        } else {
            console.log("Form is invalid!");
            return;
        }

        // check for all null values @ form
        if (this.state.userName == '' || this.state.password == '') {
            if (this.state.userName == '') {
                let isError = { ...this.state.isError };
                isError.userName = "UserName : Required !";
                this.setState({
                    isError,
                    submitted: false
                });
            }
            if (this.state.password == '') {
                let isError = { ...this.state.isError };
                isError.password = "Password : Required !";
                this.setState({
                    isError,
                    submitted: false
                });
            }
            return;
        }

        // prepare data for api call
        var data = {
            userName: this.state.userName,
            password: this.state.password
        };      
        // api call
        fetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            }).then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.error) {
                    this.setState({
                        apiResponse : json.error
                    });
                }
                else {
                    this.setState({
                        // apiResponse: json.message
                        apiResponse: 'Success!',
                        parentEmail: json.parentEmail
                    });
                    localStorage.setItem("userName", JSON.stringify(data.userName));
                    localStorage.setItem("parentEmail", JSON.stringify(json.parentEmail));
                    setTimeout(() => {
                        this.props.history.push('/home');
                        window.location.reload();
                    }, 2000);
                    
                }
            }
        );
    }

    // reset login form state
    resetLoginFormState() {
        this.setState({
            parentEmail: '',

            apiResponse: '',
            userName: '',
            password: "",
            submitted: false,
            isError: {
                userName: '',
                password: ''
            }
        });
    }

    formValChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let isError = { ...this.state.isError };

        switch (name) {
            case "userName":
                isError.userName =
                    value.length < 4 ? "User Name : Atleast 4 characaters required" : "";
                break;
            case "password":
                isError.password =
                    value.length < 6 ? "Password : Atleast 6 characaters required" : "";
                break;
            default:
                break;
        }
        this.setState({
            isError,
            [name]: value
        })
    }
   
    doRegister = () => {
        this.props.history.push('/register');
    }

    render() {
        const { isError, apiResponse } = this.state;      

        return (
            <form onSubmit={this.onSubmit} noValidate>
                <Card style={{ width: '25rem' }}>
                    <Card.Header>
                        <h3 style={{ marginBottom: 30 }}>Login</h3>
                        <p></p>
                        <h5 className="loginErrorResponse">{apiResponse}</h5>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>User Name</Card.Title>
                        <Card.Text>
                            <span className="form-group">
                                <input
                                    type="text"
                                    className={isError.userName.length > 0 ? "is-invalid form-control" : "form-control"}
                                    name="userName"
                                    value={this.state.userName}
                                    id="userName"
                                    onChange={this.formValChange}
                                />
                                {isError.userName.length > 0 && (
                                    <span className="invalid-feedback">{isError.userName}</span>
                                )}
                            </span>
                        </Card.Text>
                        <Card.Title>Password</Card.Title>
                        <Card.Text>
                            <span className="form-group">
                                <input
                                    type="password"
                                    className={isError.password.length > 0 ? "is-invalid form-control" : "form-control"}
                                    name="password"
                                    value={this.state.password}
                                    id="password"
                                    onChange={this.formValChange}
                                />
                                {isError.password.length > 0 && (
                                    <span className="invalid-feedback">{isError.password}</span>
                                )}
                            </span>
                        </Card.Text>
                        <p></p>
                        <hr />
                        <div className="row">
                            <div className="col-sm-5">
                                <button
                                    type="submit"
                                    className="btn btn-block btn-success">
                                    <h5>Login</h5>
                                </button>
                            </div>
                            <div className="col-sm-6">
                                <button
                                    type="button"
                                    onClick={() => this.doRegister()}
                                    className="btn btn-block btn-info">
                                    <h5>Register</h5>
                                </button>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </form>
        );
    }
}