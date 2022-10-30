import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { LocalDataService } from '../../services/local-data.service';
import { ToastService } from '../../services/toast.service';

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
    private toastService : ToastService,
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
    console.log('getting all events');
    fetch(this.localDataService.getServerUrl() + this.localDataService.getEventServiceUrl())
      .then(res => res.json())
      .then(data => {

        var currentUser = this.currentUser;
        data = data.filter(entry => entry.userName == currentUser);

        // order by date/time
        data = this.sortByDateAsc(data);
        
        console.log(data);

        this.myEvents = data;


        console.log('event option after child delete,,,', this.localDataService.getEventOption());
        if (this.localDataService.getEventOption() == "" || this.localDataService.getEventOption() == null || this.localDataService.getEventOption() == undefined)
          this.getTodayEvents();
        else if (this.localDataService.getEventOption() == "thisweek")
          this.getThisWeekEvents();
        else if (this.localDataService.getEventOption() == "thismonth")
          this.getThisMonthEvents();
        else if (this.localDataService.getEventOption() == "nextmonth")
          this.getNextMonthEvents();
        else if (this.localDataService.getEventOption() == "previousmonth")
          this.getPreviousMonthEvents();
        else if (this.localDataService.getEventOption() == "allpreviousmonth")
          this.getAllPreviousMonthsEvents();
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
      this.localDataService.setEventOption('today');
    }
  }

  getThisWeekEvents() {
    this.eventOption = 'thisweek';

    if (this.myEvents && this.myEvents.length > 0) {
      // getting firstday and lastday of current week
      var currentDate = new Date();
      var firstday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
      var lastday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6));
      // console.log(firstday + ' : ' + lastday)
          
      firstday = new Date(firstday.setHours(0, 0, 0, 0));
      lastday = new Date(lastday.setHours(0, 0, 0, 0));
      // console.log(firstday + ' : ' + lastday);

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
          // console.log(eventDate + ' : ' + days);

          weekEvents_.push({
            eventData: this.myEvents[i],
            offsetFromToday: Number(days)
          });
        }
      }
      this.myEventsToDisplay = [...weekEvents_];
      this.localDataService.setEventOption('thisweek');
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
      this.localDataService.setEventOption('thismonth');
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
      this.localDataService.setEventOption('nextmonth');
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
      this.localDataService.setEventOption('previousmonth');
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
      this.localDataService.setEventOption('allpreviousmonth');
    }
  }

  // call back from child component
  onEventDelete(eventToDelete) {
    console.log(eventToDelete);

    var data = {
      id: eventToDelete.eventData.id
    };

    // api call
    fetch(this.localDataService.getServerUrl() + this.localDataService.getEventServiceUrl() + 'delete', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.error) {   
          this.toastService.showError('Event - Delete ',json.error);
        }
        else {                
          this.toastService.showSuccess('Event - Delete ',json.message);
          setTimeout(() => {
            // window.location.reload();

            this.getAllMyEvents();
            
          }, 1000);
        }
      }
    );
    
    
  }
}
