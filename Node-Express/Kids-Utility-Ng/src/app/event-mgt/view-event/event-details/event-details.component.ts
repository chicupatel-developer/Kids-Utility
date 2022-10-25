import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataService } from '../../../services/local-data.service';


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  myEvent;

  constructor(
    public router: Router,
    public localDataService: LocalDataService,
  ) { }

  ngOnInit(): void {
    this.myEvent = this.localDataService.getMyEvent();
    if (this.myEvent == null || this.myEvent == undefined)
      this.router.navigate(['/view-event']);
  }

  goBack() {
    this.localDataService.setMyEvent(null);
    this.router.navigate(['/view-event']);
  }
}
