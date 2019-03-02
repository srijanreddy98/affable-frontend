import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-radiobuttons',
  templateUrl: './radiobuttons.component.html',
  styleUrls: ['./radiobuttons.component.scss']
})
export class RadiobuttonsComponent implements OnInit {
  @Input() options: any;
  option;
  constructor() { }
  @Output() valueChange = new EventEmitter<any>();
  ngOnInit() {
    console.log('Hi',this.options);
    this.option = this.options[0];
  }
  emitEvent() {
    console.log(this.option);
    this.valueChange.emit(this.option);
  }
}
