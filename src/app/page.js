'use client';

import Image from "next/image";
import styles from "./page.module.css";
import {useEffect, useState} from "react";
import {useRouter} from 'next/navigation'
import {recoverUserData} from "@/app/controller/userController";
import Link from "next/link";

export default function Home() {
    const router = useRouter()

    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {

        recoverUserData().then((res) => {
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


    return (
        <div>
            <main className={scrolled && styles.scrolled}>
                <p className={styles.appname}>Team Me</p>
                <div className={styles.heroDiv}>
                    <div className={styles.mainHeroDiv}>
                        <div className={styles.heroImageDiv}>
                            <Image
                                src="/assets/running.svg"
                                alt="Hero"
                                width={1000}
                                height={1000}
                            />
                        </div>
                        <div className={styles.heroTextDiv}>
                            <h1>Une nouvelle dimension.</h1>
                            <p>Etes-vous prêt pour embarquer dans une toute nouvelle manière de manager vos équipes
                                sportives
                                ?</p>
                        </div>

                    </div>
                    <div className={styles.buttonsDiv}>
                        <Link href={"/register"} className={"button"}>Commencer</Link>
                        <p>Pour entrer dans une nouvelle dimension, il ne suffit que d’un seul clique.</p>
                    </div>

                </div>

            </main>
        </div>
    );
}
