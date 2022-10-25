import { Component, Input, OnInit, OnChanges } from '@angular/core';


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
  
  constructor() { }

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
}
