"use client";

import { useState } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import StorageManager from "@/app/tools/storageManager";
import QueryManager from "@/app/tools/QueryManager";
import Popup from "@/app/components/popup";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    defineElement(lottie.loadAnimation);
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
                    <button type="submit">
                        {
                            isLoading ?
                            <lord-icon
                                src="https://cdn.lordicon.com/ktsahwvc.json"
                                trigger="loop"
                                state="loop"
                                colors="primary:#ffffff"
                            /> : "Connexion"
                        }
                    </button>
                    <lord-icon src="https://cdn.lordicon.com/ktsahwvc.json"
                               trigger="loop"
                               state="loop-transparency"
                               colors="primary:#ffffff"></lord-icon>
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