'use server';

import {cookies} from 'next/headers';

export const setItem = async (key, value) => {
    cookies().set(key, value);
}

export const getItem = async (key) => {
    return cookies().has(key) ? cookies().get(key)?.value : "null"
}


export const removeItem = async (key) => {
    return cookies().delete(key);
}
