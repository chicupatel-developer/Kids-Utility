import React, { Component } from 'react';

import './App.css';
import './index.css';

import { Switch, Route, Link } from "react-router-dom";
import { Navbar, Container, NavDropdown, Nav, Dropdown } from "react-bootstrap";
import { Redirect } from 'react-router';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import NotFoundPage from "./components/not-found-page.component";
import Login from './components/login-component';
import Register from './components/register-component';
import Home from './components/home-component';

import Addition2By2 from './components/math-test/addition-2by2-component';
import Minus2By2 from './components/math-test/minus-2by2-component';
import Minus1By2 from './components/math-test/minus-1by2-component';
import Multiply2By2 from './components/math-test/multiply-2by2-component';
import MultiplyDecimal from './components/math-test/multiply-decimal-component';
import Division2By1 from './components/math-test/division-2by1-component';
import AdditionDecimal from './components/math-test/addition-decimal-component';
import MinusDecimal from './components/math-test/minus-decimal-component';
import TestResultDatabase from './components/math-test/test-result-database';

import CreateEvent from './components/event-mgt/create-event-component';
import ViewEvent from './components/event-mgt/view-event-component';
import ManageEvent from './components/event-mgt/manage-event-component';
import ViewEventDetails from './components/event-mgt/view-event-details-component';

import MyGrocery from './components/grocery-mgt/my-grocery-component';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined,
      showMathTestBoard: false
    };
  }


  componentDidMount() {
    const user = this.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showMathTestBoard: true
      });
    }
    else {
      this.setState = {
        currentUser: undefined,
        showMathTestBoard: false
      };
    }
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('userName'));
  }

  logOut() {
    localStorage.removeItem("userName");
    localStorage.removeItem("parentEmail");
    this.setState({
      showMathTestBoard: false,
      // currentUser: undefined
      currentUser: ''
    });
    this.props.history.push('/home');
    window.location.reload();
  }

  render() {

    const { currentUser, showMathTestBoard } = this.state;

    return (
      <div className="App">
        
        <ToastContainer />

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>           
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              {
                currentUser && showMathTestBoard ? (
                  <Nav className="me-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/my-grocery">My-Grocery</Nav.Link>
                    <NavDropdown title="Math-Test" id="basic-nav-dropdown">
                      <NavDropdown.Item
                        href="addition2by2">Addition[2][2]
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="addition-decimal">Addition-Decimal
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="minus2by2">Minus[2][2]
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="minus1by2">Minus[1][2]
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="minus-decimal">Minus-Decimal
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="multiply2by2">Multiply[2][2]
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="multiply-decimal">Multiply-Decimal
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="division2by1">Division[2][1]
                      </NavDropdown.Item>
                    </NavDropdown>               
                    <Link to={"/test-result-database"} className="nav-link">
                      Test-Result
                    </Link>
                    <NavDropdown title="Event-MGT" id="basic-nav-dropdown">
                      <NavDropdown.Item
                        href="create-event">Create-Event
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="view-event">View-Event
                      </NavDropdown.Item>
                    </NavDropdown>                 
                  </Nav>                
                ) : (
                    <span>
                      <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/my-grocery">My-Grocery</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                      </Nav>                    
                  </span>
                )
              }
              
              {currentUser ? (
                <Nav>
                  <a href="/home" className="nav-link"
                    onClick={this.logOut}>
                    <h3><b>[ {currentUser} ]LogOut </b></h3>
                  </a>
                </Nav>
              ) : (
                <span></span>
              )}

            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="container mt-3 mainContainer">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/addition2by2" component={Addition2By2} />
            <Route exact path="/addition-decimal" component={AdditionDecimal} />
            <Route exact path="/minus2by2" component={Minus2By2} />
            <Route exact path="/minus1by2" component={Minus1By2} />
            <Route exact path="/minus-decimal" component={MinusDecimal} />
            <Route exact path="/multiply2by2" component={Multiply2By2} />
            <Route exact path="/multiply-decimal" component={MultiplyDecimal} />
            <Route exact path="/division2by1" component={Division2By1} />
            <Route exact path="/test-result-database" component={TestResultDatabase} />
            <Route exact path="/create-event" component={CreateEvent} />
            <Route exact path="/view-event" component={ViewEvent} />
            <Route exact path="/manage-event" component={ManageEvent} />
            <Route exact path="/view-event-details" component={ViewEventDetails} />
            <Route exact path="/my-grocery" component={MyGrocery} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;