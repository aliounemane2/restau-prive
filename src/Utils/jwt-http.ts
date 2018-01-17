/**
 * Jwt http instance
 * Created by Michael DESIGAUD on 23/03/2016.
 */

import {Http,Response,RequestOptionsArgs,RequestOptions, ConnectionBackend} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {StorageUtils} from './storage.utils';

const AUTHORIZATION_TYPE_HEADER:string = 'Authorization';

export class JwtHttp extends Http {
    constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions) {
        super(_backend,_defaultOptions);
        console.log('JwtHttp constructor');
    }
    setAuthorizationHeader(options?: RequestOptionsArgs):void {
        let jwt:string = StorageUtils.getToken();
        if(options && jwt) {
            options.headers.set(AUTHORIZATION_TYPE_HEADER,'Bearer '+jwt);
        }
    }
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        this.setAuthorizationHeader(options);
        return super.get(url, options);
    }
    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        this.setAuthorizationHeader(options);
        return super.post(url,body,options);
    }
    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        this.setAuthorizationHeader(options);
        return super.put(url,body,options);
    }
    patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        this.setAuthorizationHeader(options);
        return super.patch(url,body,options);
    }
    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        this.setAuthorizationHeader(options);
        return super.delete(url,options);
     }
}