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

        const { token } = await req.json();


        const secretKey = process.env.AUTH_SECRET

        const decoded = jwt.verify(token, secretKey);

        if (!decoded) {
            return new Response(JSON.stringify({ message: 'wrong token' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        //pour avoir le schema de la table
        let users = [{id: null, name: null, surname: null}]

        try {
            let user = (await sql`
                SELECT * FROM teamme_users WHERE id = ${decoded.key};
            `).rows[0];

            if (user.club_admin === 0) {
                return new Response(JSON.stringify({ message: `Vous n'êtes pas administrateur du club.` }), {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' },
                });
            }

            let {rows} = (await sql`
                SELECT id FROM teamme_club_demand where club = ${user.club};
            `);

            for (const id of rows) {
                let {rows} = (await sql`
                    SELECT id, name, surname FROM teamme_users where id = ${id.id};
                `);
                users.push(rows[0])
            }

        } catch (error) {
            return new Response(JSON.stringify({ message: `server error: ${error}` }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }


        return new Response(JSON.stringify({ res: users}), {
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
