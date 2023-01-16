import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {map, Observable, of, Subscription} from "rxjs";
import {from} from 'rxjs';

import {Team} from "../../../shared/interfaces/team";
import {TeamcardComponent} from "../teamcard/teamcard.component";
import {CardLoaderDirective} from "../../../shared/directives/card-loader.directive";
import {TrackingdataService} from "../../../shared/services/trackingdata.service";
import {NbaResults} from "../../../shared/interfaces/nba-results";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit{

  public configUrl = 'https://free-nba.p.rapidapi.com/teams';
  public teamsList: Team[] = [];


  public teamTrackData: NbaResults[] = [];
  // public teamTrackData: Team[] = [];

  @ViewChild(CardLoaderDirective, { static: true })  dynamicChild!: CardLoaderDirective;
  public currentTeamId:number = 0;
  public trackTeamButton: boolean = true;
  constructor(
    private trackingData: TrackingdataService) {
  }

  ngOnInit(): void {

    this.trackingData.getTeamsData().subscribe((data: { body: any; }) => {

      of(data.body).subscribe({
        next: value => {
          this.teamsList.push(...value.data);

        }
      })
    });
  }

  showTeamDetail(id: number) {
    this.teamTrackData = [];
    this.trackTeamButton = true;
    this.currentTeamId = id;
    this.trackingData.getTeamTrackingData(id).subscribe((data: { body: any; }) => {

      of(data.body).subscribe({
        next: value => {
          this.teamTrackData.push(...value.data);
          this.trackTeamButton = false;
        }
      })
    });
  }


  AddTeamCard() {
    const component = this.dynamicChild.viewContainerRef.createComponent(TeamcardComponent);
    component.instance["teamInfo"] = this.teamTrackData;
    component.instance["teamId"] = this.currentTeamId;
    component.instance["givenId"] = '';
    component.instance["deleteRequest"].subscribe(next => {
      component.destroy();
    })

  }
}
