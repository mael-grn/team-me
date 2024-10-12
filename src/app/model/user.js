import {getItem, removeItem, setItem} from "@/app/utils/cookiesUtils";

export default class User {
    constructor(id, name, surname, date_creat, email) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.date_creat = date_creat;
        this.email = email;
    }


}
