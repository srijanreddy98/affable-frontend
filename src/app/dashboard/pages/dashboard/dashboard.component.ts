import { Component, OnInit } from '@angular/core';
import { InfluencersService } from '../../../services/influencers.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private influencerService: InfluencersService) { }
  showSpinner = false;
  influencers = [];
  count = 0;
  filters: any;
  ngOnInit() {
    this.filters = {
      interests: [],
      shouldContainOne: true,
      desc: true,
      sortBase: 0
    };
    this.fetchInfluencers(this.filters);
  }
  fetchInfluencers(filters) {
    this.showSpinner = true;
    this.influencerService.getInfluencers({filters}, this.count).subscribe(
      res => {
        // tslint:disable-next-line: curly
        if (this.count === 0) this.influencers = [];
        this.influencers = [...this.influencers, ...JSON.parse(JSON.stringify(res))];
        this.showSpinner = false;
      },
      err => console.log(err)
    );
  }
  fetchNextSet() {
    this.count += 1;
    this.fetchInfluencers(this.filters);
  }
  filterInfluencers(filters) {
    this.count = 0;
    this.filters = filters;
    this.fetchInfluencers(filters);
  }
}
