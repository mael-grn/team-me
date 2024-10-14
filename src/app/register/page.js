"use client";

import {useEffect, useState} from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import Popup from "@/app/components/popup";
import {useRouter} from "next/navigation";
import {register} from "@/app/utils/queryUtils";
import {recoverUserData} from "@/app/controller/userController";
import Icon from "@/app/components/icon";


export default function Page() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [surname, setSurName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        recoverUserData().then((res) => {
            if (res) router.push("/dashboard");
        });

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        router.back();
        if (password !== passwordRepeat) {
            setTitle('Erreur')
            setMessage("Les mots de passe ne correspondent pas");
            return;
        }

        setIsLoading(true);
        register(name, surname, email, password).then((res) => {
            setIsLoading(false);
            if (res.success) {
                router.push("/dashboard");
            } else {
                setTitle('Erreur');
                setMessage(res.errorType);
            }
        });

    };

    return (
        <main className={styles.main}>
            {message && message !== "" && <Popup title={title} text={message} close={() => {setMessage(null); setTitle(null)}} />}
            <div className={styles.leftDiv}>
                <h1>Prêt ? Partez !</h1>
                <p>Créez votre compte, et commencez immédatement à utiliser le plein potentiel de Team Me.</p>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formInputDiv}>
                        <label htmlFor="name">Prénom</label>
                        <input
                            type="name"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formInputDiv}>
                        <label htmlFor="surname">Nom</label>
                        <input
                            type="surname"
                            id="surname"
                            name="surname"
                            value={surname}
                            onChange={(e) => setSurName(e.target.value)}
                            required
                        />
                    </div>
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
                    <div className={styles.formInputDiv}>
                        <label htmlFor="password-repeat">Réécrire le mot de passe</label>
                        <input
                            type="password"
                            id="password-repeat"
                            name="password-repeat"
                            value={passwordRepeat}
                            onChange={(e) => setPasswordRepeat(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className={ "button " + (isLoading ? styles.loading : undefined)}>
                        <Icon iconName={"loader-white"} animationType={"loop"}/>
                        <p>Créer mon compte</p>
                    </button>
                </form>
            </div>
            <Image
                src="/assets/begin.svg"
                alt="Hero"
                width={500}
                height={500}
            />
        </main>
    );
}