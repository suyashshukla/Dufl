import { Inject, Injectable } from "@angular/core";
import { User } from "../models/user.model";

@Injectable()
export class UserService {
    getUser() {
        return new User(this.getValue(User.newInstance()));
    }

    setUser(user: User) {
        this.setValue(user);
    }

    isUserExists(){
        return window.localStorage.getItem('name');
    }

    private getValue(object: any) {
        let model: any = {};
        Object.keys(object).forEach(key => {
            model[key] = window.localStorage.getItem(key)
        });
        return model;
    }

    private setValue(object: any) {
        Object.keys(object).forEach(key => {
            window.localStorage.setItem(key, object[key]);
        });
    }
}