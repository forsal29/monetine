import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from '../services/auth.guard';
import { SpeseComponent } from './spese/spese.component';
import { CategorieComponent } from './categorie/categorie.component';
import { ContiComponent } from './conti/conti.component';
import { AnalisiComponent } from './analisi/analisi.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
   // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'spese',
        component: SpeseComponent,
      },
      {
        path: 'categorie',
        component: CategorieComponent,
      },
      {
        path: 'conti',
        component: ContiComponent,
      },
      {
        path: 'analisi',
        component: AnalisiComponent,
      },/*
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: '**',
        component: NotFoundComponent,
      },*/
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
