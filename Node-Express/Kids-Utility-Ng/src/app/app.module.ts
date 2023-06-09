import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// bs datepicker
// pagination
// search
// toast
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule } from 'ngx-toastr';


// services
import { UserService } from './services/user.service';
import { LocalDataService } from './services/local-data.service';

////////components
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { MyGroceryComponent } from './my-grocery/my-grocery.component';
import { AdditionTwoByTwoComponent } from './math-test/addition-two-by-two/addition-two-by-two.component';
import { DisplayTestResultComponent } from './math-test/display-test-result/display-test-result.component';
import { DisplayQuestionComponent } from './math-test/display-question/display-question.component';
import { AdditionDecimalComponent } from './math-test/addition-decimal/addition-decimal.component';
import { MinusTwoByTwoComponent } from './math-test/minus-two-by-two/minus-two-by-two.component';
import { MinusOneByTwoComponent } from './math-test/minus-one-by-two/minus-one-by-two.component';
import { MinusDecimalComponent } from './math-test/minus-decimal/minus-decimal.component';
import { MultiplyTwoByTwoComponent } from './math-test/multiply-two-by-two/multiply-two-by-two.component';
import { MultiplyDecimalComponent } from './math-test/multiply-decimal/multiply-decimal.component';
import { DivisionTwoByOneComponent } from './math-test/division-two-by-one/division-two-by-one.component';
import { CreateEventComponent } from './event-mgt/create-event/create-event.component';
import { ViewEventComponent } from './event-mgt/view-event/view-event.component';
import { MyEventComponent } from './event-mgt/view-event/my-event/my-event.component';
import { EventDetailsComponent } from './event-mgt/view-event/event-details/event-details.component';
import { EditEventComponent } from './event-mgt/edit-event/edit-event.component';
import { TestResultDatabaseComponent } from './math-test/test-result-database/test-result-database.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SigninComponent,
    RegisterComponent,
    MyGroceryComponent,
    AdditionTwoByTwoComponent,
    DisplayTestResultComponent,
    DisplayQuestionComponent,
    AdditionDecimalComponent,
    MinusTwoByTwoComponent,
    MinusOneByTwoComponent,
    MinusDecimalComponent,
    MultiplyTwoByTwoComponent,
    MultiplyDecimalComponent,
    DivisionTwoByOneComponent,
    CreateEventComponent,
    ViewEventComponent,  
    MyEventComponent, EventDetailsComponent, EditEventComponent, TestResultDatabaseComponent,  
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,   
    FormsModule,    
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  providers: [HttpClientModule, LocalDataService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
