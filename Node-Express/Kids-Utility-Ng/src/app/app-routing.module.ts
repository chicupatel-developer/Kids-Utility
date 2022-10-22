import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { MyGroceryComponent } from './my-grocery/my-grocery.component';
import { AdditionTwoByTwoComponent } from './math-test/addition-two-by-two/addition-two-by-two.component';
import { AdditionDecimalComponent } from './math-test/addition-decimal/addition-decimal.component';
import { MinusTwoByTwoComponent } from './math-test/minus-two-by-two/minus-two-by-two.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'my-grocery', component: MyGroceryComponent },
  { path: 'addition-2by2', component: AdditionTwoByTwoComponent },
  { path: 'addition-decimal', component: AdditionDecimalComponent },
  { path: 'minus-2by2', component: MinusTwoByTwoComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }