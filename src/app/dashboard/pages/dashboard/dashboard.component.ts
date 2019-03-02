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
  filter = false;
  filters: any;
  ngOnInit() {
    this.filters = {
      interests: [],
      shouldContainOne: true,
      desc: true,
      sortBase: 0
    };
    this.fetchInfluencers();
  }
  fetchInfluencers() {
    this.showSpinner = true;
    this.influencerService.getInfluencers(this.count, this.filters).subscribe(
      res => {
// tslint:disable-next-line: curly
        if (this.count === 0) this.influencers = [];
        this.influencers = [...this.influencers, ...JSON.parse(JSON.stringify(res))];
        this.showSpinner = false;
      },
      err => console.log(err)
    );
  }
  fetchFilteredInfluencers(filters) {
    this.showSpinner = true;
    this.influencerService.getFilteredInterests({filters}, this.count).subscribe(
      res => {
// tslint:disable-next-line: curly
        if (this.count === 0) this.influencers = [];
        this.influencers = [...this.influencers, ...JSON.parse(JSON.stringify(res))];
        this.showSpinner = false;
      },
      err => console.log(err)
    );
  }
  loadNext() {
    this.count += 1;
    console.log(this.filters);
    if (this.filters.interests.length === 0) {
      this.fetchInfluencers();
    } else {
      this.fetchFilteredInfluencers(this.filters);
    }
  }
  filterInfluencers(e) {
    this.filter = e.filter;
    this.count = 0;
    this.filters = e.filters;
    if (this.filters.interests.length === 0) {
      this.fetchInfluencers();
    } else {
      this.fetchFilteredInfluencers(e.filters);
    }
  }
}
