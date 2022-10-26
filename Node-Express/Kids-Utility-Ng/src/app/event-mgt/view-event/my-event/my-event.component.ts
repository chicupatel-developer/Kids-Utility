import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
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
  
  @Output() onEventDelete = new EventEmitter();

 
  
  constructor(
    public router: Router,
    public localDataService: LocalDataService,
  ) { }


  resetPaging() {
    this.currentPage = 0;
    this.currentPageData = [];
    this.totalPages = 0;

    var start = this.currentPage * 2;
    var end = start + 2;
    var currentPageData_ = this.myEventsToDisplay.slice(start, end);
    this.currentPageData = [...currentPageData_];

    this.totalPages = Math.ceil(this.myEventsToDisplay.length / 2);
  }

  ngOnInit(): void {
    console.log('events : ', this.myEventsToDisplay);

    var start = this.currentPage * 2;
    var end = start + 2;
    var currentPageData_ = this.myEventsToDisplay.slice(start, end);
    this.currentPageData = [...currentPageData_];

    this.totalPages = Math.ceil(this.myEventsToDisplay.length / 2);

  }

  ngOnChanges() {  
    console.log('from the child now,,,',this.myEventsToDisplay);

    // this will refresh this child component's data and paging controls
    this.resetPaging();
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

    this.localDataService.setMyEvent(event);

    setTimeout(() => {
      this.router.navigate(['/edit-event']);
    }, 1000);

  }
  eventDelete(eventToDelete) {
    console.log(eventToDelete);
    this.onEventDelete.emit(eventToDelete);
  }
}
