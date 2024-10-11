'use server';

import {cookies} from 'next/headers';

export const setItem = async (key, value) => {
    cookies().set(key, value);
}

export const setSecuredItem = async (key, value) => {
    cookies().set(key, value);
}

export const getItem = async (key) => {
    return new Promise((resolve, reject) => {
        const cookie = cookies().get(key);
        if (cookie) {
            resolve(cookie.value);
        } else {
            reject(new Error('Cookie not found'));
        }
    });
}

export const getSecuredItem = async (key) => {
    return new Promise((resolve, reject) => {
        const cookie = cookies().get(key);
        if (cookie) {
            resolve(cookie.value);
        } else {
            reject(new Error('Cookie not found'));
        }
    });
}

export const removeItem = async (key) => {
    return cookies().delete(key);
}
