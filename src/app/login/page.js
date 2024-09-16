"use client";

import {useEffect, useState, useRef} from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import StorageManager from "@/app/tools/storageManager";
import QueryManager from "@/app/tools/QueryManager";
import Popup from "@/app/components/popup";
import { Player } from '@lordicon/react';

const ICON = require('/public/icons/loader-white.json');

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const playerRef = useRef(null);

    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.playFromBeginning();
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        QueryManager.Login(email, password).then((res) => {
            setIsLoading(false);
            if (res.success) {
                //StorageManager.setToken(res.data.token);
                //StorageManager.setUser(new User("toto", email));
                //window.location.href = '/dashboard';
                setMessage("SUCCESS");
            } else {
                setMessage(res.errorType);
            }
        });

    };

    return (
        <main className={styles.main}>
            {message && message !== "" && <Popup title="Erreur" text={message} close={() => setMessage(null)} />}
            <div className={styles.leftDiv}>
                <h1>Connexion</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formInputDiv}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formInputDiv}>
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className={isLoading && styles.loading}>
                        <Player
                            ref={playerRef}
                            icon={ ICON }
                            onComplete={() => playerRef.current?.playFromBeginning()}
                        />
                        <p>Connexion</p>
                    </button>
                </form>
            </div>
            <Image
                src="/assets/placeholder.svg"
                alt="Hero"
                width={500}
                height={500}
            />
        </main>
    );
}