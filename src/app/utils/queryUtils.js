import ServerResponse, {ErrorTypes} from "@/app/model/serverResponse";
import User from "@/app/model/user";
import {getItem, removeItem, setItem} from "@/app/utils/cookiesUtils";
import {deleteUserData, saveUserData} from "@/app/controller/userController";

/**
 * Delete the token and the user data from the cookies
 * @returns {Promise<void>}
 */
export const logout = async () => {
    await removeItem('teamme-token');
    await deleteUserData();
}

/**
 * Send a request to the server to authenticate the user with the email and password
 * @param email
 * @param password
 * @returns {Promise<ServerResponse>}
 */
export const login = async (email, password) => {
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
    });

    if (res.status === 200) {

        const data = await res.json();
        let user = new User(data.data.id, data.data.name, data.data.surname, data.data.date_creat, data.data.email);
        await saveUserData(user);
        await setItem('teamme-token', data.token);
        return new ServerResponse(true, null, user);

    } else if (res.status === 404 || res.status === 401) {
        return new ServerResponse(false, ErrorTypes.NOUSER, null);
    } else {
        return new ServerResponse(false, ErrorTypes.SERVER, null);
    }
}

/**
 * Utilise le token stocké dans les cookies pour vérifier si l'utilisateur est authentifié
 * si l'utilisateur est authentifié, les données de l'utilisateur sont récupérées et stockées dans les cookies
 * sinon, les cookies sont supprimés
 * @returns {Promise<ServerResponse>}
 */
export const loginToken = async () => {

    let token;
    try {
        token = await getItem('teamme-token');
    } catch (e) {
        return new ServerResponse(false, ErrorTypes.NOUSER, null);
    }

    const res = await fetch('/api/loginToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({token}),
    });

    if (res.status === 200) {
        console.log("check success");
        const data = await res.json();
        await saveUserData(data.data);
        return new ServerResponse(true, null, data.data);
    } else if (res.status === 404) {
        return new ServerResponse(false, ErrorTypes.NOUSER, null);
    } else if (res.status === 401) {
        await logout();
        return new ServerResponse(false, ErrorTypes.WRONGTOKEN, null);
    } else {
        return new ServerResponse(false, ErrorTypes.SERVER, null);
    }
}

/**
 * Send a request to the server to register a new user with the name, surname, email and password into the database
 * @returns {Promise<ServerResponse>}
 */
export const register = async (name, surname, email, password) => {

    const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({surname, name, email, password}),
    });

    if (res.status === 200) {
        const data = await res.json();
        let user = new User(data.user.id, data.user.name, data.user.surname, data.user.email);
        await saveUserData(user);
        await setItem('teamme-token', data.token);
        return new ServerResponse(true, null, null);
    } else if (res.status === 400) {
        return new ServerResponse(false, ErrorTypes.ALREADYUSER, null);
    } else {
        return new ServerResponse(false, ErrorTypes.SERVER, null);
    }
}

/**
 * Send a request to the server to insert an entity into the database
 * @param tableName the name of the table in the database
 * @param entity the entity to insert
 * @returns {Promise<ServerResponse>}
 */
export const insertEntity = async (tableName, entity) => {

    let token;
    try {
        token = await getItem('teamme-token');
    } catch (e) {
        return new ServerResponse(false, ErrorTypes.NOUSER, null);
    }

    const res = await fetch(`/api/${tableName}/insert`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({entity, token}),
    });

    if (res.status === 200) {
        return new ServerResponse(true, null, null);
    } else if (res.status === 401) {
        return new ServerResponse(false, ErrorTypes.UNAUTHORIZED, null);
    } else {
        return new ServerResponse(false, ErrorTypes.SERVER, null);
    }
}

/**
 * Send a request to the server to get all the entities in database the user has access to
 * @param tableName the name of the table in the database
 * @returns {Promise<ServerResponse>}
 */
export const getAllEntity = async (tableName) => {

    let token;
    try {
        token = await getItem('teamme-token');
    } catch (e) {
        return new ServerResponse(false, ErrorTypes.NOUSER, null);
    }

    const res = await fetch(`/api/${tableName}/get`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({token}),
    });

    if (res.status === 200) {
        const data = await res.json();
        return new ServerResponse(true, null, data.res);
    } else if (res.status === 401) {
        return new ServerResponse(false, ErrorTypes.UNAUTHORIZED, null);
    } else {
        return new ServerResponse(false, ErrorTypes.SERVER, null);
    }
}

/**
 * Send a request to the server to update an entity in the database
 * @param tableName the name of the table in the database
 * @param entity the entity to update
 * @returns {Promise<ServerResponse>}
 */
export const updateEntity = async (tableName, entity) => {

    let token;
    try {
        token = await getItem('teamme-token');
    } catch (e) {
        return new ServerResponse(false, ErrorTypes.NOUSER, null);
    }

    const res = await fetch(`/api/${tableName}/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({entity, token}),
    });

    if (res.status === 200) {
        const data = await res.json();
        return new ServerResponse(true, null, data.res);
    } else if (res.status === 401) {
        return new ServerResponse(false, ErrorTypes.UNAUTHORIZED, null);
    } else {
        return new ServerResponse(false, ErrorTypes.SERVER, null);
    }
}

/**
 * Send a request to the server to delete an entity in the database
 * @param tableName the name of the table in the database
 * @param entity the entity to delete
 * @returns {Promise<ServerResponse>}
 */
export const deleteEntity = async (tableName, entity) => {

    let token;
    try {
        token = await getItem('teamme-token');
    } catch (e) {
        return new ServerResponse(false, ErrorTypes.NOUSER, null);
    }

    const res = await fetch(`/api/${tableName}/delete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({entity, token}),
    });

    if (res.status === 200) {
        return new ServerResponse(true, null, null);
    } else if (res.status === 401) {
        return new ServerResponse(false, ErrorTypes.UNAUTHORIZED, null);
    } else if (res.status === 400) {
        const data = await res.json();
        if (data.code === '23503') {
            return new ServerResponse(false, ErrorTypes.FOREIGNKEY, data.deps);
        }

    } else {
        return new ServerResponse(false, ErrorTypes.SERVER, null);
    }
}


export const getUserFromClub = async () => {

    let token;
    try {
        token = await getItem('teamme-token');
    } catch (e) {
        return new ServerResponse(false, ErrorTypes.NOUSER, null);
    }

    const res = await fetch(`/api/club/getUsers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token}),
    });

    if (res.status === 200) {
        const data = await res.json();
        return new ServerResponse(true, null, data.res);
    } else if (res.status === 401) {
        return new ServerResponse(false, ErrorTypes.UNAUTHORIZED, null);
    } else {
        return new ServerResponse(false, ErrorTypes.SERVER, null);
    }
}

export const approveDemand = async (id) => {

    let token;
    try {
        token = await getItem('teamme-token');
    } catch (e) {
        return new ServerResponse(false, ErrorTypes.NOUSER, null);
    }

    const res = await fetch(`/api/club/demand/approve`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id, token}),
    });

    if (res.status === 200) {
        return new ServerResponse(true, null, true);
    } else if (res.status === 401) {
        return new ServerResponse(false, ErrorTypes.UNAUTHORIZED, null);
    } else {
        return new ServerResponse(false, ErrorTypes.SERVER, null);
    }
}