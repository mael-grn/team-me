export default class StorageManager {

     static getToken() {
        return localStorage.getItem("token");
    }

    static setToken(token) {
        localStorage.setItem("token", token);
    }

    static removeToken() {
        localStorage.removeItem("token");
    }

    static getUser() {
        return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    }

    static setUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    static removeUser() {
        localStorage.removeItem("user");
    }
}
