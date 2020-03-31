import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './_modulos/layout/layout.component';
import { AuthGuard,AutenticacionGuard,AdminGuard} from './_core';
import { PerfilMascotaComponent } from 'src/app/_modulos/perfiles/components/perfil-mascota/perfil-mascota.component';
import { PerfilEmergenciaComponent } from 'src/app/_modulos/perfiles/components/perfil-emergencia/perfil-emergencia.component';
import { PerfilDonacionComponent } from 'src/app/_modulos/perfiles/components/perfil-donacion/perfil-donacion.component';
import { PerfilAdopcionComponent } from 'src/app/_modulos/perfiles/components/perfil-adopcion/perfil-adopcion.component';
import {NotFoundComponent} from './_shared/components/not-found/not-found.component'

const routes: Routes = [
  {path: '', component: LayoutComponent, children:[
    {
      path: '',
      redirectTo: '/home/inicio',
      pathMatch: 'full'
    
    },
    {
      path: 'home',
      loadChildren: () => import('./_modulos/home/home.module').then(m => m.HomeModule),
      canActivate:[AuthGuard]
    },
    { 
      path: 'fundacion/:id',
      loadChildren: () => import('./_modulos/fundacion/fundacion.module').then(m => m.FundacionModule),
      data:[{roles:'4'}]
    },
    {
      path: 'admin',
      loadChildren: () => import('./_modulos/admin/admin.module').then(m => m.AdminModule),
      canActivate:[AdminGuard],
      data:[{roles:'1'}]
    },
    {
      path: 'perfil/mascota/:id/:from/:mascota/:idM',
      component: PerfilMascotaComponent,
     
    },
    {
      path: 'perfil/emergencia/:idE',
      component: PerfilEmergenciaComponent
    },
    {
      path: 'perfil/donacion/:id/:idD',
      component: PerfilDonacionComponent
    },
    {
      path: 'perfil/adopcion/:id/:idA',
      component: PerfilAdopcionComponent
    }
  ]
  },
  {
    path: 'autenticacion',
    loadChildren: () => import('./_modulos/autenticacion/autenticacion.module').then(m => m.AutenticacionModule),
    canLoad: [AutenticacionGuard],
    canActivate:[AuthGuard]

  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  { path: '**', redirectTo: '/not-found' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
