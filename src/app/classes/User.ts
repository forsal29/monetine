
import {UserInterface} from '../interfaces/User';

export  class User implements UserInterface {
    id: number;
    password: string;
    name: string;
    email: string;
    type: string;
    status: string;
    picture: string;
    constructor() {
        this.id = 0;
        this.name = '';
        this.password = '';
        this.email = '';
        this.type = '';
        this.status = '';
        this.picture = '';

    }
}
