import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, OnInit, EventEmitter, Output } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { InfluencersService } from 'src/app/services/influencers.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  /**
   * Since there are only three values I have used two way binding
   * Normally I would use form groups and formcontrol which I have done for the chip inputs
   */
  @Output() filtered = new EventEmitter<any>();
  options = [
    { value: true, label: 'Should Contain One' },
    { value: false, label: 'Should Contain All' }];
  shouldContainOne = true;
  sorting = [
    { value: true, label: 'Desc' },
    { value: false, label: 'Asec' }];
  desc = true;
  sortedBy = [
    { value: 0, label: 'Followers' },
    { value: 1, label: 'Comments' },
    { value: 2, label: 'Likes' }];
  sortBase = 0;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  interestCtrl = new FormControl();
  filteredInterests: Observable<string[]>;
  interests: string[] = [];
  allInterests: string[] = [];
  autoCompleteInterests: string[] = [];

  @ViewChild('interestsInput') interestsInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private influencerService: InfluencersService) {
    this.filteredInterests = this.interestCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.autoCompleteInterests.slice()));
  }
  ngOnInit() {
    this.influencerService.getInterests().subscribe(
      res => {
        this.allInterests = JSON.parse(JSON.stringify(res));
        this.autoCompleteInterests = this.allInterests.filter((i) => this.interests.indexOf(i) < 0);
      },
      err => console.log(err)
    );
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.interests.push(value.trim());
      }

      if (input) {
        input.value = '';
      }

      this.interestCtrl.setValue(null);
    }
  }

  remove(interest: string): void {
    const index = this.interests.indexOf(interest);

    if (index >= 0) {
      this.interests.splice(index, 1);
      this.autoCompleteInterests = this.allInterests.filter((i) => this.interests.indexOf(i) < 0);
      if (this.interests.length === 0 ) {
// tslint:disable-next-line: max-line-length
    this.filtered.emit({filter: false, filters: { interests: this.interests, sortBase: this.sortBase, desc: this.desc, shouldContainOne: this.shouldContainOne}});

// tslint:disable-next-line: max-line-length
    this.filtered.emit({filter: true, filters:{ interests: this.interests, sortBase: this.sortBase, desc: this.desc, shouldContainOne: this.shouldContainOne}});
      }
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.interests.push(event.option.viewValue);
// tslint:disable-next-line: max-line-length
    this.filtered.emit({filter: true, filters:{ interests: this.interests, sortBase: this.sortBase, desc: this.desc, shouldContainOne: this.shouldContainOne}});
    this.autoCompleteInterests = this.allInterests.filter((i) => this.interests.indexOf(i) < 0);
    this.interestsInput.nativeElement.value = '';
    this.interestCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.autoCompleteInterests.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
  emitEvent() {
    // tslint:disable-next-line: max-line-length
    this.filtered.emit({filter: true, filters: { interests: this.interests, sortBase: this.sortBase, desc: this.desc, shouldContainOne: this.shouldContainOne}});
  }
}
