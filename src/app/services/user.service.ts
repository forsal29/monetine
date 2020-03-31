import { Injectable } from '@angular/core';
import {User} from '../classes/User';
import {UserInterface} from '../interfaces/User';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {AuthService} from "./auth.service";
import { HttpParams} from '@angular/common/http';
import {ConfigService} from './config.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
    users: User[] = [];
    user: User;

    private APIURL ;
    private APIURLUSER ;

    constructor(private http: HttpClient, private auth: AuthService, private config: ConfigService) {
        this.APIURL = this.config.BASEURL + 'api/users';
        this.APIURLUSER = this.config.BASEURL ;
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
    getUsers() {
        return  this.http.get(this.APIURL , {
            headers: this.getAuthHeader()
        });
    }
    getUser(id: number) {
        return  this.http.get(this.APIURL + '/' + id,  {
            headers: this.getAuthHeader()
        });
    }
    deleteUser(user) {
        const data = {_method: 'DELETE'} ;
        return  this.http.post(this.APIURL + '/' + user.id ,  data/*,
            {
                headers: this.getAuthHeader()
            }*/
        );
    }
    updateUser(user: UserInterface) {
        user['_method'] = 'PUT';
        return  this.http.post(this.APIURL + '/' + user.id , user,
            {
                headers: this.getAuthHeader()
            }
        );
    }
    createUser(user: UserInterface) {
        return  this.http.post(this.APIURL, user,  {
            headers: this.getAuthHeader()
        });
    }
    getUserByMail(mail: string) {
        const data = {email: mail} ;
       return this.http.get(this.APIURLUSER + 'api/userbymail',  {
            headers: this.getAuthHeader(),
            params: new HttpParams().set('email', mail)
        });
    }
}
