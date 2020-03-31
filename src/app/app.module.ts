import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtInterceptor, ErrorInterceptor } from './_core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
//cmps
import { LayoutComponent } from 'src/app/_modulos/layout/layout.component';
import { FooterFundacionComponent } from 'src/app/_modulos/layout/footer-fundacion/footer-fundacion.component';
import { MainHeaderComponent} from 'src/app/_modulos/layout/main-header/main-header.component';
import { PerfilAdopcionComponent} from 'src/app/_modulos/perfiles/components/perfil-adopcion/perfil-adopcion.component';
import { PerfilDonacionComponent} from 'src/app/_modulos/perfiles/components/perfil-donacion/perfil-donacion.component';
import { PerfilEmergenciaComponent} from 'src/app/_modulos/perfiles/components/perfil-emergencia/perfil-emergencia.component';
import { PerfilMascotaComponent} from 'src/app/_modulos/perfiles/components/perfil-mascota/perfil-mascota.component';

import {SharedModule} from './_shared/shared.module'


import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { FormsModule} from '@angular/forms';

import {MatBadgeModule} from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
  import { ImageCropperModule } from 'ngx-image-cropper';
  import { NgxUiLoaderModule} from 'ngx-ui-loader';
  import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MainHeaderComponent,
    FooterFundacionComponent,
    PerfilAdopcionComponent,
    PerfilDonacionComponent,
    PerfilEmergenciaComponent,
    PerfilMascotaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatBadgeModule,
    ToastrModule.forRoot(),
    NgxUsefulSwiperModule ,
    FormsModule,
    MomentModule,
    MatStepperModule,MatInputModule,MatCheckboxModule,
    MatSelectModule,MatButtonModule,MatMenuModule,
  MatExpansionModule,MatFormFieldModule,MatDatepickerModule,
  MatNativeDateModule,MatAutocompleteModule,MatTabsModule,MatRadioModule,
  ImageCropperModule,NgxUiLoaderModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
