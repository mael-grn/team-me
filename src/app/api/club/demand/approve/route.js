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

        const { id, token } = await req.json();

        const secretKey = process.env.AUTH_SECRET

        const decoded = jwt.verify(token, secretKey);

        if (!decoded) {
            return new Response(JSON.stringify({ message: 'wrong token' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }


        // Requête SQL pour modifier l'utilisateur
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
                DELETE FROM teamme_club_demand WHERE id = ${id};
            `);

            await sql`
                UPDATE teamme_users SET club = ${user.club} WHERE id = ${id};
            `;
        } catch (error) {
            return new Response(JSON.stringify({ message: `server error: ${error}` }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }


        return new Response(JSON.stringify({ res: true}), {
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
