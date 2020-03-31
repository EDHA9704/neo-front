import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent} from './components/admin/admin.component';
import { AprobarComponent} from './components/aprobar/aprobar.component';
import { PanelComponent} from './components/panel/panel.component';
import {NewfundacionComponent} from './components/newfundacion/newfundacion.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children:[
      {
        path: '', 
        redirectTo: '/admin/usuarios',
        pathMatch: 'full'
      },
      {
        path: 'usuarios',
        component: PanelComponent
      },
        {
          path: 'cuentas/:tipo/:page',
          component: AprobarComponent
        }
        ,
        {
          path: 'fundacion-reg',
          component: NewfundacionComponent
        }
    ]
    
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
