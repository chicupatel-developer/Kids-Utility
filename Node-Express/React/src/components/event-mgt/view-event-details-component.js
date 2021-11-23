import React, { Component, useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { Card, Table, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom'

const ViewEventDetails = () => {
    const history = useHistory();
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const user = getCurrentUser();
        if (!user) {
            history.push('login');
            return;
        }

        var selectedEvent = JSON.parse(localStorage.getItem('viewSelectedEvent'));
        console.log(selectedEvent);
        if (selectedEvent == null) {
            history.push('view-event');
            return;
        }
        else {
            setSelectedEvent(selectedEvent);          
        }

        // unmount 
        return () => {         
            setSelectedEvent(null);
            localStorage.removeItem("viewSelectedEvent");
        }
    }, []);

    const getCurrentUser = () => {
        return JSON.parse(localStorage.getItem('userName'));
    }
  
    const viewEvent = (evt) => {     
        history.push('view-event');
        return;
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
                            onClick={() => viewEvent()}
                            className="btn btn-block btn-info">
                            [B.A.C.K]
                        </button>                    
                    </div>
                    <p></p>
                    <div>
                        {selectedEvent ? (
                            <div className="selectedEvent">
                                <h3>{selectedEvent.eventTitle}</h3>
                                <p></p>
                                <h2>@ {moment(selectedEvent.eventDate).format('ddd, Do MMM - h:mm a')}</h2>
                                <p></p>
                                <h3>{selectedEvent.eventDesc}</h3>
                            </div>
                        ) :
                            (
                                <span>
                                </span>
                            )}
                    </div>
                </div>
                <div className="col-sm-2">
                </div>
            </div>
        </div>
    );
};

export default ViewEventDetails;