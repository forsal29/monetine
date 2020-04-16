    import { Injectable, destroyPlatform } from '@angular/core';
    import {Spese} from '../classes/Spese';
    import {HttpClient, HttpHeaders} from '@angular/common/http';
    import {User} from '../classes/User';
    import { AuthService } from './auth.service';
    import {UserService} from './user.service';
    import {ContoService} from './conto.service';
    import {Conto} from '../classes/Conto';
    import { ConfigService} from './config.service';
import { element } from 'protractor';

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
        getSpeseFuture() {
    
    
            return this.http.get(this.APIURL + 'Future', {
                headers: this.getAuthHeader()
            });
    
        }
        getSpeseScadute() {    
    
            return this.http.get(this.APIURL + 'Scadute', {
                headers: this.getAuthHeader()
            });
    
        }
        getSpeseRipetute() {
    
    
            return this.http.get(this.APIURL + 'Ripetute', {
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
        updateSpeseScadute(speseScadute: Spese[]) {
           
            speseScadute.forEach(element => {
                element.futura = "0";
                this.updateSpesa(element).subscribe();
            });     
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
        createSpeseRipetute(spese: Spese[]) {
            
            spese.forEach(element => {
                var copia = new Spese();
                copia.setData(element);
                // aggiorno nuova spesa
                copia.data = copia.datafutura;
                copia.datafutura = this.formatData(this.calcolaDataFutura(copia.data, copia.rip_time));
                copia.id = 0;
                this.createSpesa(copia).subscribe();
                copia = undefined;
                //modifico spesa da salvare
                element.datafutura = "";
                element.rip_time = "0";
                element.ripetuta = "";
               //element.data = this.formatData(element.data); // formatto date per sql
                this.updateSpesa(element).subscribe();

            });
        }
        calcolaDataFutura(data, times){
            const mydate = new Date(data);
            let days = 0;
         
          // mydate.setHours( mydate.getHours()+(mydate.getTimezoneOffset()/-60) );
          switch (times) {
            case '1': {
              days = 7;
              break;
            }
            case '2': {
              switch (mydate.getMonth() + 1) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 10:
                case  12: {
                days = 31;
                break;
                }
                case 11:
                case 4:
                case 6:
                case 9: {
                  days = 31;
                  break;
                }
                  case 2: {
                    days = 28;
                    break;
                    }
              }
              break;
            }
            case '3': {
              days = 365;
              break;
            }
            case '0':
                {
                    days = 0;
                }
          }
          if (days > 0 ){
            mydate.setDate(mydate.getDate() + days);
          }
            return mydate.toLocaleString().slice(0, 10).replace(',', '');
         }
         formatData(dataOrig){
            var dateParts = dataOrig.split("/");
            var mydate = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
            mydate.setHours(mydate.getHours() + (mydate.getTimezoneOffset() / -60));
            return mydate.toJSON().slice(0, 10).replace('T', ' ');
         }
        
    }
    
    
