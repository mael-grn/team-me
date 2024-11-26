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

        const decoded = await jwt.verify(token, secretKey);

        if (!decoded) {
            return new Response(JSON.stringify({ message: 'wrong token' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        let staff  = [{id: null, role: null}]

        // Requête SQL pour modifier l'utilisateur
        try {
            let club = (await sql`
                SELECT * FROM teamme_users WHERE id = ${decoded.key};
            `).rows[0]?.club;



            let members = (await sql`
                SELECT * FROM teamme_users WHERE club = ${club};
            `).rows;


            for (const user of members) {
                let {rows} = (await sql`
                SELECT * FROM teamme_staff where id = ${user.id};
            `);

                if (rows.length > 0) {
                    staff.push(rows[0]);
                }
            }

        } catch (error) {
            return new Response(JSON.stringify({ message: `server error: ${error}` }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }


        return new Response(JSON.stringify({ res: staff}), {
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
