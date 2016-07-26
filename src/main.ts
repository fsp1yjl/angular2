import {sayHello} from "./greet";

console.log(sayHello("TypeScript"));

import {bootstrap} from '@angular/platform-browser-dynamic';
import {Component, Injectable} from '@angular/core';
import {HTTP_PROVIDERS, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

class Person {
    constructor(public login:String) {
    }
}

@Injectable()
class Service {

    private userUrl = 'https://api.github.com/users/fstegmann';

    constructor(private http:Http) {
    }

    public getPerson():Observable<Person> {
        return this.http
            .get(this.userUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res:Response) {

        let body = res.json();

        return body || {};
    }

    private handleError(error:any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}

@Component({
    selector: 'app',
    template: '<h1>{{ text }}</h1>'
})
export class AppComponent {

    private text: String = '-- name --';

    constructor(private appService:Service) {
        this.appService.getPerson().subscribe(
            person => {
                this.text = person.login;
            },
            error => {
                console.error(error);
            }
        );
    }
}

bootstrap(AppComponent, [HTTP_PROVIDERS, Service]);
