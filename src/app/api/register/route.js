import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

export async function POST(req, res) {
    try {
        // Extraction des données de la requête
        if (!req.body) {
            return res.status(400).json({ message: "Invalid request. Expected nom, prenom, email, and password." });
        }

        const { surname, name, email, password } = await req.json();

        // Vérifier si l'utilisateur existe déjà
        const { rows: existingUser } = await sql`
            SELECT * FROM USERS WHERE email = ${email};
        `;

        if (existingUser.length > 0) {
            return new Response(JSON.stringify({ message: 'Email already in use' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertion du nouvel utilisateur dans la base de données
        const { rows: newUser } = await sql`
            INSERT INTO USERS (name, surname, email, password) 
            VALUES (${name}, ${surname}, ${email}, ${hashedPassword})
            RETURNING *;
        `;

        return new Response(JSON.stringify({ message: 'User registered successfully', data: newUser[0] }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ message: `Server error: ${error}`}), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}