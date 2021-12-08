import React, { Component, useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { Card, Table, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom'
import MyEvent from "./child-components/my-event-component";

const ViewEvent = () => {

    // 
    const [eventName, setEventName] = useState('event name : coming from parent!');

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

        // reset
        setCurrentPageData([]);
        setMyEvents([]);

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
                var currentDate = new Date();
                // var firstday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay())).toUTCString();
                var firstday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
                var lastday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6));
                console.log(firstday + ' : ' + lastday)
          
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

        // reset
        setCurrentPageData([]);
        setMyEvents([]);

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
                    // console.log(currentPageData_);
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

        // reset
        setCurrentPageData([]);
        setMyEvents([]);


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

    const getPreviousMonthEvents = (evt) => {
        setShowEvents('PreviousMonthEvent');

        // reset
        setCurrentPageData([]);
        setMyEvents([]);

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
                var previousMonth = todaysDate.getMonth() - 1;
                var previousYear = todaysDate.getFullYear() - 1;
                var previousDate = new Date(todaysDate.getFullYear(), previousMonth, 1);
                console.log(previousMonth);
                // current month is january(0)
                if (previousMonth < 0) {
                    previousMonth = 11;
                    previousDate = new Date(previousYear, previousMonth, 1);
                }
                console.log(previousDate);


                var i;
                var eventDate;
                var monthEvents_ = [];
                for (i = 0; i < data.length; i++) {
                    eventDate = new Date(data[i].eventDate);
                    if (eventDate.getMonth() === previousMonth && eventDate.getFullYear() === previousDate.getFullYear()) {                      
                        // calculate eventdate offset from today
                        var d = (eventDate.getTime() - todaysDate.getTime());
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
   
    const getAllPreviousMonthEvents = (evt) => {
        setShowEvents('AllPreviousMonthEvent');

        // reset
        setCurrentPageData([]);
        setMyEvents([]);

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
                var previousMonth = todaysDate.getMonth() - 1;

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
                        if (eventDate.getMonth() === pMonth && eventDate.getFullYear() === todaysDate.getFullYear() ) {
                            // calculate eventdate offset from today
                            var d = (eventDate.getTime() - todaysDate.getTime());
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

    const getNextMonthEvents = (evt) => {
        setShowEvents('NextMonthEvent');

        // reset
        setCurrentPageData([]);
        setMyEvents([]);

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
                todaysDate.setMonth(todaysDate.getMonth() + 1);
                const nextMonth = todaysDate.getMonth();
                console.log(nextMonth);

                var i;
                var eventDate;
                var monthEvents_ = [];
                for (i = 0; i < data.length; i++) {
                    eventDate = new Date(data[i].eventDate);
                    if (eventDate.getMonth() == nextMonth) {

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
                        <div className="leftColumn">
                            <button
                                onClick={getNextMonthEvents}
                                type="button"
                                className="btn btn-block">
                                <h5>Next Month Events!</h5>
                            </button>
                        </div>
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
                            {currentPageData.length > 0 && currentPageData && (
                                <div>
                                    <MyEvent                              
                                        myEvents={myEvents}                                
                                        currentPageData={currentPageData}
                                        totalPages={totalPages}
                                        showPaging={showPaging}
                                    />
                                </div>
                            )}         
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
                                    {currentPageData.length > 0 && currentPageData && (
                                        <div>
                                            <MyEvent                              
                                                myEvents={myEvents}                                
                                                currentPageData={currentPageData}
                                                totalPages={totalPages}
                                                showPaging={showPaging}
                                            />
                                        </div>
                                        )
                                    }                                  
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
                                            {currentPageData.length > 0 && currentPageData && (
                                                <div>
                                                    <MyEvent                              
                                                        myEvents={myEvents}                                
                                                        currentPageData={currentPageData}
                                                        totalPages={totalPages}
                                                        showPaging={showPaging}
                                                    />
                                                </div>
                                                )
                                            }  
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
                                                    {currentPageData.length > 0 && currentPageData && (
                                                        <div>
                                                            <MyEvent                              
                                                                myEvents={myEvents}                                
                                                                currentPageData={currentPageData}
                                                                totalPages={totalPages}
                                                                showPaging={showPaging}
                                                            />
                                                        </div>
                                                        )
                                                    }  
                                                </div>
                                            ) : (                                              
                                                    <div>
                                                        { showEvents == 'NextMonthEvent' ? (                                                        
                                                            <div>
                                                                <div className="row">
                                                                    <div className="col-sm-1">
                                                                    </div>
                                                                    <div className="col-sm-10 eventListHeader">
                                                                        Next Month Events
                                                                    </div>
                                                                    <div className="col-sm-1">
                                                                    </div>
                                                                </div>
                                                    
                                                                <p></p>
                                                                {currentPageData.length > 0 && currentPageData && (
                                                                    <div>
                                                                        <MyEvent                              
                                                                            myEvents={myEvents}                                
                                                                            currentPageData={currentPageData}
                                                                            totalPages={totalPages}
                                                                            showPaging={showPaging}
                                                                        />
                                                                    </div>
                                                                    )
                                                                }  
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
                                                                    {currentPageData.length > 0 && currentPageData && (
                                                                        <div>
                                                                            <MyEvent                              
                                                                                myEvents={myEvents}                                
                                                                                currentPageData={currentPageData}
                                                                                totalPages={totalPages}
                                                                                showPaging={showPaging}
                                                                            />
                                                                        </div>
                                                                        )
                                                                    }  
                                                            </div>
                                                            )   
                                                        }                                                      
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