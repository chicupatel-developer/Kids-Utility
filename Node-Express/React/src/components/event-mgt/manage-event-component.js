import React, { Component, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { Card, Table } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

import { toast } from 'react-toastify';

const toastSuccessOptions = {
    autoClose: 2000,
    type: toast.TYPE.SUCCESS,
    hideProgressBar: false,
    position: toast.POSITION.TOP_RIGHT
};
const toastErrorOptions = {
    autoClose: 2000,
    type: toast.TYPE.ERROR,
    hideProgressBar: false,
    position: toast.POSITION.TOP_RIGHT
};

const ManageEvent = () => {
    const history = useHistory();

    const [eventDate, setEventDate] = useState(new Date());
    const [eventTitle, setEventTitle] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [selectedEvent, setSelectedEvent] = useState([]);
  
    useEffect(() => {
        const user = getCurrentUser();
        if (!user) {
            history.push('login');
            return;
        }
        
        var selectedEvent = JSON.parse(localStorage.getItem('selectedEvent'));
        console.log(selectedEvent);
        if (selectedEvent == null) {
            history.push('view-event');
            return;
        }
        else {
            setSelectedEvent(selectedEvent);
            setEventTitle(selectedEvent.eventTitle);
            setEventDesc(selectedEvent.eventDesc);
            setEventDate(new Date(selectedEvent.eventDate));
        }       

        // unmount 
        return () => {
            setEventDesc('');
            setEventTitle('');
            setEventDate('');
            setSelectedEvent(null);
            localStorage.removeItem("selectedEvent");
        }
    }, [])

    const getCurrentUser = () => {
        return JSON.parse(localStorage.getItem('userName'));
    }

    const handleEventDate = (date) => {
        var timelagging = 6; // 5 or 6
        setEventDate(date);

        var currentDateTime = new Date();
        var cdt = new Date(currentDateTime.getTime() - ((1 * 60 * 60 * 1000) * timelagging));
        currentDateTime = cdt;

        var d = (date - currentDateTime);
        var Difference_In_Days = (d / (1000 * 3600 * 24)).toFixed(0);
    };
    const handleEventTitle = (event) => {
        setEventTitle(event.target.value);
    };
    const handleEventDesc = (event) => {
        setEventDesc(event.target.value);
    };
  
    const handleSubmit = (evt) => {
        evt.preventDefault();

        // prepare data for api call        
        var data = {
            id: selectedEvent.id,
            userName: selectedEvent.userName,
            eventDate: eventDate.toString(),
            eventTitle: eventTitle,
            eventDesc: eventDesc
        };

        // api call
        fetch('/event/edit', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.error) {                    
                    toast(json.error, toastErrorOptions);
                }
                else {
                    toast(json.message, toastSuccessOptions);
                    setEventDesc('');
                    setEventTitle('');
                    setEventDate('');
                    setSelectedEvent(null);
                    localStorage.removeItem("selectedEvent");

                    // redirect to view-event
                    setTimeout(() => {
                        history.push('view-event');
                    }, 2000);
                }
            }
            );
    }

    const returnToViewEvents = (evt) => {
        history.push('view-event');
        return;
    }

    const viewEventDetails = (evt) => {
        localStorage.setItem("viewSelectedEvent", JSON.stringify(selectedEvent));
        history.push('view-event-details');
        return;
    }

    const removeEvent = (evt) => {   
        var data = {
            id: selectedEvent.id
        };

        // api call
        fetch('/event/delete', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.error) {
                    toast(json.error, toastErrorOptions);
                }
                else {
                    toast(json.message, toastSuccessOptions);
                    setEventDesc('');
                    setEventTitle('');
                    setEventDate('');
                    setSelectedEvent(null);
                    localStorage.removeItem("selectedEvent");

                    // redirect to view-event
                    setTimeout(() => {
                        history.push('view-event');
                    }, 2000);
                }
            }
        );        
    }

    return (
        <div>
            <div className="row">
                <div className="col-sm-2">
                </div>
                <div className="col-sm-8">
                    <div>
                        <button
                            type="button"
                            onClick={() => viewEventDetails()}
                            className="btn btn-block btn-primary">
                            [View Event-Details]
                            <i className="bi bi-eyeglasses" style={{ fontSize: 30 }}></i>
                        </button>
                        &nbsp;&nbsp;
                        <button
                            type="button"
                            onClick={() => removeEvent()}
                            className="btn btn-block btn-danger">
                            [Remove Event]
                            <i className="bi bi-trash" style={{ fontSize: 30 }}></i>
                        </button>
                    </div>
                    <p></p>
                    <form onSubmit={handleSubmit} noValidate>
                        <Card >
                            <Card.Header>
                                <div style={{ marginBottom: 30 }}>
                                    <h3 >
                                        Edit Your Event !
                                    </h3>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <div className="form-group">
                                    <Card.Title>Event Title</Card.Title>
                                    <Card.Text>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="eventTitle"
                                            value={eventTitle}
                                            id="eventTitle"
                                            onChange={e => handleEventTitle(e)}
                                        />
                                    </Card.Text>
                                </div>
                                <p></p>
                                <div className="form-group">
                                    <Card.Title>Event Description</Card.Title>
                                    <Card.Text>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="eventDesc"
                                            value={eventDesc}
                                            id="eventDesc"
                                            onChange={e => handleEventDesc(e)}
                                        />
                                    </Card.Text>
                                </div>
                                <p></p>
                                <div className="form-group">
                                    <Card.Title>Event Date/Time</Card.Title>
                                    <div>
                                        <DatePicker
                                            selected={eventDate}
                                            onChange={date => handleEventDate(date)}
                                            showTimeSelect
                                            dateFormat="Pp"
                                        />
                                    </div>
                                </div>
                                <p></p>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-10">
                                        <button
                                            type="submit"
                                            className="btn btn-block btn-success">
                                            <h5>Edit Event</h5>
                                        </button> &nbsp;&nbsp;|&nbsp;&nbsp;
                                        <button
                                            type="button"
                                            onClick={() => returnToViewEvents()}
                                            className="btn btn-block btn-info">
                                            <h5>Cancel</h5>
                                        </button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ManageEvent;