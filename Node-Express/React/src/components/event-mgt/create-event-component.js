import React, { Component, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { Card, Table } from "react-bootstrap";
import { useHistory } from 'react-router-dom'

const CreateEvent = () => {
    const history = useHistory();

    const [eventDate, setEventDate] = useState(new Date());
    const [eventTitle, setEventTitle] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [apiResponse, setApiResponse] = useState('');

    const getGUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    useEffect(() => {
        const user = getCurrentUser();
        if (!user) {
            history.push('login');
            return;
        }
        
        localStorage.removeItem("selectedEvent");
    }, []);


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

    const getCurrentUser = () => {
        return JSON.parse(localStorage.getItem('userName'));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();       

        // prepare data for api call        
        var data = {
            id: getGUID(),
            userName: getCurrentUser(),
            eventDate: eventDate.toString(),
            eventTitle: eventTitle,
            eventDesc: eventDesc
        };

        // api call
        fetch('/event/create', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.error) {
                    setApiResponse(json.error);
                }
                else {
                    setApiResponse('Success!');
                    setEventDesc('');
                    setEventTitle('');
                    setEventDate('');

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
                <div className="col-sm-3">
                </div>
                <div className="col-sm-6">
                    <form onSubmit={handleSubmit} noValidate>
                        <Card >
                            <Card.Header>
                                <div style={{ marginBottom: 30 }}>
                                    <h3 >Create Your Event !</h3>
                                    <p></p>
                                    {apiResponse == 'Success!' ? (
                                        <span className="createEventSuccess">{apiResponse}</span>
                                    ): (
                                            <span className="createEventError">{apiResponse}</span>
                                    )}                                    
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
                                    <div className="col-sm-5">
                                        <button
                                            type="submit"
                                            className="btn btn-block btn-success">
                                            <h5>Create Event</h5>
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

export default CreateEvent;