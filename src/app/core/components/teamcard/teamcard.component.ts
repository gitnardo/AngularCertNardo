import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NbaResults} from "../../../shared/interfaces/nba-results";


@Component({
  selector: 'app-teamcard',
  templateUrl: './teamcard.component.html',
  styleUrls: ['./teamcard.component.scss']
})
export class TeamcardComponent implements OnInit {

  @Input() teamInfo: NbaResults[] | undefined;
  @Input() teamId: number = 0;

  @Output() deleteRequest = new EventEmitter<string>();
  public outcomeChecker: string[] = [];
  private homeTeam: number[] = [];
  private visitorTeam: number[] = [];
  public averagePointsScored: number = 0;
  public averagePointsConceded: number = 0;
  public abbreviation: string = '';
  public conference: string = '';
  public teamName: string = '';
  public givenId: string = 'team';

  constructor() {
  }

  ngOnInit(): void {

    this.homeTeam = [];
    this.visitorTeam = [];
    this.teamInfo?.forEach((value) => {
      // Match the home team
      if (Number(value.home_team.id) === Number(this.teamId)) {
        this.homeTeam.push(value.home_team_score);
        this.visitorTeam.push(value.visitor_team_score);
        this.abbreviation = value.home_team.abbreviation;
        this.givenId = value.home_team.abbreviation;
        this.conference = value.home_team.conference;
        this.teamName = value.home_team.full_name;
      } else {

        this.homeTeam.push(value.visitor_team_score);
        this.visitorTeam.push(value.home_team_score);
        this.abbreviation = value.visitor_team.abbreviation;
        this.conference = value.visitor_team.conference;
        this.teamName = value.visitor_team.full_name;
      }

    });
    this.playoffOutcomes();
  }

  playoffOutcomes() {
    this.outcomeChecker = [];
    this.averagePointsScored = 0;
    this.averagePointsConceded = 0;
    let i = 0;
    for (i; i <= this.homeTeam.length - 1; i++) {
      this.averagePointsScored += this.homeTeam[i];
      this.averagePointsConceded += this.visitorTeam[i];
      if (this.homeTeam[i] > this.visitorTeam[i]) {
        this.outcomeChecker.push('W');
      } else {
        this.outcomeChecker.push('L');
      }
    }
    this.averagePointsScored = Math.floor(this.averagePointsScored / this.homeTeam.length - 1);
    this.averagePointsConceded = Math.floor(this.averagePointsConceded / this.visitorTeam.length - 1);
    this.homeTeam = [];
    this.visitorTeam = [];
  }

  delete() {
    this.deleteRequest.emit('remove card');
  }
}
