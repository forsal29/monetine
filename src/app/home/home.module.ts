import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbDialogModule } from '@nebular/theme';
import { NbThemeModule, 
         NbLayoutModule, NbContextMenuModule, NbActionsModule, NbMenuModule, NbTreeGridModule,
        NbIconModule, NbSidebarModule, NbSearchModule, NbSidebarService, NbUserModule, NbCheckboxModule,
        NbTabsetModule,NbWindowModule, NbRadioModule, NbSelectModule, NbInputModule, NbDatepickerModule } from '@nebular/theme';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SpeseComponent } from './spese/spese.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CategorieComponent } from './categorie/categorie.component';
import { ContiComponent } from './conti/conti.component';
import { HeaderComponent } from '../header/header.component';
import { LayoutService } from '../services/layout.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SpeseDialogComponent } from './spese/spese-dialog/spese-dialog.component';
import { ConfermaDialogComponent } from '../conferma-dialog/conferma-dialog.component';
import { FormsModule } from '@angular/forms';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { AnalisiComponent } from './analisi/analisi.component';
import { FsIconComponent } from './analisi/FsIcon.component';

@NgModule({
  declarations: [
    HomeComponent,
    FsIconComponent,
    DashboardComponent,
    NotFoundComponent,
    SpeseComponent,
    SidebarComponent,
    CategorieComponent,
    ContiComponent,
    HeaderComponent,
    SpeseDialogComponent,
    ConfermaDialogComponent,
    AnalisiComponent,
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbTreeGridModule,
    NbLayoutModule,
    NbCheckboxModule,
    NbButtonModule,
    NbDatepickerModule,
    NbDateFnsDateModule,
    NbSearchModule,
    NbInputModule,
    NbSelectModule,
    Ng2SmartTableModule,
    NbRadioModule,
    NbUserModule,
    NbTabsetModule,
    NbDialogModule.forRoot(),
    NbWindowModule.forChild(),
    HomeRoutingModule,
    NbSidebarModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbActionsModule,
    NbIconModule,
    NbMenuModule.forRoot(),
    NbContextMenuModule,
    FormsModule,
  ],
  providers: [
    NbSidebarService, 
    LayoutService
  ],
  entryComponents: [SpeseDialogComponent, ConfermaDialogComponent],
})
export class HomeModule { }
