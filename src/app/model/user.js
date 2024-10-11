import {getItem, removeItem, setItem} from "@/app/utils/cookiesUtils";

export default class User {
    constructor(id, name, surname, date_creat, email) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.date_creat = date_creat;
        this.email = email;
    }

    formatName() {
        this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase();
    }

    formatSurname() {
        this.surname = this.surname.charAt(0).toUpperCase() + this.surname.slice(1).toLowerCase();
    }

    async saveData() {
        await setItem('user', JSON.stringify(this));
    }

    static async recoverData() {
        let user;
        try {
            user = JSON.parse(await getItem('user'));
        } catch (e) {
            return null;
        }
        return new User(user.id, user.name, user.surname, user.date_creat, user.email);
    }

    async deleteData() {
        await removeItem('user');
    }
}
