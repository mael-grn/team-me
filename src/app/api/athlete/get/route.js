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

        let athlete  = [{user_id: null, profil_strava: null, record_100m:null, group_id: null}]

        // Requête SQL pour modifier l'utilisateur
        try {
            let usersGroups = [];

            let club = (await sql`
                SELECT * FROM teamme_users WHERE id = ${decoded.key};
            `).rows[0]?.club;



            let members = (await sql`
                SELECT * FROM teamme_users WHERE club = ${club};
            `).rows;

            for (const user of members) {
                let {rows} = (await sql`
                SELECT * FROM teamme_athlete where user_id = ${user.id};
            `);

                if (rows.length > 0) {
                    athlete.push(rows[0]);
                }
            }

        } catch (error) {
            return new Response(JSON.stringify({ message: `server error: ${error}` }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }


        return new Response(JSON.stringify({ res: athlete}), {
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
