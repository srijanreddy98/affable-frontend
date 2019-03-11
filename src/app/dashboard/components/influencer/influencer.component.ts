import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-influencer',
  templateUrl: './influencer.component.html',
  styleUrls: ['./influencer.component.scss']
})
export class InfluencerComponent implements OnInit {

  constructor() { }
  @Input() influencer: any;
  ngOnInit() {
    this.influencer.initials = this.getInitials();
  }
  getInitials() {
    if (this.influencer.name === '') {
      return this.influencer.username[0];
    }
    let name = '';
    for (const i of this.influencer.fullName.split(' ')) {
      name += i[0];
    }
    return name;
  }
}
