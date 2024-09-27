import { sql } from '@vercel/postgres';

export async function POST(req, res) {
        try {
            // extraction des données de la requête
            if (!req.body) {
                return res.status(400).json({ message: "wrong data with the query. expected email and password" });
            }
            const { email, password } = await req.json();

            // Requête SQL pour vérifier les identifiants
            const { rows } = await sql`
                SELECT * FROM USERS WHERE mail = ${email} AND mdp = ${password};
            `;

            // Vérification de l'existence de l'utilisateur
            if (rows.length === 0) {
                return new Response(JSON.stringify({ message: 'user not found' }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                });
            } else {
                return new Response(JSON.stringify({ message: 'user id are correct', data: rows[0] }), {
                    status: 200,
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
