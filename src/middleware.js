import { NextResponse } from 'next/server';
import {cookies} from 'next/headers';

/**
 * Protection du routing :
 * si l'utilisateur n'est pas authentifié (vérification du token avec l'api),
 * alors il est directement redirigé vers la page de connexion.
 * @param req
 * @returns {NextResponse<unknown>}
 */
export async function middleware(req) {
    let validToken;
    const token = cookies().get("token")?.value;

    if (token) {
        const res = await fetch(`${req.nextUrl.origin}/api/loginToken`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token}),
        })

        validToken = res.status === 200;
    }

    if (!validToken) {
        // Redirection si l'utilisateur n'est pas authentifié
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Si l'utilisateur est authentifié, laisser la requête passer
    return NextResponse.next();
}

/**
 * Pages protégées par le middleware
 * @type {{matcher: string[]}}
 */
export const config = {
    matcher: ['/dashboard/:path*'], // Pages protégées
};