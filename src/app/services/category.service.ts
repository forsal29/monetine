import {Category} from '../classes/Category';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';
import {Spese} from '../classes/Spese';
import {ConfigService} from './config.service';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    category: Category;
    private APIURL ;

    constructor(private http: HttpClient, private auth: AuthService, private config: ConfigService) {
        this.APIURL = this.config.BASEURL + 'api/category';
    }
    getAuthHeader(): HttpHeaders {
        var token = JSON.parse(localStorage.getItem('auth_app_token'));
        let headers = new HttpHeaders(
            {
             //   Authorization : 'Bearer ' +this.auth.getToken()
                Authorization : 'Bearer ' + token.value
            }
        );
        return headers;
    }
    getCategories() {
        return  this.http.get(this.APIURL , {
            headers: this.getAuthHeader()
        });
    }

    getCategory(id) {
        let res = this.http.get(this.APIURL + '/' + id, {
            headers: this.getAuthHeader()
        });

return res;
    }

    deleteCategory(category) {
        const data = {_method: 'DELETE'} ;
        return  this.http.post(this.APIURL + '/' + category.id ,  data ,
            {
                headers: this.getAuthHeader()
            }
        );
    }
    createCategory(category: Category) {
        return  this.http.post(this.APIURL, category,  {
            headers: this.getAuthHeader()
        });
    }
    updateCategory(category: Category) {
        category['_method'] = 'PUT';
        return  this.http.post(this.APIURL + '/' + category.id , category,
            {
                headers: this.getAuthHeader()
            }
        );

    }
}
