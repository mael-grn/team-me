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

        const decoded = jwt.verify(token, secretKey);

        if (!decoded) {
            return new Response(JSON.stringify({ message: 'wrong token' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const { rows } = await sql`
            SELECT * FROM USERS WHERE email = ${decoded.email};
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
        return new Response(JSON.stringify({message: 'server error'}), {
            status: 500,
            headers: {'Content-Type': 'application/json'},
        });
    }
}