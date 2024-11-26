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

        const {user_id, role } = entity;

        // Requête SQL pour modifier l'utilisateur
        try {
            let club = (await sql`
                SELECT * FROM teamme_users WHERE id = ${decoded.key};
            `).rows[0]?.club;

            let {rows} = (await sql`SELECT * FROM teamme_users WHERE id = ${user_id} AND club = ${club};`);

            if (rows.length === 0) {
                return new Response(JSON.stringify({ message: `L'utilisateur n'existe pas dans le club.` }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
            await sql`
            INSERT INTO TEAMME_STAFF(user_id, role) values(${user_id}, ${role})
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
