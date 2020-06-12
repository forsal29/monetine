import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class ConfigService {
     public BASEURL;
    constructor() {/*
         if ( window.location.href.includes('http://192.168.1.10:4200/') ) {
             this.BASEURL = 'http://192.168.1.10:8000/';
         } else if ( window.location.href.includes( 'http://monetine.epizy.com')) {
             this.BASEURL = 'http://monetine.epizy.com/moneapi/';
        }  else {
          //  this.BASEURL = window.location.href + 'moneapi/';
            this.BASEURL  = 'http://testmone-com.stackstaging.com/moneapi/';
         }*/
         this.BASEURL = environment.apiEndpoint ;
    }

  //  public BASEURL = window.location.href + 'moneapi/';
}