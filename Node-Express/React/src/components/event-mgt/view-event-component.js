import React, { Component, useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { Card, Table, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom'

const ViewEvent = () => {
    const history = useHistory();

    const [todayEvents, setTodayEvents] = useState([]);
    const [monthEvents, setMonthEvents] = useState([]);
    const [weekEvents, setWeekEvents] = useState([]);
    const [showEvents, setShowEvents] = useState('');

    useEffect(() => {
        
        const user = getCurrentUser();
        if (!user) {
            history.push('login');
            return;
        }

        setShowEvents('');
        localStorage.removeItem("selectedEvent");
        localStorage.removeItem("viewSelectedEvent");

        getTodayEvents();

    }, []);

    

    const getCurrentUser = () => {
        return JSON.parse(localStorage.getItem('userName'));
    }
 
    const getCurrentWeekEvents = (evt) => {
        setShowEvents('WeekEvent');

        fetch('/api/eventget')
            .then(res => res.json())
            .then(data => {

                var currentUser = getCurrentUser();
                data = data.filter(entry => entry.userName == currentUser);

                // order by date/time
                data.sort(function (x, y) {
                    return new Date(x.eventDate) - new Date(y.eventDate)
                });
                
                
                // getting firstday and lastday of current week
                var curr = new Date(); // get current date
                var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
                var last = first + 6; // last day is the first day + 6
                var firstday = new Date(curr.setDate(first));
                var lastday = new Date(curr.setDate(last));
                console.log(firstday + ' : ' + lastday);
                firstday = new Date(firstday.setHours(0, 0, 0, 0));
                lastday = new Date(lastday.setHours(0, 0, 0, 0));
                console.log(firstday + ' : ' + lastday);


                var i;
                var eventDate;
                var weekEvents_ = [];
                for (i = 0; i < data.length; i++) {
                    eventDate = new Date(data[i].eventDate);
                    var eventDate_ = eventDate;
                    if ((eventDate_.setHours(0, 0, 0, 0) <= lastday.setHours(0, 0, 0, 0)) && (eventDate_.setHours(0, 0, 0, 0) >= firstday.setHours(0, 0, 0, 0))) {
                        // calculate eventdate offset from today
                        var currentDateTime = new Date();
                        var d = (eventDate - currentDateTime);
                        var Difference_In_Days = (d / (1000 * 3600 * 24)).toFixed(0);

                        weekEvents_.push({
                            eventData: data[i],
                            offsetFromToday: Number(Difference_In_Days)
                        });
                    }
                }
                setWeekEvents(weekEvents_);
            }
        );
    }
    
    const getTodayEvents = (evt) => {
        setShowEvents('TodayEvent');

        fetch('/api/eventget')
            .then(res => res.json())
            .then(data => {

                var currentUser = getCurrentUser();
                data = data.filter(entry => entry.userName == currentUser);

                // order by date/time
                data.sort(function (x, y) {
                    return new Date(x.eventDate) - new Date(y.eventDate)
                });

                var todaysDate = new Date();
                var i;
                var eventDate;
                var todayEvents_ = [];
                for(i=0; i < data.length; i++){
                    eventDate = new Date(data[i].eventDate);
                    if (eventDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
                       todayEvents_.push(data[i]);
                    }
                }
                setTodayEvents(todayEvents_);
            }
        );
    }

    const getMonthEvents = (evt) => {   
        setShowEvents('MonthEvent');

        fetch('/api/eventget')
            .then(res => res.json())
            .then(data => {

                var currentUser = getCurrentUser();
                data = data.filter(entry => entry.userName == currentUser);

                // order by date/time
                data.sort(function (x, y) {
                    return new Date(x.eventDate) - new Date(y.eventDate)
                });

                var todaysDate = new Date();
                var i;
                var eventDate;
                var monthEvents_ = [];
                for (i = 0; i < data.length; i++) {
                    eventDate = new Date(data[i].eventDate);
                    if (eventDate.getMonth() == todaysDate.getMonth()) {

                        // calculate eventdate offset from today
                        var currentDateTime = new Date();
                        var d = (eventDate - currentDateTime);
                        var Difference_In_Days = (d / (1000 * 3600 * 24)).toFixed(0);

                        monthEvents_.push({
                            eventData: data[i],
                            offsetFromToday: Difference_In_Days
                        });
                    }
                }
                setMonthEvents(monthEvents_);
            }
        );
    }

    const setActiveEvent = (selectedEvent) => {
        localStorage.setItem("selectedEvent", JSON.stringify(selectedEvent));
        history.push('manage-event');
    }

    let todayEventsList = todayEvents.length > 0
        ? (todayEvents.map((e, index) => {
            return (
                <span key={index}>                   
                    <Button variant="success"
                        style={{
                            marginBottom: 10,
                            marginRight: 15, width: 350, height: 150, borderColor: 'black', borderWidth: 2, color: 'white', borderStyle: 'dotted', borderRadius: 30
                        }}
                        onClick={() => { setActiveEvent(e) }}
                        key={index}
                        size="md">
                        <div className="todayEventDiv">  
                            <b>{e.eventTitle}</b>
                            <br />
                            <span className="todayEventTime"> @ {moment(e.eventDate).format('hh:mm A')}</span>
                            <br />
                            {e.eventDesc}
                        </div>
                    </Button>
                </span>
            )
        }, this)) : (
            <div>
                <p></p>
                <div className="row noEvents">
                    <div className="col-sm-4">
                    </div>
                    <div className="col-sm-4">
                        No Events Yet!
                    </div>
                    <div className="col-sm-4">
                    </div>
                </div>
                <p></p>
            </div>          
        );
    
    let monthEventsList = monthEvents.length > 0
        ? (monthEvents.map((e, index) => {
            return (
                <span key={index}>
                    <Button variant="success"
                        style={{
                            marginBottom: 10,
                            marginRight: 15, width: 350, height: 150, borderColor: 'black', borderWidth: 2, color: 'white', borderStyle: 'dotted', borderRadius: 30
                        }}
                        onClick={() => { setActiveEvent(e.eventData) }}
                        key={index}
                        size="md">
                        <div>
                            <b>
                                <span className="eventTitle">{e.eventData.eventTitle}</span>
                                <br />
                                {e.offsetFromToday > 1 ? (
                                    <span className="remainingEvent">
                                        [ {e.offsetFromToday} Days Remaining ]
                                    </span>
                                ) : (
                                    <span>
                                        {
                                            e.offsetFromToday == 1 ? (
                                                <span className="tomorrowEvent">
                                                    [ {e.offsetFromToday} Day Remaining ]
                                                </span>
                                            ) : (
                                                <span>
                                                    {
                                                        e.offsetFromToday == 0 ? (
                                                            <span className="todayEvent">
                                                                [ Today @ {moment(e.eventData.eventDate).format('hh:mm A')} ]
                                                            </span>
                                                        ) : (
                                                            <span>
                                                                {e.offsetFromToday < -1 ? (
                                                                    <span className="pastEvent">
                                                                        [ {(e.offsetFromToday * (-1))} Days Before ]
                                                                    </span>
                                                                ) : (
                                                                    <span className="pastEvent">
                                                                        [ {(e.offsetFromToday * (-1))} Day Before ]
                                                                    </span>
                                                                )}
                                                            </span>
                                                        )
                                                    }
                                                </span>
                                            )
                                        }
                                    </span>
                                )}
                            </b>
                            <br />
                            <b>{moment(e.eventData.eventDate).format('ddd, Do MMM - h:mm a')}</b>
                            <br />
                            {e.eventData.eventDesc}
                        </div>
                    </Button>
                </span>
            )
        }, this)) : (
            <div>
                <p></p>
                <div className="row noEvents">
                    <div className="col-sm-4">
                    </div>
                    <div className="col-sm-4">
                        No Events Yet!
                    </div>
                    <div className="col-sm-4">
                    </div>
                </div>
                <p></p>
            </div>
        );
        
    let weekEventsList = weekEvents.length > 0
        ? (weekEvents.map((e, index) => {
            return (
                <span key={index}>
                    <Button variant="success"
                        style={{
                            marginBottom: 10,
                            marginRight: 15, width: 350, height: 150, borderColor: 'black', borderWidth: 2, color: 'white', borderStyle: 'dotted', borderRadius: 30
                        }}
                        onClick={() => { setActiveEvent(e.eventData) }}
                        key={index}
                        size="md">
                        <div>
                            <b>
                                <span className="eventTitle">{e.eventData.eventTitle}</span>
                                <br />
                                {e.offsetFromToday > 1 ? (
                                    <span className="remainingEvent">
                                        [ {e.offsetFromToday} Days Remaining ]
                                    </span>
                                ) : (
                                    <span>
                                        {
                                            e.offsetFromToday == 1 ? (
                                                <span className="tomorrowEvent">
                                                    [ {e.offsetFromToday} Day Remaining ]
                                                </span>
                                            ) : (
                                                <span>
                                                    {
                                                        e.offsetFromToday == 0 ? (
                                                            <span className="todayEvent">
                                                                [ Today @ {moment(e.eventData.eventDate).format('hh:mm A')} ]
                                                            </span>
                                                        ) : (
                                                            <span>
                                                                {e.offsetFromToday < -1 ? (
                                                                    <span className="pastEvent">
                                                                        [ {(e.offsetFromToday * (-1))} Days Before ]
                                                                    </span>
                                                                ) : (
                                                                    <span className="pastEvent">
                                                                        [ {(e.offsetFromToday * (-1))} Day Before ]
                                                                    </span>
                                                                )}
                                                            </span>
                                                        )
                                                    }
                                                </span>
                                            )
                                        }
                                    </span>
                                )}
                            </b>
                            <br />
                            <b>{moment(e.eventData.eventDate).format('ddd, Do MMM - h:mm a')}</b>
                            <br />
                            {e.eventData.eventDesc}
                        </div>
                    </Button>
                </span>
            )
        }, this)) : (
            <div>
                <p></p>
                <div className="row noEvents">
                    <div className="col-sm-4">
                    </div>
                    <div className="col-sm-4">
                        No Events Yet!
                    </div>
                    <div className="col-sm-4">
                    </div>
                </div>
                <p></p>
            </div>
        );
  
    return (
        <div>
            <div className="row">
                <div className="col-sm-12">

                    <div>
                        <button
                            onClick={getTodayEvents}
                            type="button"
                            className="btn btn-block btn-info">
                            <h5>Today's Events !</h5>
                        </button> &nbsp;&nbsp;|&nbsp;&nbsp;
                        <button
                            onClick={getMonthEvents}
                            type="button"
                            className="btn btn-block btn-info">
                            <h5>This Month Events !</h5>
                        </button> &nbsp;&nbsp;|&nbsp;&nbsp;
                        <button
                            onClick={getCurrentWeekEvents}
                            type="button"
                            className="btn btn-block btn-info">
                            <h5>This Week Events !</h5>
                        </button>
                    </div>
                    <p></p>
                    <hr />
                    <p></p>

                    {showEvents == 'TodayEvent' ? (
                        <div>
                            <div className="row">
                                <div className="col-sm-4">
                                </div>
                                <div className="col-sm-4 eventListHeader">
                                    Today's Events
                                </div>
                                <div className="col-sm-4">
                                </div>
                            </div>                        
                            <p></p>
                            <p></p>                            
                            {todayEventsList}
                        </div>
                    ): (
                            <div>
                                {showEvents == 'MonthEvent' ? (
                                    <div>
                                        <div className="row">
                                            <div className="col-sm-4">
                                            </div>
                                            <div className="col-sm-4 eventListHeader">
                                                This Month Events
                                            </div>
                                            <div className="col-sm-4">
                                            </div>
                                        </div>
                                        <p></p>
                                        <p></p>
                                        {monthEventsList}
                                    </div>
                                ): (
                                        <div>
                                            {showEvents == 'WeekEvent' ? (
                                                <div>
                                                    <div className="row">
                                                        <div className="col-sm-4">
                                                        </div>
                                                        <div className="col-sm-4 eventListHeader">
                                                            This Week Events
                                                        </div>
                                                        <div className="col-sm-4">
                                                        </div>
                                                    </div>
                                                    <p></p>
                                                    <p></p>
                                                    {weekEventsList}
                                                </div>
                                            ): (
                                                <span></span>
                                            )}
                                        </div>
                                )}
                            </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewEvent;