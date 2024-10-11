"use client";

import {useEffect, useState} from "react";
import styles from "@/app/components/navbar.module.css";
import Link from "next/link";
import User from "@/app/model/user";

export default function Navbar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        User.recoverData().then(user => {
            setUser(user);
        });
    }, []);

    return (
        <nav>
            {
                user ?
                    <div className={styles.nav}>
                        <p>{user.name}</p>
                        <span className={styles.profil}/>
                    </div>
                    :
                    <div className={styles.nav}>
                        <Link href={"/login"}>Connexion</Link>
                    </div>
            }
        </nav>
    )
}