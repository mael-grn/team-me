import ServerResponse, {ErrorTypes} from "@/app/model/ServerResponse";

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
            return new ServerResponse(true, null, null);
        } else if (res.status === 404) {
            return new ServerResponse(false, ErrorTypes.NOUSER, null);
        } else {
            return new ServerResponse(false, ErrorTypes.SERVER, null);
        }

    }
}