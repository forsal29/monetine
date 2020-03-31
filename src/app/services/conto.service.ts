import {Conto} from '../classes/Conto';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';
import {Spese} from '../classes/Spese';
import {ConfigService} from './config.service';

@Injectable({
    providedIn: 'root'
})
export class ContoService {
    conto: Conto;
    private APIURL;

    constructor(private http: HttpClient, private auth: AuthService, private config: ConfigService) {
        this.APIURL = this.config.BASEURL + 'api/conto';
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
    getConti() {
        return  this.http.get(this.APIURL , {
            headers: this.getAuthHeader()
        });
    }

    getConto(id) {
        let res = this.http.get(this.APIURL + '/' + id, {
            headers: this.getAuthHeader()
        });

return res;
    }
    getContoSel() {
        this.getConti().subscribe( conto_res => {
            let conti = conto_res['data'];
            return conti;});
     // let conti = conto_res['data'];

    }
    deleteConto(conto) {
        const data = {_method: 'DELETE'} ;
        return  this.http.post(this.APIURL + '/' + conto.id ,  data ,
            {
                headers: this.getAuthHeader()
            }
        );
    }
    createConto(conto: Conto) {
        return  this.http.post(this.APIURL, conto,  {
            headers: this.getAuthHeader()
        });
    }
    updateConto(conto: Conto) {
        conto['_method'] = 'PUT';
        return  this.http.post(this.APIURL + '/' + conto.id , conto,
            {
                headers: this.getAuthHeader()
            }
        );

    }
}
