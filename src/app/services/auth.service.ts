import {EventEmitter, Injectable, Output} from '@angular/core';
import {User} from '../classes/User';
import {HttpClient, HttpErrorResponse, HttpHeaderResponse} from '@angular/common/http';
import { UserService } from './user.service';
import { ConfigService} from './config.service';

interface Jwt {
    access_token: string;
    token_type: string;
    expires_in : number;
    user_name: string;
    email: string;
    type: string;
}
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isUserLogged = false;
    @Output() usersignedin = new EventEmitter<User>()
    @Output() usersignedup = new EventEmitter<User>()
    @Output() userlogout = new EventEmitter()
   // private APIAUTHURL = 'http://192.168.1.10:8000/api/auth';
   
    private APIAUTHURL;
    private UserServ : UserService;
    constructor(private http: HttpClient, private config: ConfigService ) {
        if (this.config.BASEURL == "192.168.1.10"){
            this.APIAUTHURL = '192.168.1.10:8000/api/auth/';
        } else {
        this.APIAUTHURL = this.config.BASEURL + 'api/auth/';
    }
    }

   // isUserLoggedIn() {
    canActivate(){
        let now = Date.now();
        let expire = parseInt(localStorage.getItem('expire'));
        if ( now < expire){
            this.isUserLogged = !!localStorage.getItem('token');
        } else {
            this.isUserLogged = false;
        }

        return this.isUserLogged;

    }

    signIn(email: string, password: string) {
        this.http.post(this.APIAUTHURL + 'login',
            {
                email: email,
                password: password
            }
        ).subscribe(
            (payload: Jwt) => {
                localStorage.setItem('token', payload.access_token);
                localStorage.setItem('user' , JSON.stringify(payload));
                const expire = Date.now()  + payload.expires_in * 1000;
                localStorage.setItem('expire',  expire.toString());
                let user = new User();
                user.name = payload.user_name;
                user.email = payload.email;
                user.type = payload.type;
                this.usersignedin.emit(user);


            } ,
            (httpResp: HttpErrorResponse) => {

                alert(httpResp.message)
            }
        );


        return true;

    }

    signUp(username: string, email: string, password: string) {
/*
        localStorage.setItem('token', email);
        let user = new User();
        user.name = username;
        user.email = email;
        this.usersignedup.emit(user);
        return true;
        */

        this.http.post(this.APIAUTHURL + 'register',
            {
                name : username,
                email: email,
                password: password
            }
        ).subscribe(
            (payload: Jwt) => {
                localStorage.setItem('token', email);
                let user = new User();
                user.name = username;
                user.email = email;
                this.usersignedup.emit(user);


            } ,
            (httpResp: HttpErrorResponse) => {

                alert(httpResp.message)
            }
        )
        return true;



    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('expire');
        this.userlogout.emit();
        this.isUserLogged = false;
    }
    getUser(): User {

        const data = JSON.parse(localStorage.getItem('user'));
        let user = new User();
        if(data){
            user.name = data['user_name'];
            user.email = data['email'];
                    }
        return user;
    }
    getToken() {
        return localStorage.getItem('token');
    }
}
