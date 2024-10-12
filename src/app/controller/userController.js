import {getItem, removeItem, setItem} from "@/app/utils/cookiesUtils";
import User from "@/app/model/user";
import {deleteEntity, updateEntity} from "@/app/utils/queryUtils";

/**
 * Format the name of the user to capitalize the first letter of the name and surname
 * @param name the name to format
 * @returns {string}
 */
export const formatUserName =(name) => {
    return  name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

/**
 * Save the user data in a secured cookie on the server
 * @returns {Promise<void>}
 */
export const saveUserData = async (user) => {
    await setItem('user', JSON.stringify(user));
}

/**
 * Recover the user data from the secured cookie on the server
 * return null if the cookie is not found
 * @returns {Promise<User>}
 */
export const recoverUserData = async () => {
    let user;
    try {
        user = JSON.parse(await getItem('user'));
    } catch (e) {
        return null;
    }
    return new User(user.id, user.name, user.surname, user.date_creat, user.email);
}

/**
 * Delete the user data from the secured cookie on the server
 */
export const deleteUserData = async () => {
    await removeItem('user');
}

/**
 * Update the user data in the database
 * @param user
 * @returns {Promise<void>}
 */
export const updateUser = async (user) => {
    let res = await updateEntity('user', user);
}

/**
 * Delete the user data in the database
 * @param user
 * @returns {Promise<void>}
 */
export const deleteUser = async (user) => {
    let res = await deleteEntity ('user', user);
}