import React, { Component } from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <div className="homePageHeader">
          <h3>[G5-G7] Math-Test / Grocery-MGT / Event-MGT</h3>
          <h5>
            Express / Node JS / bcrypt / JSON File Storage / React / Angular
          </h5>
        </div>
        <hr />
        <p></p>
        <div className="row">
          <div className="col-sm-5">
            <div>
              <ListGroup>
                <ListGroup.Item variant="primary">
                  <b>Login / Register</b>
                </ListGroup.Item>
                <div>
                  <ul className="homeMathTest">
                    <li>
                      User can create Account by Registering with UserName,
                      Password and Parent's Email Address
                    </li>
                    <li>
                      User should Login with valid UserName and Password to
                      access{" "}
                      <u>
                        <b>Math-Test and My-Events Module </b>
                      </u>
                    </li>
                    <li>
                      After successfully completion of any Math-Test, User's
                      Parent will receive Test's Result by Email
                    </li>
                  </ul>
                </div>
              </ListGroup>
            </div>
            <hr />
            <div>
              <ListGroup>
                <ListGroup.Item variant="primary">
                  <b>Grocery-MGT</b>
                </ListGroup.Item>
                <div>
                  <ul>
                    <li>Create Grocery List</li>
                    <li>Create New Item for Grocery List</li>
                    <li>Add Item To Grocery List By Check In</li>
                    <li>Remove Item From Grocery List By Check Out</li>
                  </ul>
                </div>
              </ListGroup>
            </div>
            <hr />
            <div>
              <ListGroup>
                <ListGroup.Item variant="primary">
                  <b>Event-MGT</b>
                </ListGroup.Item>
                <div>
                  <ul>
                    <li>User can Create/View/Edit and Delete Event</li>
                    <li>
                      User can View Events for Today, Current Week or Current
                      Month
                    </li>
                  </ul>
                </div>
              </ListGroup>
            </div>
          </div>
          <div className="col-sm-2"></div>
          <div className="col-sm-5">
            <div>
              <ListGroup>
                <ListGroup.Item variant="primary">
                  <b>Math-Test</b>
                </ListGroup.Item>
                <div>
                  <ul className="homeMathTest">
                    <li>
                      Every Question, Correct Answer and 2 Wrong Answers are
                      generating dynamically
                    </li>
                    <li>Every Time Questions are Different</li>
                    <li>Kids can experience real Math Calculation Problems</li>
                  </ul>
                  <p></p>
                  <ul>
                    <li>Addition [2 Digits by 2 Digits]</li>
                    <li>Addition [Decimal]</li>
                    <li>Minus [2 Digits by 2 Digits]</li>
                    <li>Minus [1 Digit by 2 Digits]</li>
                    <li>Minus [Decimal]</li>
                    <li>Multiply [2 Digits by 2 Digits]</li>
                    <li>Multiply [Decimal]</li>
                    <li>Division [2 Digits by 1 Digit]</li>
                  </ul>
                </div>
              </ListGroup>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
