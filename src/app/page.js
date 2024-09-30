'use client';

import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';
import StorageManager from './tools/storageManager';
import * as motion from "framer-motion/client"
import {useEffect, useState} from "react";

export default function Home() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
  return (
    <div>
        <main className={scrolled && styles.scrolled}>
            <p className={styles.appname}>Team Me</p>
            <div className={styles.heroDiv}>
                <div className={styles.heroLeft}>
                    <h1>Découvrez une nouvelle manière de gérer vos équipes</h1>
                    <p>Etes-vous prêt pour embarquer dans une toute nouvelle manière de manager vos équipes sportives
                        ?</p>
                    <div className={styles.buttonsDiv}>
                        <Link href={"/register"} className={styles.startBtn}>Commencer</Link>
                        <Link href={"/login"} className={styles.loginBtn}>Connexion</Link>
                    </div>
                </div>
                <div className={styles.heroRight}>
                    <Image
                        src="/assets/running2.jpg"
                        alt="Hero"
                        width={3198}
                        height={2304}
                    />
                </div>
            </div>

            <div className={styles.section}>
                    <h1>Une solution pensée et créée pour les sportifs</h1>
                    <p>Team Me est une application permettant aux coach sportifs de gerer leurs équipes, de gagner du
                        temps et d'avoir une meilleure vision d'ensemble.</p>
            </div>

        </main>
    </div>
  );
}
