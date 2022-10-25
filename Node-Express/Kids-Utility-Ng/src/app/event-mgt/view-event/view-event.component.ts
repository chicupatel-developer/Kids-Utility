import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { LocalDataService } from '../../services/local-data.service';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit {

  eventOption = '';

  currentUser = '';
  myEvents = [];
  myEventsToDisplay = [];

  constructor(
    public localDataService: LocalDataService,
    public userService: UserService,
    private formBuilder: FormBuilder,
    public router: Router,
  ) { }

  setCurrentUser() {
    if ((localStorage.getItem('userName')) != "") {
      this.currentUser = (localStorage.getItem('userName'));
    }
    else {
      this.currentUser = "";
    }
  }
  
  ngOnInit(): void {
    if (!this.userService.isLoggedIn) {
      this.router.navigate(['/home']);
    }   
    this.setCurrentUser();
    this.getAllMyEvents();
  }

  sortByDateAsc(data) {
    return data.sort((a: any, b: any) => {
      return <any>new Date(a.eventDate) - <any>new Date(b.eventDate);
    });
  }
  
  getAllMyEvents() {
    fetch(this.localDataService.getServerUrl() + this.localDataService.getEventServiceUrl())
      .then(res => res.json())
      .then(data => {

        var currentUser = this.currentUser;
        data = data.filter(entry => entry.userName == currentUser);

        // order by date/time
        data = this.sortByDateAsc(data);        
        
        console.log(data);

        this.myEvents = data;
        this.getTodayEvents();
      }
      );
  }

  getTodayEvents() {
    this.eventOption = 'today';    

    if (this.myEvents && this.myEvents.length > 0) {
      var currentDateTime = new Date();
      var currentDate_ = currentDateTime.getDate() + '-' + currentDateTime.getMonth() + '-' + currentDateTime.getFullYear();
      var i;
      var eventDate;
      var todayEvents_ = [];
      for (i = 0; i < this.myEvents.length; i++) {
        eventDate = new Date(this.myEvents[i].eventDate);
        var eventDate_ = eventDate.getDate() + '-' + eventDate.getMonth() + '-' + eventDate.getFullYear();                  
        if (currentDate_ === eventDate_) {
          todayEvents_.push({
            eventData: this.myEvents[i],
            offsetFromToday: 0
          });
        }
      }
      
      this.myEventsToDisplay = [...todayEvents_];
    }
  }

  getThisWeekEvents() {
    this.eventOption = 'thisweek';

    if (this.myEvents && this.myEvents.length > 0) {
      // getting firstday and lastday of current week
      var currentDate = new Date();
      var firstday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
      var lastday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6));
      console.log(firstday + ' : ' + lastday)
          
      firstday = new Date(firstday.setHours(0, 0, 0, 0));
      lastday = new Date(lastday.setHours(0, 0, 0, 0));
      console.log(firstday + ' : ' + lastday);

      var i;
      var eventDate;
      var weekEvents_ = [];
      for (i = 0; i < this.myEvents.length; i++) {
        eventDate = new Date(this.myEvents[i].eventDate);
        var eventDate_ = eventDate;
        if ((eventDate_.setHours(0, 0, 0, 0) <= lastday.setHours(0, 0, 0, 0)) && (eventDate_.setHours(0, 0, 0, 0) >= firstday.setHours(0, 0, 0, 0))) {
          // calculate eventdate offset from today
          var currentDateTime = new Date();
          var difference = eventDate.getTime() - currentDateTime.getTime();
          var days = Math.ceil(difference / (1000 * 3600 * 24));
          console.log(eventDate + ' : ' + days);

          weekEvents_.push({
            eventData: this.myEvents[i],
            offsetFromToday: Number(days)
          });
        }
      }
      this.myEventsToDisplay = [...weekEvents_];
    }     
  }

  getThisMonthEvents() {
    this.eventOption = 'thismonth';

    if (this.myEvents && this.myEvents.length > 0) {
      var todaysDate = new Date();
      var i;
      var eventDate;
      var monthEvents_ = [];
      for (i = 0; i < this.myEvents.length; i++) {
        eventDate = new Date(this.myEvents[i].eventDate);
        if (eventDate.getMonth() == todaysDate.getMonth()) {
          var myToday = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate(), 0, 0, 0);
          var myEventDate = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), 0, 0, 0);
       
          // calculate eventdate offset from today                     
          var d = (Number(myEventDate) - Number(myToday));
          var Difference_In_Days = (d / (1000 * 3600 * 24)).toFixed(0);
          
          monthEvents_.push({
            eventData: this.myEvents[i],
            offsetFromToday: Difference_In_Days
          });
        }
      }
      this.myEventsToDisplay = [...monthEvents_];
    }
  }

  getNextMonthEvents() {
    this.eventOption = 'nextmonth';

    if (this.myEvents && this.myEvents.length > 0) {
      var todaysDate = new Date();
      todaysDate.setMonth(todaysDate.getMonth() + 1);
      const nextMonth = todaysDate.getMonth();
      console.log(nextMonth);

      var todaysDate = new Date();
      var i;
      var eventDate;
      var monthEvents_ = [];
      for (i = 0; i < this.myEvents.length; i++) {
        eventDate = new Date(this.myEvents[i].eventDate);
        if (eventDate.getMonth() == nextMonth) {

          var myToday = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate(), 0, 0, 0);
          var myEventDate = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), 0, 0, 0);
       
          // calculate eventdate offset from today                     
          var d = (Number(myEventDate) - Number(myToday));
          var Difference_In_Days = (d / (1000 * 3600 * 24)).toFixed(0);
                     
          monthEvents_.push({
            eventData: this.myEvents[i],
            offsetFromToday: Difference_In_Days
          });
        }
      }
      this.myEventsToDisplay = [...monthEvents_];
    }  
  }

  getPreviousMonthEvents() {
    this.eventOption = 'previousmonth';

    if (this.myEvents && this.myEvents.length > 0) {
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
      for (i = 0; i < this.myEvents.length; i++) {
        eventDate = new Date(this.myEvents[i].eventDate);
        if (eventDate.getMonth() === previousMonth && eventDate.getFullYear() === previousDate.getFullYear()) {
          // calculate eventdate offset from today
          var d = (eventDate.getTime() - todaysDate.getTime());
          var Difference_In_Days = (d / (1000 * 3600 * 24)).toFixed(0);

          monthEvents_.push({
            eventData: this.myEvents[i],
            offsetFromToday: Difference_In_Days
          });
        }
      }
      this.myEventsToDisplay = [...monthEvents_];
    }
  }

  getAllPreviousMonthsEvents() {
    this.eventOption = 'allpreviousmonth';

    if (this.myEvents && this.myEvents.length > 0) {
      var todaysDate = new Date();
      var previousMonth = todaysDate.getMonth() - 1;

      var previousMonthList = [];
      for (var j = 0; j <= previousMonth; j++) {
        previousMonthList.push(j);
      }
      console.log(previousMonthList);

      var i;
      var eventDate;
      var monthEvents_ = [];
      for (i = 0; i < this.myEvents.length; i++) {
        eventDate = new Date(this.myEvents[i].eventDate);

        var pMonth;
        for (pMonth = 0; pMonth < previousMonthList.length; pMonth++) {
          console.log('checking for pMonth : ' + pMonth);
          console.log('event date : ' + eventDate.getMonth());
          if (eventDate.getMonth() === pMonth && eventDate.getFullYear() === todaysDate.getFullYear()) {
            // calculate eventdate offset from today
            var d = (eventDate.getTime() - todaysDate.getTime());
            var Difference_In_Days = (d / (1000 * 3600 * 24)).toFixed(0);

            monthEvents_.push({
              eventData: this.myEvents[i],
              offsetFromToday: Difference_In_Days
            });
          }
        }                  
      }
      this.myEventsToDisplay = [...monthEvents_];
    }
  }

}
