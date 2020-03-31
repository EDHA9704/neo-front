import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapCustomComponent } from './components/map-custom/map-custom.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {EmptyElementComponent} from './components/empty-element/empty-element.component'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import { LoadingCustomComponent } from './components/loading-custom/loading-custom.component'
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import {MatBadgeModule} from '@angular/material/badge';

import { MatRadioModule } from '@angular/material/radio';

  import { ImageCropperModule } from 'ngx-image-cropper';
  import { NgxUiLoaderModule} from 'ngx-ui-loader';
@NgModule({
  declarations: [MapCustomComponent, LoadingCustomComponent,EmptyElementComponent],
  entryComponents:[MapCustomComponent,LoadingCustomComponent,EmptyElementComponent],
  imports: [
    CommonModule,
    MatStepperModule,MatInputModule,MatCheckboxModule,
  MatIconModule,MatSelectModule,MatButtonModule,MatMenuModule,
  MatExpansionModule,MatFormFieldModule,MatDatepickerModule,MatNativeDateModule,
MatAutocompleteModule,MatCardModule,
FormsModule,ReactiveFormsModule,
MatPaginatorModule,
NgxUiLoaderModule,MatTabsModule,
NgxUsefulSwiperModule ,
MatRadioModule,
MatBadgeModule
  ],
  exports:[
    MapCustomComponent,

    LoadingCustomComponent,
    EmptyElementComponent,
    MatStepperModule,MatInputModule,MatCheckboxModule,
  MatIconModule,MatSelectModule,MatButtonModule,MatMenuModule,
  MatExpansionModule,MatFormFieldModule,MatDatepickerModule,MatNativeDateModule,
MatAutocompleteModule,MatCardModule,MatPaginatorModule,MatTabsModule,
FormsModule,ReactiveFormsModule,
MatRadioModule,
NgxUsefulSwiperModule ,
ImageCropperModule,
MatBadgeModule
  ]
})
export class SharedModule { }
