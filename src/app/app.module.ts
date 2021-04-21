import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { SimpleWMSService } from './service/simple-wms.service';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule, } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipAutocompleteModule } from 'chip-autocomplete';
import { MyChipAutocompleteComponent } from './my-chip-autocomplete/my-chip-autocomplete.component';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    MyChipAutocompleteComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatSlideToggleModule,
    MatIconModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatTooltipModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    ChipAutocompleteModule,
    MatStepperModule,
    MatSnackBarModule,
    MatProgressBarModule,
  ],
  providers: [Title, SimpleWMSService],
  bootstrap: [AppComponent]
})
export class AppModule { }
