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
                SELECT * FROM teamme_users where club = ${user.club};
            `);

            return new Response(JSON.stringify({ res: rows.map((userItem) => ({
                    name: userItem.name,
                    surname: userItem.surname,
                    id: userItem.id
                }))
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });

        } catch (error) {
            return new Response(JSON.stringify({ message: `server error: ${error}` }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }




    } catch (error) {
        return new Response(JSON.stringify({ message: `server error: ${error}`}), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
