import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TrackingdataService} from "../../../shared/services/trackingdata.service";
import {of} from "rxjs";
import {NbaResults} from "../../../shared/interfaces/nba-results";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  public teamId: number = 0;
  public teamName: string = '';
  public teamAbbreviation: string = 'Loading results...';
  public teamConference: string = '';
  public teamTrackData: NbaResults[] = [];

  constructor(private route: ActivatedRoute,
              private trackingData: TrackingdataService) {
    this.route.params.subscribe(params => {
      this.teamId = params['teamCode'];

    });
  }

  ngOnInit(): void {
    this.trackingData.getTeamTrackingData(this.teamId).subscribe((data: { body: any; }) => {

      of(data.body).subscribe({
        next: value => {
          this.teamTrackData.push(...value.data);

          this.teamTrackData?.forEach((value) => {
            if (Number(value.home_team.id) === Number(this.teamId)) {
              this.teamName = value.home_team.full_name;
              this.teamAbbreviation = value.home_team.abbreviation;
              this.teamConference =value.home_team.conference;
            }
          });

        }
      })
    });
  }

}
