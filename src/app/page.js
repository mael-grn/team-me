'use client';

import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';
import * as motion from "framer-motion/client"
import {useEffect, useState} from "react";
import { useRouter } from 'next/navigation'
import {loginToken} from "@/app/utils/queryUtils";
import User from "@/app/model/user";

export default function Home() {
    const router = useRouter()

    const [scrolled, setScrolled] = useState(false);
    const [animateForward, setAnimateForward] = useState(false);
    useEffect(() => {

        User.recoverData().then((res) => {
            if (res) {
                router.push("/dashboard");
            }
        });

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

    const handleLink = (link) => {
        setAnimateForward(true);
        setTimeout(() => {
            router.push(link);
        }, 300);
    }
  return (
    <div className={animateForward && styles.forward}>
        <main className={scrolled && styles.scrolled}>
            <p className={styles.appname}>Team Me</p>
            <div className={styles.heroDiv}>
                <div className={styles.heroLeft}>
                    <h1>Découvrez une toute nouvelle manière de gérer vos équipes</h1>
                    <p>Etes-vous prêt pour embarquer dans une toute nouvelle manière de manager vos équipes sportives
                        ?</p>
                    <div className={styles.buttonsDiv}>
                        <a onClick={() => handleLink("/register")} className={styles.startBtn}>Commencer</a>
                        <a onClick={() => handleLink("/login")} className={styles.loginBtn}>Connexion</a>
                    </div>
                </div>
                <Image
                    src="/assets/running.svg"
                    alt="Hero"
                    width={1000}
                    height={1000}
                />
            </div>

        </main>
    </div>
  );
}
