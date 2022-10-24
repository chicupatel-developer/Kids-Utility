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
  }
  getThisMonthEvents() {
    this.eventOption = 'thismonth';    
  }
  getNextMonthEvents() {
    this.eventOption = 'nextmonth';
  }
  getPreviousMonthEvents() {
    this.eventOption = 'previousmonth';
  }
  getAllPreviousMonthsEvents() {
    this.eventOption = 'allpreviousmonth';
  }

}
