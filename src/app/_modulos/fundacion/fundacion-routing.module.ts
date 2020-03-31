import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FundacionComponent} from './components/fundacion/fundacion.component';

import { MisMascotasComponent} from './components/mis-mascotas/mis-mascotas.component';
import { MisVoluntariosComponent} from './components/mis-voluntarios/mis-voluntarios.component';
import { MisEmergenciasComponent} from './components/mis-emergencias/mis-emergencias.component';
import { MisAdopcionesComponent} from './components/mis-adopciones/mis-adopciones.component';
import { MisDonacionesComponent } from './components/mis-donaciones/mis-donaciones.component';
import { ContactanosComponent } from './components/contactanos/contactanos.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { NosotrosComponent} from './components/nosotros/nosotros.component';

import { FundacionGuard } from '../../_core';

const routes: Routes = [
  {
    path: '',
    component: FundacionComponent,
    children:[
      
      {
        path: 'nosotros',
        component: NosotrosComponent
      },
      {
        path: 'mascotas/:tipo/:page',
        component: MisMascotasComponent,
    
      },
      {
        path: 'voluntarios/:tipo/:page',
        component: MisVoluntariosComponent,
        canActivate:[FundacionGuard],
        data:[{roles:'4'}]
      },
      {
        path: 'emergencias/:tipo/:page',
        component: MisEmergenciasComponent,
        canActivate:[FundacionGuard],
        data:[{roles:'4'}]
      },
      {
        path: 'adopciones/:tipo/:page',
        component: MisAdopcionesComponent,
        canActivate:[FundacionGuard],
        data:[{roles:'4'}]
      },
      {
        path: 'donaciones/:tipo/:page',
        component: MisDonacionesComponent,
      },
      {
        path: 'contactanos',
        component: ContactanosComponent,
      },
      {
        path: 'perfil',
        component: MiPerfilComponent,
        canActivate:[FundacionGuard],
        data:[{roles:'4'}]
      }
    ]
  },
  

  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundacionRoutingModule { }
