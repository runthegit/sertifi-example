import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { YearDetailsComponent } from './year-details/year-details.component';

const routes: Routes = [
  {path: 'year-details', component: YearDetailsComponent},
  {path: 'home', component: AppComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
