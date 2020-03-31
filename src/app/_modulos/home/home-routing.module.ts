import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { NosotrosComponent} from './components/nosotros/nosotros.component';

import { EmergenciasComponent } from './components/emergencias/emergencias.component';
import { FundacionesComponent } from './components/fundaciones/fundaciones.component';
import { AuthGuard,AutenticacionGuard } from '../../_core';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children:[
      {
        path: '',
        redirectTo: 'inicio',
      
      },
      {
        path: 'inicio',
        component: NosotrosComponent
      },
       {
      path: 'mascotas/:tipo/:page',
      component: MascotasComponent
    },
    {
      path: 'fundaciones/:tipo/:page',
      component: FundacionesComponent
    },
    {
      path: 'emergencias/:tipo/:page',
      component: EmergenciasComponent
    }
    ]
  },
   


 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
