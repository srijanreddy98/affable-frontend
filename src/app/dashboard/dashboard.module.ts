import { NgModule, Input  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NbCardModule, NbListModule, NbSpinnerModule, NbUserModule, NbThemeModule, NbButtonModule, NbRadioModule, NbSelectModule, NbTooltipModule } from '@nebular/theme';
import { InfluencerComponent } from './components/influencer/influencer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FilterComponent } from './components/filter/filter.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RadiobuttonsComponent } from './components/radiobuttons/radiobuttons.component';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [DashboardComponent, InfluencerComponent, FilterComponent, RadiobuttonsComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbListModule,
    NbSpinnerModule,
    NbUserModule,
    NbThemeModule,
    FlexLayoutModule,
    NbButtonModule,
    NbRadioModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    NbSelectModule,
    MatSelectModule,
    NbTooltipModule,
    MatInputModule
  ]
})
export class DashboardModule { }
