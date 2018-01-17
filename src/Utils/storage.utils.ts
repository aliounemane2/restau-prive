const NFC_APP_TAGS:string = 'NFC-APP-TAGS';
const NFC_APP_ACCOUNT:string = 'NFC-APP-ACCOUNT';
const NFC_APP_TOKEN:string = 'NFC-APP-TOKEN';

export class StorageUtils {

    static getItem(itemName:string):any {
        return JSON.parse(localStorage.getItem(itemName));
    }
    static hasTags():boolean {
        return !!this.getItem(NFC_APP_TAGS);
    }
    static hasToken():boolean {
        return !!this.getItem(NFC_APP_TOKEN);
    }
    static getTags():Array<any> {
        if(this.hasTags()) {
            return this.getItem(NFC_APP_TAGS);
        }
        return [];
    }
    static setTags(tags:Array<any>) {
        localStorage.setItem(NFC_APP_TAGS,JSON.stringify(tags));
    }
    static getToken():string {
        if(this.hasToken()) {
            return this.getItem(NFC_APP_TOKEN);
        }
    }
    static setToken(token:string):void {
        localStorage.setItem(NFC_APP_TOKEN,JSON.stringify(token));
    }
    static removeToken():void {
        localStorage.removeItem(NFC_APP_TOKEN);
    }
    static hasAccount():boolean {
        return !!this.getItem(NFC_APP_ACCOUNT);
    }
    static getAccount():any {
        if(this.hasAccount()) {
            return this.getItem(NFC_APP_ACCOUNT);
        }
    }
    static setAccount(account:any):void {
        localStorage.setItem(NFC_APP_ACCOUNT,JSON.stringify(account));
    }
    static removeAccount():void {
        localStorage.removeItem(NFC_APP_ACCOUNT);
    }
}