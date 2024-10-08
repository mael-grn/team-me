import ServerResponse, {ErrorTypes} from "@/app/model/ServerResponse";
import StorageManager from "@/app/tools/storageManager";
import User from "@/app/model/User";

export default class QueryManager {

    static async Login(email, password) {

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (res.status === 200) {
            const data = await res.json();
            let user = new User(data.data.id, data.data.name, data.data.surname, data.data.created_at, data.data.email);
            StorageManager.setUser(user);
            return new ServerResponse(true, null, null);
        } else if (res.status === 404) {
            return new ServerResponse(false, ErrorTypes.NOUSER, null);
        } else {
            return new ServerResponse(false, ErrorTypes.SERVER, null);
        }
    }

    static async Register(name, surname, email, password) {

        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ surname, name, email, password }),
        });

        if (res.status === 200) {
            return new ServerResponse(true, null, null);
        } else if (res.status === 400) {
            return new ServerResponse(false, ErrorTypes.ALREADYUSER, null);
        } else {
            return new ServerResponse(false, ErrorTypes.SERVER, null);
        }

    }
}