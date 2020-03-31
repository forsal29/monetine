import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  NbAuthComponent,
  NbLoginComponent,
  NbRegisterComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';

import { AuthGuard } from './services/auth.guard';
const routes: Routes = [
  {
    path: 'home',
  //  loadChildren: './home/home.module#HomeModule',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
            },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
