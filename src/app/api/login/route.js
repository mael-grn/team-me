import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req, res) {
        try {
            // extraction des données de la requête
            if (!req.body) {
                return res.status(400).json({ message: "wrong cookies with the query. expected email and password" });
            }
            const { email, password } = await req.json();

            // Requête SQL pour vérifier les identifiants
            const { rows } = await sql`
                SELECT * FROM teamme_users WHERE email = ${email};
            `;

            // Vérification de l'existence de l'utilisateur
            if (rows.length === 0) {
                return new Response(JSON.stringify({ message: 'user not found' }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                });
            } else {

                const user = rows[0];
                console.log(user.password);
                console.log(password);
                // Comparaison du mot de passe avec le haché en base de données
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    return new Response(JSON.stringify({ message: 'Invalid password' }), {
                        status: 401,
                        headers: { 'Content-Type': 'application/json' },
                    });
                }

                const secretKey = process.env.AUTH_SECRET;
                const token = jwt.sign({ key: user.id }, secretKey, { expiresIn: '1h' });
                return new Response(JSON.stringify({ message: 'user credentials are correct', data: user, token: token }), {
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
