import ServerResponse, {ErrorTypes} from "@/app/model/ServerResponse";
import { sql } from '@vercel/postgres';

export default class QueryManager {

    static async Login(email, password) {


            const { rows, fields } =
                await sql`SELECT * FROM USERS WHERE mail = ${email} AND mdp = ${password};`;

            if (rows.length === 0) {
                return new ServerResponse(false, ErrorTypes.NOUSER, null);
            } else {
                return new ServerResponse(true, null, rows[0]);
            }


        /*
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

         */
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