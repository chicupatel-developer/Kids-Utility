import { Component, Input, OnInit, OnChanges } from '@angular/core';


@Component({
  selector: 'app-today-event',
  templateUrl: './today-event.component.html',
  styleUrls: ['./today-event.component.css']
})
export class TodayEventComponent implements OnChanges {

  @Input() myEventsToDisplay;
  
  constructor() { }

  ngOnInit(): void {
    console.log('today events : ', this.myEventsToDisplay);
  }
  ngOnChanges() {  
  }
}
