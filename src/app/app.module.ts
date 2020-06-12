import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NbPasswordAuthStrategy, NbAuthModule, NbAuthJWTToken } from '@nebular/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbContextMenuModule, NbActionsModule, 
         NbMenuModule, NbIconModule, NbSearchModule, NbUserModule,NbInputModule, NbDatepickerModule } from '@nebular/theme';
import { AuthGuard } from './services/auth.guard';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NbEvaIconsModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbDatepickerModule.forRoot(),
    NbLayoutModule,
    NbActionsModule,
    NbInputModule,
    NbIconModule,
    NbUserModule,
    NbSearchModule,
    NbMenuModule.forRoot(),
    NbContextMenuModule,
    NbAuthModule.forRoot({
      strategies:[
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token:{
            class: NbAuthJWTToken,
            key: 'access_token',
          },
     //     baseEndpoint: 'http://localhost:4000',
     //     baseEndpoint: 'http://testmone-com.stackstaging.com/moneapi',
          baseEndpoint: environment.apiEndpoint,
          login: {
            endpoint: 'api/auth/login',
          },
          logout: {
            endpoint: '',
          }
        })
      ],
      forms: {
        logout: {
          redirectDelay: 500,
          strategy: 'email',
        },
      },
    })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
