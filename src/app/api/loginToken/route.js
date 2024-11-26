import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req, res) {
    try {
        // extraction des données de la requête
        if (!req.body) {
            return new Response(JSON.stringify({ message: 'wrong cookies with the query. expected token' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const {token} = await req.json();

        const secretKey = process.env.AUTH_SECRET

        let decoded;
        try {
            decoded = jwt.verify(token, secretKey);
        } catch (e) {
            if (e instanceof jwt.TokenExpiredError) {
                return new Response(JSON.stringify({ message: 'token expired' }), {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
        }

        if (!decoded) {
            return new Response(JSON.stringify({ message: 'wrong token' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const { rows } = await sql`
            SELECT * FROM TEAMME_USERS WHERE id = ${decoded.key};
            `;

        if (rows.length === 0) {
            return new Response(JSON.stringify({ message: 'user not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });

        } else if (rows.length > 1) {
            return new Response(JSON.stringify({ message: 'multiple users found' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });

        } else {
            return new Response(JSON.stringify({ message: 'user found', data: rows[0] }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

    } catch (error) {
        return new Response(JSON.stringify({message: 'server error : ' + error}), {
            status: 500,
            headers: {'Content-Type': 'application/json'},
        });
    }
}