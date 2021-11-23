import React, { Component } from "react";
import { Card } from "react-bootstrap";

const regExp = RegExp(
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
);

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

export default class Register extends Component {
    constructor(props) {
        super(props)

        this.resetRegisterFormState = this.resetRegisterFormState.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
     
        this.state = {            
            apiResponse: '',

            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
            submitted: false,
            isError: {
                userName: '',
                email: '',
                password: '',
                confirmPassword: ''
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
   
    onChangeUsername(e) {
        let isError = { ...this.state.isError };
        isError.userName =
            e.target.value.length < 4 ? "User Name : Atleast 4 characaters required" : "";
        if (isError.userName == '') {
            isError.userName = e.target.value.length > 10 ? "User Name : Maximum 10 characaters required" : "";
        }
        else {
        }
        this.setState({
            userName: e.target.value,
            isError
        });
    }  
    onChangePassword(e) {
        let isError = { ...this.state.isError };
        isError.password =
            e.target.value.length < 4 ? "Password : Atleast 4 characaters required" : "";
        if (isError.password == '') {
            isError.password = e.target.value.length > 10 ? "Password : Maximum 10 characaters required" : "";
        }     
        this.setState({
            password: e.target.value,
            isError
        });
    }
    onChangeConfirmPassword(e) {
        let isError = { ...this.state.isError };
        isError.confirmPassword =
            e.target.value === this.state.password ? "" : "Confirm Password : Not Matched";

        this.setState({
            confirmPassword: e.target.value,
            isError
        });
    }
    onChangeEmail(e) {
        let isError = { ...this.state.isError };
        isError.email = regExp.test(e.target.value)
            ? ""
            : "Email address is invalid";
        this.setState({
            email: e.target.value,
            isError
        });
    }

    onSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
            console.log(this.state);
        } else {
            console.log("Form is invalid!");
            return;
        }

        // check for all null values @ form
        if (this.state.email == ''  || this.state.confirmPassword == '' || this.state.userName == '' || this.state.password == '') {
            if (this.state.email == '') {
                let isError = { ...this.state.isError };
                isError.email = "Email : Required !";
                this.setState({
                    isError,
                    submitted: false
                });
            }
            if (this.state.confirmPassword == '') {
                let isError = { ...this.state.isError };
                isError.confirmPassword = "Confirm Password : Required !";
                this.setState({
                    isError,
                    submitted: false
                });
            }
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
        if (this.state.password != '' && this.state.confirmPassword != '' && this.state.password != this.state.confirmPassword) {
            let isError = { ...this.state.isError };
            isError.password = "Passwords : Not Matched !";
            isError.confirmPassword = "Passwords : Not Matched !";
            this.setState({
                isError,
                submitted: false
            });
            return;
        }

        // prepare data for api call        
        var data = {
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password
        };
      
        // api call
        fetch('/api/usercreate', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            }).then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.error) {
                    this.setState({
                        apiResponse: json.error
                    });
                }
                else {
                    this.setState({
                        apiResponse: 'Success!'
                    });                    
                    setTimeout(() => {
                        this.props.history.push('/login');
                        window.location.reload();
                    }, 2000);

                }
            }
        );
    }

    // reset register form state
    resetRegisterFormState() {
        this.setState({
            apiResponse: '',
            userName: '',
            email: "",
            password: "",
            confirmPassword: '',
            submitted: false,
            isError: {
                userName: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        });
    }

    doLogin = () => {
        this.props.history.push('/login');
    }

    render() {
        const { password, confirmPassword, apiResponse, isError } = this.state;
   
        return (
            <form onSubmit={this.onSubmit} noValidate>
                <Card style={{ width: '25rem' }}>
                    <Card.Header>
                        <div style={{ marginBottom: 30 }}>
                            <h3 >Register</h3>
                            <p></p>
                            <h5 className="loginErrorResponse">{apiResponse}</h5>
                        </div>  
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
                                    onChange={this.onChangeUsername}
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
                                    value={password}
                                    id="password"
                                    onChange={this.onChangePassword}
                                />
                                {isError.password.length > 0 && (
                                    <span className="invalid-feedback">{isError.password}</span>
                                )}
                            </span>
                        </Card.Text>
                        <Card.Title>Confirm Password</Card.Title>
                        <Card.Text>
                            <span className="form-group">
                                <input
                                    type="password"
                                    className={isError.confirmPassword.length > 0 ? "is-invalid form-control" : "form-control"}
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    id="confirmPassword"
                                    onChange={this.onChangeConfirmPassword}
                                />
                                {isError.confirmPassword.length > 0 && (
                                    <span className="invalid-feedback">{isError.confirmPassword}</span>
                                )}
                            </span>
                        </Card.Text>
                        <Card.Title>Parent Email</Card.Title>
                        <Card.Text>
                            <span className="form-group">
                                <input
                                    type="email"
                                    className={isError.email.length > 0 ? "is-invalid form-control" : "form-control"}
                                    name="email"
                                    value={this.state.email}
                                    id="email"
                                    onChange={this.onChangeEmail}
                                />
                                {isError.email.length > 0 && (
                                    <span className="invalid-feedback">{isError.email}</span>
                                )}
                            </span>
                        </Card.Text>
                        <p></p>
                        <hr />
                        <div className="row">
                            <div className="col-sm-5">
                                <button
                                    type="submit"
                                    className="btn btn-block btn-success ">
                                    <h5>Register</h5>
                                </button>
                            </div>
                            <div className="col-sm-6">
                                <button
                                    type="button"
                                    onClick={() => this.doLogin()}
                                    className="btn btn-block btn-info">
                                    <h5>Login </h5>
                                </button>
                            </div>
                        </div>
                    </Card.Body>                  
                </Card>
            </form>
        );
    }
}