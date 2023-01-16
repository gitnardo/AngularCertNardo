import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ResultsComponent} from "./core/components/results/results.component";
import {TeamsComponent} from "./core/components/teams/teams.component";

const routes: Routes = [
  { path: '', component: TeamsComponent},
  { path: 'result/:teamCode', component: ResultsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
