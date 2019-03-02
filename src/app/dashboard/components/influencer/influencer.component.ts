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
  }
  getText(name: string, username: string) {
    if (name !== '') {
      let arr = name.split(' ');
      name = '';
      for (let i of arr) {
        name += i[0];
      }
      return name;
    } else {
      return username[0];
    }
  }
}
