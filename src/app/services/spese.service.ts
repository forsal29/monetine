    import { Injectable } from '@angular/core';
    import {Spese} from '../classes/Spese';
    import {HttpClient, HttpHeaders} from '@angular/common/http';
    import {User} from '../classes/User';
    import { AuthService } from './auth.service';
    import {UserService} from './user.service';
    import {ContoService} from './conto.service';
    import {Conto} from '../classes/Conto';
    import { ConfigService} from './config.service';

    @Injectable({
        providedIn: 'root'
    })
    export class SpeseService {
        spese: Spese[] = [];

       // private APIURL = 'http://192.168.1.10:8000/api/spese';
        public APIURL ;

    
        constructor(private http: HttpClient, private auth: AuthService, private config: ConfigService) {
            this.APIURL = this.config.BASEURL + 'api/spese';
        }
        getAuthHeader(): HttpHeaders {
            var token = JSON.parse(localStorage.getItem('auth_app_token'));
            let headers = new HttpHeaders(
                {
                    Authorization : 'Bearer ' + token.value
                }
            );
            return headers
        }
        getSpese() {
    
    
            return this.http.get(this.APIURL, {
                headers: this.getAuthHeader()
            });
    
        }
    
        getSpesa(id: number) {
            return  this.http.get(this.APIURL + '/' + id,  {
                headers: this.getAuthHeader()
            });
        }
    
        deleteSpesa(spesa) {
            const data = {_method: 'DELETE'} ;
            return  this.http.post(this.APIURL + '/' + spesa.id ,  data ,
                {
                    headers: this.getAuthHeader()
                }
            );
        }
        updateSpesa(spesa: Spese) {
           spesa['_method'] = 'PUT';
            return  this.http.post(this.APIURL + '/' + spesa.id , spesa,
                {
                    headers: this.getAuthHeader()
                }
            );
    
        }
        createSpesa(spesa: Spese) {
            return  this.http.post(this.APIURL, spesa,  {
                headers: this.getAuthHeader()
            });
        }
    
    
    }
