import {Injectable} from '@angular/core';
import { Analisi } from '../interfaces/Analisi';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import {ConfigService} from './config.service';

@Injectable({
    providedIn: 'root'
})
export class AnalisiService {
    data: Analisi;
   private APIURL;

    constructor(private http: HttpClient, private auth: NbAuthService, private config: ConfigService) {
        this.APIURL = this.config.BASEURL + 'api/analisi';
    }
    getAuthHeader(): HttpHeaders {
        var token = JSON.parse(localStorage.getItem('auth_app_token'));
        let headers = new HttpHeaders(
            {
                Authorization : 'Bearer ' + token.value
            }
        );
        return headers;
    }
    getAnalisiData() {

        return  this.http.get(this.APIURL , {
            headers: this.getAuthHeader()
        });
    }
   /* getFilterSaldo(datada: Date, dataa: Date) {

        //let filter = ['datada', datada, 'dataa', dataa];
        let lc_datada;
        let lc_dataa;
        if (datada) {
            lc_datada = datada['year'] + '-' + datada['month'] + '-' + datada['day'];
        }
        if (dataa) {
            lc_dataa = dataa['year'] + '-' + dataa['month'] + '-' + dataa['day'];
        }
        let filter = {"datada":lc_datada,"dataa":lc_dataa};
        return  this.http.post(this.APIURL , filter,
            {
                headers: this.getAuthHeader()
            }
        );
    }*/
}
