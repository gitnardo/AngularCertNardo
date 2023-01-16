import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamsComponent } from './core/components/teams/teams.component';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatOptionModule} from "@angular/material/core";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import { TeamcardComponent } from './core/components/teamcard/teamcard.component';
import { CardLoaderDirective } from './shared/directives/card-loader.directive';
import { ResultsComponent } from './core/components/results/results.component';


@NgModule({
  declarations: [
    AppComponent,
    TeamsComponent,
    TeamcardComponent,
    CardLoaderDirective,
    ResultsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatOptionModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
