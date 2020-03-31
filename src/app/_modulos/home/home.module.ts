import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { EmergenciasComponent } from './components/emergencias/emergencias.component';
import { FundacionesComponent } from './components/fundaciones/fundaciones.component';
//import { HeaderComponent } from './components/header/home-header.component';
import { TituloPageComponent } from './components/titulo-page/titulo-page.component';
import {MatCardModule} from '@angular/material/card';
import {HeaderHomeComponent} from './components/home-header/home-header.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { FooterComponent } from './components/footer/footer.component'
import {SharedModule} from 'src/app/_shared/shared.module'
import { NgxUiLoaderModule, NgxUiLoaderConfig, POSITION, SPINNER, PB_DIRECTION } from 'ngx-ui-loader';

@NgModule({
  declarations: [
    HomeComponent,
    MascotasComponent,
    EmergenciasComponent,
    FundacionesComponent,
    TituloPageComponent,
    HeaderHomeComponent,
    NosotrosComponent,
    FooterComponent
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    SharedModule,
    NgxUiLoaderModule
    
  ],
  exports:[
    HeaderHomeComponent
  ]
})
export class HomeModule { }
