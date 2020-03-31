import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FundacionRoutingModule } from './fundacion-routing.module';
import { FundacionComponent } from './components/fundacion/fundacion.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SharedModule} from './../../_shared/shared.module';

import { MisMascotasComponent } from './components/mis-mascotas/mis-mascotas.component';
import { MisEmergenciasComponent } from './components/mis-emergencias/mis-emergencias.component';
import { MisDonacionesComponent } from './components/mis-donaciones/mis-donaciones.component';
import { MisAdopcionesComponent } from './components/mis-adopciones/mis-adopciones.component';
import { MisVoluntariosComponent } from './components/mis-voluntarios/mis-voluntarios.component';
import { ContactanosComponent } from './components/contactanos/contactanos.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MomentModule } from 'ngx-moment';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';

import { NosotrosComponent } from './components/nosotros/nosotros.component'


@NgModule({
  declarations: [FundacionComponent, 
    MisMascotasComponent, MisEmergenciasComponent, 
    MisDonacionesComponent, MisAdopcionesComponent, 
    MisVoluntariosComponent, ContactanosComponent, MiPerfilComponent, NosotrosComponent],
  imports: [
    CommonModule,
    FundacionRoutingModule,
    FormsModule,ReactiveFormsModule,

    FormsModule,ReactiveFormsModule,
    NgxUiLoaderModule,
    NgxUsefulSwiperModule,
    SharedModule,
    MomentModule

    
  ],
 
})
export class FundacionModule { }
