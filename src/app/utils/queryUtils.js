import ServerResponse, {ErrorTypes} from "@/app/model/serverResponse";
import User from "@/app/model/user";

/**
 * Recover user data from the database.
 * The user will be saved in the cookies.
 * @param email
 * @param password
 * @returns {Promise<ServerResponse>} With data containing the user object
 */
export const login = async (email, password) => {

    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (res.status === 200) {

        const data = await res.json();
        let user = new User(data.data.id, data.data.name, data.data.surname, data.data.date_creat, data.data.email);
        await user.saveData();
        return new ServerResponse(true, null, user);

    } else if (res.status === 404) {
        return new ServerResponse(false, ErrorTypes.NOUSER, null);
    } else {
        return new ServerResponse(false, ErrorTypes.SERVER, null);
    }
}

export const register = async (name, surname, email, password) => {

    const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({surname, name, email, password}),
    });

    if (res.status === 200) {
        return new ServerResponse(true, null, null);
    } else if (res.status === 400) {
        return new ServerResponse(false, ErrorTypes.ALREADYUSER, null);
    } else {
        return new ServerResponse(false, ErrorTypes.SERVER, null);
    }

}