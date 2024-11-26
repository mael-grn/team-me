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

        let groups = [{id: null, name: null, club:null}]

        // Requête SQL pour modifier l'utilisateur
        try {
            let usersGroups = [];
            let res1 = (await sql`
                SELECT * FROM teamme_training_group
                WHERE id_staff = ${decoded.key};
            `);

            let res2 = (await sql`
                SELECT * FROM teamme_athlete
                WHERE id = ${decoded.key};
            `);

            usersGroups = usersGroups.concat(res1.rows.map((row) => row.id_group));
            usersGroups = usersGroups.concat(res2.rows.map((row) => row.group_id));
            for (const groupId of usersGroups) {
                groups.push((await sql`
                    SELECT * FROM teamme_group
                    WHERE id = ${groupId};
                `).rows[0]);
            }

        } catch (error) {
            return new Response(JSON.stringify({ message: `server error: ${error}` }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }


        return new Response(JSON.stringify({ res: groups}), {
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
