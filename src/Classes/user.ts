export enum Profile {
    ADMIN,
    USER,
    MANAGER
}

export class User {
    id:number;
    email:string;
    firstName:string;
    lastName:string;
    username:string;
    password:string;
    rememberMe:boolean;
    lastConnection:Date;
    roles:Array<Profile>;
    constructor(user?:{lastConnection:string,username:string,password:string,role:Profile}) {
        this.rememberMe = false;
        this.roles = [];
        /*if(user) {
            _.assignIn(this, user);
        }*/
    }
    getRoleList():string {
        return this.roles.join(',');
    }
    getFullName():string {
        return this.firstName+' '+this.lastName;
    }
}