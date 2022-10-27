import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { MyGroceryComponent } from './my-grocery/my-grocery.component';
import { AdditionTwoByTwoComponent } from './math-test/addition-two-by-two/addition-two-by-two.component';
import { AdditionDecimalComponent } from './math-test/addition-decimal/addition-decimal.component';
import { MinusTwoByTwoComponent } from './math-test/minus-two-by-two/minus-two-by-two.component';
import { MinusOneByTwoComponent } from './math-test/minus-one-by-two/minus-one-by-two.component';
import { MinusDecimalComponent } from './math-test/minus-decimal/minus-decimal.component';
import { MultiplyTwoByTwoComponent } from './math-test/multiply-two-by-two/multiply-two-by-two.component';
import { MultiplyDecimalComponent } from './math-test/multiply-decimal/multiply-decimal.component';
import { DivisionTwoByOneComponent } from './math-test/division-two-by-one/division-two-by-one.component';
import { CreateEventComponent } from './event-mgt/create-event/create-event.component';
import { ViewEventComponent } from './event-mgt/view-event/view-event.component';
import { EventDetailsComponent } from './event-mgt/view-event/event-details/event-details.component';
import { EditEventComponent } from './event-mgt/edit-event/edit-event.component';
import { TestResultDatabaseComponent } from './math-test/test-result-database/test-result-database.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'my-grocery', component: MyGroceryComponent },
  { path: 'addition-2by2', component: AdditionTwoByTwoComponent },
  { path: 'addition-decimal', component: AdditionDecimalComponent },
  { path: 'minus-2by2', component: MinusTwoByTwoComponent },
  { path: 'minus-1by2', component: MinusOneByTwoComponent },
  { path: 'minus-decimal', component: MinusDecimalComponent },
  { path: 'multiply-2by2', component: MultiplyTwoByTwoComponent },
  { path: 'multiply-decimal', component: MultiplyDecimalComponent },
  { path: 'division-2by1', component: DivisionTwoByOneComponent },
  { path: 'create-event', component: CreateEventComponent },
  { path: 'view-event', component: ViewEventComponent },
  { path: 'event-details', component: EventDetailsComponent },
  { path: 'edit-event', component: EditEventComponent },
  { path: 'test-result', component: TestResultDatabaseComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }