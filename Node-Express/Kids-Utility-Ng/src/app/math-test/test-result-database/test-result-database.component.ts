import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from '../../services/local-data.service';


@Component({
  selector: 'app-test-result-database',
  templateUrl: './test-result-database.component.html',
  styleUrls: ['./test-result-database.component.css']
})
export class TestResultDatabaseComponent implements OnInit {

  currentUser = '';
  term: string;
  
  testResultCollection: Array<any>;

  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [3, 6, 9, 12];

  constructor(public localDataService: LocalDataService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.setCurrentUser();
    this.loadTestResults();  
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.loadTestResults();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.loadTestResults();
  }


  setCurrentUser() {
    if ((localStorage.getItem('userName')) != "") {
      this.currentUser = (localStorage.getItem('userName'));
    }
    else {
      this.currentUser = "";
    }
  }
  
  loadTestResults() {     
    fetch(this.localDataService.getServerUrl() + this.localDataService.getMathTestServiceUrl() + 'my-all-test-result')
      .then(res => res.json())
      .then(data => {
        var newArray = data.filter(entry => entry.userName == this.currentUser);
        this.testResultCollection = [...newArray];
              
      });
  }
}
