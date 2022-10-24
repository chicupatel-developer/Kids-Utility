import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit {

  eventOption = 'today';

  constructor() { }

  ngOnInit(): void {
  }

  getTodayEvents() {
    this.eventOption = 'today';    
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
