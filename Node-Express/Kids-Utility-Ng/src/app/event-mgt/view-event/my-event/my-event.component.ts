import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataService } from '../../../services/local-data.service';

@Component({
  selector: 'app-my-event',
  templateUrl: './my-event.component.html',
  styleUrls: ['./my-event.component.css']
})
export class MyEventComponent implements OnChanges {

  @Input() myEventsToDisplay;

  currentPage = 0;
  currentPageData = [];
  totalPages = 0;
  
  constructor(
    public router: Router,
    public localDataService: LocalDataService,
  ) { }

  ngOnInit(): void {
    console.log('events : ', this.myEventsToDisplay);

    var start = this.currentPage * 2;
    var end = start + 2;
    var currentPageData_ = this.myEventsToDisplay.slice(start, end);
    this.currentPageData = [...currentPageData_];

    this.totalPages = Math.ceil(this.myEventsToDisplay.length / 2);

  }
  ngOnChanges() {  
  }

  onNextButton() {  
    var currentPage_ = this.currentPage;
    if (this.currentPage + 1 < this.totalPages) {
      this.currentPage = this.currentPage +1;
      currentPage_ = currentPage_ + 1;
    }

    // 2  = records per page
    var start = currentPage_ * 2;
    var end = start + 2;
    var currentPageData_ = this.myEventsToDisplay.slice(start, end);
    this.currentPageData = [...currentPageData_];
  }  
  onPreviousButton() {
    var currentPage_ = this.currentPage;
    if (this.currentPage - 1 >= 0) {
      this.currentPage = this.currentPage - 1;
      currentPage_ = currentPage_ - 1;
    }

    // 2  = records per page
    var start = currentPage_ * 2;
    var end = start + 2;
    var currentPageData_ = this.myEventsToDisplay.slice(start, end);
    this.currentPageData = [...currentPageData_];
  }

  viewEvent(e, event) {
    console.log('viewing event,,,', event);

    this.localDataService.setMyEvent(event);

    setTimeout(() => {
      this.router.navigate(['/event-details']);
    }, 1000);
  }
  editEvent(e, event) {
    console.log('editing event,,,', event);
  }
  deleteEvent(e, event) {
    console.log('deleting event,,,', event);
  }
}
