import React, { Component, useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { Card, Table, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom'

const ViewEvent = () => {
    const history = useHistory();

    const [myEvents, setMyEvents] = useState([]);
    
    const [showEvents, setShowEvents] = useState('');

    // paging
    const [showPaging, setShowPaging] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentPageData, setCurrentPageData] = useState([]);

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

        fetch('/event')
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
                        var difference = eventDate.getTime() - currentDateTime.getTime();
                        var days = Math.ceil(difference / (1000 * 3600 * 24));
                        console.log(eventDate + ' : ' + days);

                        weekEvents_.push({
                            eventData: data[i],
                            offsetFromToday: Number(days)
                        });
                    }
                }
                setMyEvents(weekEvents_);

                // paging
                // 2 records per page
                var totalPages_ = Math.ceil(weekEvents_.length / 2);
                setTotalPages(totalPages_);
                if (totalPages_ > 1) {
                    setShowPaging(true);
                    var currentPageData_ = weekEvents_.slice(0, 2);
                    console.log(currentPageData_);
                    setCurrentPage(0);
                    setCurrentPageData(currentPageData_);
                }
                else {
                    setShowPaging(false);
                    setCurrentPageData(weekEvents_);
                }
            }
        );
    }
    
    const getTodayEvents = (evt) => {
        setShowEvents('TodayEvent');

        fetch('/event')
            .then(res => res.json())
            .then(data => {

                var currentUser = getCurrentUser();
                data = data.filter(entry => entry.userName == currentUser);

                // order by date/time
                data.sort(function (x, y) {
                    return new Date(x.eventDate) - new Date(y.eventDate)
                });

                var i;
                var eventDate;
                var todayEvents_ = [];
                var currentDateTime = new Date();
                var currentDate_ = currentDateTime.getDate() + '-' + currentDateTime.getMonth() + '-' + currentDateTime.getFullYear();
                for (i = 0; i < data.length; i++){
                    eventDate = new Date(data[i].eventDate);

                    var eventDate_ = eventDate.getDate() + '-' + eventDate.getMonth() + '-' + eventDate.getFullYear();                    
                  
                    if (currentDate_===eventDate_) {
                        todayEvents_.push({
                            eventData: data[i],
                            offsetFromToday: 0
                        });
                    }                  
                }
                setMyEvents(todayEvents_);

                // paging
                // 2 records per page
                var totalPages_ = Math.ceil(todayEvents_.length / 2);
                setTotalPages(totalPages_);
                if (totalPages_ > 1) {
                    setShowPaging(true);
                    var currentPageData_ = todayEvents_.slice(0, 2);
                    console.log(currentPageData_);
                    setCurrentPage(0);
                    setCurrentPageData(currentPageData_);
                }
                else {
                    setShowPaging(false);
                    setCurrentPageData(todayEvents_);
                }
            }
        );
    }

    const getMonthEvents = (evt) => {   
        setShowEvents('MonthEvent');

        fetch('/event')
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

                        var myToday = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate(), 0, 0, 0);
                        var myEventDate = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), 0, 0, 0);

                        // calculate eventdate offset from today                     
                        var d = (myEventDate - myToday);
                        var Difference_In_Days = (d / (1000 * 3600 * 24)).toFixed(0);

                        monthEvents_.push({
                            eventData: data[i],
                            offsetFromToday: Difference_In_Days
                        });
                    }
                }
                setMyEvents(monthEvents_);

                // paging
                // 2 records per page
                var totalPages_ = Math.ceil(monthEvents_.length / 2);
                setTotalPages(totalPages_);
                if (totalPages_ > 1) {
                    setShowPaging(true);
                    var currentPageData_ = monthEvents_.slice(0, 2);
                    console.log(currentPageData_);
                    setCurrentPage(0);
                    setCurrentPageData(currentPageData_);
                }
                else {
                    setShowPaging(false);
                    setCurrentPageData(monthEvents_);
                }
            }
        );
    }

    // previous month events
    const getPreviousMonthEvents = (evt) => {
        setShowEvents('PreviousMonthEvent');

        fetch('/event')
            .then(res => res.json())
            .then(data => {

                var currentUser = getCurrentUser();
                data = data.filter(entry => entry.userName == currentUser);

                // order by date/time
                data.sort(function (x, y) {
                    return new Date(x.eventDate) - new Date(y.eventDate)
                });

                var todaysDate = new Date();
                todaysDate.setMonth(todaysDate.getMonth() - 1);
                // const previousMonth = todaysDate.toLocaleString('default', { month: 'long' });
                const previousMonth = todaysDate.getMonth();
                console.log(previousMonth);

                var i;
                var eventDate;
                var monthEvents_ = [];
                for (i = 0; i < data.length; i++) {
                    eventDate = new Date(data[i].eventDate);
                    if (eventDate.getMonth() == previousMonth) {

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
                setMyEvents(monthEvents_);

                // paging
                // 2 records per page
                var totalPages_ = Math.ceil(monthEvents_.length / 2);
                setTotalPages(totalPages_);
                if (totalPages_ > 1) {
                    setShowPaging(true);
                    var currentPageData_ = monthEvents_.slice(0, 2);
                    console.log(currentPageData_);
                    setCurrentPage(0);
                    setCurrentPageData(currentPageData_);
                }
                else {
                    setShowPaging(false);
                    setCurrentPageData(monthEvents_);
                }
            }
        );
    }

    // all previous month events
    const getAllPreviousMonthEvents = (evt) => {
        setShowEvents('AllPreviousMonthEvent');

        fetch('/event')
            .then(res => res.json())
            .then(data => {

                var currentUser = getCurrentUser();
                data = data.filter(entry => entry.userName == currentUser);

                // order by date/time
                data.sort(function (x, y) {
                    return new Date(x.eventDate) - new Date(y.eventDate)
                });

                var todaysDate = new Date();
                todaysDate.setMonth(todaysDate.getMonth() - 1);
                const previousMonth = todaysDate.getMonth();
                console.log('previous month : '+ previousMonth);

                var previousMonthList = [];                
                for (var i = 0; i <= previousMonth; i++){
                    previousMonthList.push(i);
                }
                console.log(previousMonthList);

                var i;
                var eventDate;
                var monthEvents_ = [];
                for (i = 0; i < data.length; i++) {
                    eventDate = new Date(data[i].eventDate);

                    var pMonth;
                    for (pMonth = 0; pMonth < previousMonthList.length; pMonth++)
                    {
                        console.log('checking for pMonth : ' + pMonth);
                        console.log('event date : ' + eventDate.getMonth());
                        if (eventDate.getMonth() == pMonth) {
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
                  
                }
                setMyEvents(monthEvents_);

                // paging
                // 2 records per page
                var totalPages_ = Math.ceil(monthEvents_.length / 2);
                setTotalPages(totalPages_);
                if (totalPages_ > 1) {
                    setShowPaging(true);
                    var currentPageData_ = monthEvents_.slice(0, 2);
                    console.log(currentPageData_);
                    setCurrentPage(0);
                    setCurrentPageData(currentPageData_);
                }
                else {
                    setShowPaging(false);
                    setCurrentPageData(monthEvents_);
                }
            }
        );
    }

    // paging
    const onNextPage = () => {
        var currentPage_ = currentPage;
        if (currentPage + 1 < totalPages) {
            setCurrentPage(currentPage + 1);
            currentPage_ = currentPage_ + 1;
        } 
        console.log(currentPage);

        // 2  = records per page
        var start = currentPage_ * 2;
        var end = start + 2;
        console.log('next : start point : ' + start);
        console.log('all data : ' + myEvents);
        var currentPageData_ = myEvents.slice(start, end);
        console.log(currentPageData_);
        setCurrentPageData(currentPageData_);
    }
    const onPreviousPage = () => {
        var currentPage_ = currentPage;
        if (currentPage - 1 >= 0) {
            setCurrentPage(currentPage - 1);
            currentPage_ = currentPage_ - 1;
        }
        console.log(currentPage);

        // 2  = records per page
        var start = currentPage_ * 2;
        var end = start + 2;
        console.log('previous : start point : ' + start);
        console.log('all data : ' + myEvents);
        var currentPageData_ = myEvents.slice(start, end);
        console.log(currentPageData_);
        setCurrentPageData(currentPageData_);
    }

    const setActiveEvent = (selectedEvent) => {
        localStorage.setItem("selectedEvent", JSON.stringify(selectedEvent));
        history.push('manage-event');
    }

    let todayEventsList = currentPageData.length > 0
        ? (currentPageData.map((e, index) => {
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
                        <div className="todayEventDiv">  
                            <b>{e.eventData.eventTitle}</b>
                            <br />
                            <span className="todayEventTime"> @ {moment(e.eventData.eventDate).format('hh:mm A')}</span>
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
    
    let monthEventsList = currentPageData.length > 0
        ? (currentPageData.map((e, index) => {
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
        
    let weekEventsList = currentPageData.length > 0
        ? (currentPageData.map((e, index) => {
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
    
    let previousMonthEventsList = currentPageData.length > 0
        ? (currentPageData.map((e, index) => {
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
                                    </span>
                                ) : (
                                    <span>
                                        {
                                            e.offsetFromToday == 1 ? (
                                                <span className="tomorrowEvent">                                                    
                                                </span>
                                            ) : (
                                                <span>
                                                    {
                                                        e.offsetFromToday == 0 ? (
                                                            <span className="todayEvent">                                                                
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
    
    let allPreviousMonthEventsList = currentPageData.length > 0
        ? (currentPageData.map((e, index) => {
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
                                    </span>
                                ) : (
                                    <span>
                                        {
                                            e.offsetFromToday == 1 ? (
                                                <span className="tomorrowEvent">
                                                </span>
                                            ) : (
                                                <span>
                                                    {
                                                        e.offsetFromToday == 0 ? (
                                                            <span className="todayEvent">
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
                <div className="col-sm-4">
                    <div>                      
                        <div className="leftColumn">
                            <button
                                onClick={getTodayEvents}
                                type="button"
                                className="btn btn-block">
                                <h5>Today's Events!</h5>
                            </button>
                        </div>
                        <br />
                        <div className="leftColumn">
                            <button
                                onClick={getMonthEvents}
                                type="button"
                                className="btn btn-block">
                                <h5>This Month Events!</h5>
                            </button>
                        </div>
                        <br />
                        <div className="leftColumn">
                            <button
                                onClick={getCurrentWeekEvents}
                                type="button"
                                className="btn btn-block">
                                <h5>This Week Event!</h5>
                            </button>
                        </div>
                        <br />
                        <div className="leftColumn">
                            <button
                                onClick={getPreviousMonthEvents}
                                type="button"
                                className="btn btn-block">
                                <h5>Previous Month Events!</h5>
                            </button>
                        </div>
                        <br />
                        <div className="leftColumn">
                            <button
                                onClick={getAllPreviousMonthEvents}
                                type="button"
                                className="btn btn-block">
                                <h5>All Previous Month Events!</h5>
                            </button>
                        </div>
                        <br />
                    </div>
                </div>
                <div className="col-sm-8">                 
                    {showEvents == 'TodayEvent' ? (
                        <div>
                            <div className="row">
                                <div className="col-sm-1">
                                </div>
                                <div className="col-sm-9 eventListHeader">
                                    Today's Events
                                </div>
                                <div className="col-sm-1">
                                </div>
                            </div>
                            
                            <p></p>
                            {showPaging ?
                                (
                                    <div className="row">
                                        <div className="col-sm-1">
                                        </div>
                                        <div className="col-sm-4">
                                            <button
                                                onClick={onPreviousPage}
                                                type="button"
                                                className="btn btn-block btn-info">
                                                &lt;&lt;PREVIOUS
                                            </button>
                                        </div>
                                        <div className="col-sm-2">
                                        </div>
                                        <div className="col-sm-4 nextPage">
                                            <button
                                                onClick={onNextPage}
                                                type="button"
                                                className="btn btn-block btn-info">
                                                NEXT&gt;&gt;
                                            </button>
                                        </div>
                                        <div className="col-sm-1">
                                        </div>
                                    </div>
                                ) : (
                                    <span></span>
                                )
                            }
                            <p></p>
                            <p></p>
                            {todayEventsList}
                        </div>
                    ) : (
                        <div>
                            {showEvents == 'MonthEvent' ? (
                                <div>
                                    <div className="row">
                                        <div className="col-sm-1">
                                        </div>
                                        <div className="col-sm-10 eventListHeader">
                                            This Month Events
                                        </div>
                                        <div className="col-sm-1">
                                        </div>
                                    </div>
                                    <p></p>
                                    {showPaging ?
                                        (
                                                <div className="row">
                                                    <div className="col-sm-1">
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <button
                                                            onClick={onPreviousPage}
                                                            type="button"
                                                            className="btn btn-block btn-info">
                                                            &lt;&lt;PREVIOUS
                                                        </button>
                                                    </div>
                                                    <div className="col-sm-2">
                                                    </div>
                                                    <div className="col-sm-4 nextPage">
                                                        <button
                                                            onClick={onNextPage}
                                                            type="button"
                                                            className="btn btn-block btn-info">
                                                            NEXT&gt;&gt;
                                                        </button>
                                                    </div>
                                                    <div className="col-sm-1">
                                                    </div>
                                                </div>
                                        ) : (
                                                <span></span>
                                            )
                                    }

                                    <p></p>
                                    <p></p>
                                    {monthEventsList}
                                </div>
                            ) : (
                                <div>
                                    {showEvents == 'WeekEvent' ? (
                                        <div>
                                            <div className="row">
                                                <div className="col-sm-1">
                                                </div>
                                                <div className="col-sm-10 eventListHeader">
                                                    This Week Events
                                                </div>
                                                <div className="col-sm-1">
                                                </div>
                                                    </div>
                                                    
                                            <p></p>
                                                { showPaging ? 
                                                    (
                                                            <div className="row">
                                                                <div className="col-sm-1">
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <button
                                                                        onClick={onPreviousPage}
                                                                        type="button"
                                                                        className="btn btn-block btn-info">
                                                                        &lt;&lt;PREVIOUS
                                                                    </button>
                                                                </div>
                                                                <div className="col-sm-2">
                                                                </div>
                                                                <div className="col-sm-4 nextPage">
                                                                    <button
                                                                        onClick={onNextPage}
                                                                        type="button"
                                                                        className="btn btn-block btn-info">
                                                                        NEXT&gt;&gt;
                                                                    </button>
                                                                </div>
                                                                <div className="col-sm-1">
                                                                </div>
                                                            </div>
                                                    ) : (
                                                            <span></span>
                                                        )
                                                }
                                            <p></p>
                                            <p></p>
                                            {weekEventsList}
                                        </div>
                                    ) : (
                                        <div>
                                            {showEvents == 'PreviousMonthEvent' ? (
                                                <div>
                                                    <div className="row">
                                                        <div className="col-sm-1">
                                                        </div>
                                                        <div className="col-sm-10 eventListHeader">
                                                            Previous Month Events
                                                        </div>
                                                        <div className="col-sm-1">
                                                        </div>
                                                    </div>

                                                    <p></p>
                                                    { showPaging ? 
                                                        (
                                                                        <div className="row">
                                                                            <div className="col-sm-1">
                                                                            </div>
                                                                            <div className="col-sm-4">
                                                                                <button
                                                                                    onClick={onPreviousPage}
                                                                                    type="button"
                                                                                    className="btn btn-block btn-info">
                                                                                    &lt;&lt;PREVIOUS
                                                                                </button>
                                                                            </div>
                                                                            <div className="col-sm-2">
                                                                            </div>
                                                                            <div className="col-sm-4 nextPage">
                                                                                <button
                                                                                    onClick={onNextPage}
                                                                                    type="button"
                                                                                    className="btn btn-block btn-info">
                                                                                    NEXT&gt;&gt;
                                                                                </button>
                                                                            </div>
                                                                            <div className="col-sm-1">
                                                                            </div>
                                                                        </div>
                                                        ) : (
                                                            <span></span>
                                                        )
                                                    }
                                                    <p></p>
                                                    <p></p>
                                                    {previousMonthEventsList}
                                                </div>
                                            ) : (
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-sm-1">
                                                            </div>
                                                            <div className="col-sm-10 eventListHeader">
                                                                All Previous Month Events
                                                            </div>
                                                            <div className="col-sm-1">
                                                            </div>
                                                        </div>
                                                        
                                                        <p></p>
                                                        { showPaging ? 
                                                            (
                                                                <div className="row">
                                                                    <div className="col-sm-1">
                                                                    </div>
                                                                    <div className="col-sm-4">
                                                                        <button
                                                                            onClick={onPreviousPage}
                                                                            type="button"
                                                                            className="btn btn-block btn-info">
                                                                            &lt;&lt;PREVIOUS
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-sm-2">
                                                                    </div>
                                                                    <div className="col-sm-4 nextPage">
                                                                        <button
                                                                            onClick={onNextPage}
                                                                            type="button"
                                                                            className="btn btn-block btn-info">
                                                                            NEXT&gt;&gt;
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-sm-1">
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <span></span>
                                                            )
                                                        }                                                     
                                                        <p></p>
                                                        <p></p>
                                                        {allPreviousMonthEventsList}
                                                    </div>
                                                )
                                            }

                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                    <p></p>
                </div>
            </div>
        </div>
    );
};

export default ViewEvent;