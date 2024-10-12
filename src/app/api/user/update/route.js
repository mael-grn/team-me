import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req, res) {
    try {
        // extraction des données de la requête
        if (!req.body) {
            return new Response(JSON.stringify({ message: 'wrong data in the query' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const { entity, token } = await req.json();

        const secretKey = process.env.AUTH_SECRET

        const decoded = jwt.verify(token, secretKey);

        if (!decoded) {
            return new Response(JSON.stringify({ message: 'wrong token' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const { id, name, surname, email } = entity;
        let newUser;

        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA " + `
            UPDATE USERS
            SET name = ${name}, surname = ${surname}, email = ${email}
            WHERE id = ${id};
            `)
        // Requête SQL pour modifier l'utilisateur
        try {
            let newUser = await sql`
            UPDATE USERS
            SET name = ${name}, surname = ${surname}, email = ${email}
            WHERE id = ${id};
            `;
        } catch (error) {
            return new Response(JSON.stringify({ message: `server error: ${error}` }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }


        return new Response(JSON.stringify({ message: 'user updated', newUser: newUser}), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ message: `server error: ${error}`}), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
