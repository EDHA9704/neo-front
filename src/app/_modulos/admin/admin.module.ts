import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent} from './components/admin/admin.component';
import { HeaderAdminComponent} from './components/header/header-admin.component';
import {AFundacionesComponent } from './components/afundaciones/afundaciones.component';
import {AvoluntariosComponent } from './components/avoluntarios/avoluntarios.component';
import {AciudadanosComponent } from './components/aciudadanos/aciudadanos.component';
import { AprobarComponent} from './components/aprobar/aprobar.component';
import { NewfundacionComponent} from './components/newfundacion/newfundacion.component';

import { NgxUiLoaderModule } from 'ngx-ui-loader';

import { MomentModule } from 'ngx-moment';

  import {MatTableModule} from '@angular/material/table'; 
import { PanelComponent } from './components/panel/panel.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {SharedModule} from 'src/app/_shared/shared.module'
@NgModule({
  declarations: [AdminComponent,HeaderAdminComponent,AFundacionesComponent,NewfundacionComponent,
  AvoluntariosComponent,AciudadanosComponent,AprobarComponent, PanelComponent ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxUiLoaderModule,
    MatTableModule,
    MatTooltipModule,
    SharedModule,
    MomentModule
  ]
})
export class AdminModule { }
