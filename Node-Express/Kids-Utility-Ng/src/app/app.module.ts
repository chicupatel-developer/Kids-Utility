import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,   
    FormsModule,    
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
