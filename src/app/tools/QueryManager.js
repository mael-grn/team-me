import ServerResponse, {ErrorTypes} from "@/app/model/ServerResponse";

export default class QueryManager {

    static async query(url, method, body) {
        //const token = StorageManager.getToken() ?? "";
        try{
            const res = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${"token"}`
                },
                body: JSON.stringify(body)
            });
            return await res;
        } catch (e) {
            return {error: true, status: 404};
        }
    }

    static async Login(email, password) {

        const data = await this.query('http://localhost:3001/login', 'POST', { email, password });

        if (data.status !== 200) {
            switch (data.status) {
                case 401:
                    return new ServerResponse(false, ErrorTypes.NOUSER, null);
                case 404:
                    return new ServerResponse(false, ErrorTypes.CONNECTION, null);
                case 500:
                    return new ServerResponse(false, ErrorTypes.SERVER, null);
                default:
                    return new ServerResponse(false, ErrorTypes.DEFAULT, null);

            }
        } else {
            return new ServerResponse(true, null, data);
        }
    }

    static async Register(name, surname, email, password) {

        const data = await this.query('http://localhost:3001/register', 'POST', { name, surname, email, password });

        if (data.status !== 200) {
            switch (data.status) {
                case 401:
                    return new ServerResponse(false, ErrorTypes.ALREADYEXISTS, null);
                case 404:
                    return new ServerResponse(false, ErrorTypes.CONNECTION, null);
                case 500:
                    return new ServerResponse(false, ErrorTypes.SERVER, null);
                default:
                    return new ServerResponse(false, ErrorTypes.DEFAULT, null);

            }
        } else {
            return new ServerResponse(true, null, data);
        }
    }
}