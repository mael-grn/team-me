"use client";

import {useEffect, useState} from "react";
import StorageManager from "@/app/tools/storageManager";
import styles from "@/app/components/navbar.module.css";
import Link from "next/link";

export default function Navbar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log(StorageManager.getUser())
        setUser(StorageManager.getUser());
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