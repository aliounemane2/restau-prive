/**
 * Language const
 * Created by Michael DESIGAUD on 10/02/2016.
 */

class Language {
    id:string;
    translateKey:string;
    code:string;
    constructor(id:string, translateKey:string, code:string) {
        this.id = id;
        this.translateKey = translateKey;
        this.code = code;
    }
}

export class Languages {
    public static get():Array<Language> {
        let langs:Array<Language> = [];
        langs.push(new Language('french','account.french','fr'));
        langs.push(new Language('english','account.english','en'));
        return langs;
    }
}