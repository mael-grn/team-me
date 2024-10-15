"use client";

import {useEffect, useState} from "react";
import styles from "@/app/components/navbar.module.css";
import Link from "next/link";

import Image from "next/image";

import {logout} from "@/app/utils/queryUtils";
import {useRouter} from "next/navigation";
import {authenticateUser, recoverUserData} from "@/app/controller/userController";

export default function Navbar() {
    const router = useRouter();

    const [user, setUser] = useState(null);

    const [bgClosing, setBgClosing] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    useEffect( () => {
        const handleUserUpdate = async () => {
            authenticateUser().then((res) => {
                if (res) {
                    recoverUserData().then(user => {
                        if (!user) {
                            setUser(null);
                        } else {
                            setUser(user);
                        }
                    });
                }
            });
        };

        handleUserUpdate();

        // Écoute l'événement personnalisé
        window.addEventListener('userUpdate', handleUserUpdate);

        // Nettoyer l'écouteur lors du démontage du composant
        return () => {
            window.removeEventListener('userUpdate', handleUserUpdate);
        };
    }, []);



    const logoutBtn = async () => {
        await logout();
        closeShowUserData()
        window.dispatchEvent(new Event('userUpdate'));
        router.push('/');
    }

    const closeShowUserData = () => {
        setBgClosing(true);
        setShowInfo(false);
        setTimeout(() => {
            setBgClosing(false);
        }, 400);

    }

    return (
        <nav>
            <span
                className={`${styles.navBackground} 
                    ${bgClosing ? styles.navBackgroundClosing : ""} 
                    ${showInfo ? styles.navBackgroundVisible : ""}`}/>
            {
                user ?
                    <div className={`${styles.nav} ${showInfo ? styles.showInfo : ''}`}
                         onClick={() => {
                             if (!showInfo) setShowInfo(true)
                         }}>

                        <div className={styles.resume}>
                            <p>{user.name}</p>
                            <Image
                                alt={"profile image"}
                                src="/icons/user.png"
                                width={1000}
                                height={1000}
                            />
                        </div>
                        {
                            showInfo ?
                                <div className={styles.menuContent}>
                                    <Link className={styles.logoutBtn + " buttonLight"}
                                          href={"/dashboard/settings/"} onClick={() => setShowInfo(false)}>Paramètres</Link>
                                    <Link className={styles.logoutBtn + " buttonLight"}
                                       href={"/dashboard"} onClick={() => setShowInfo(false)}>DashBoard</Link>
                                    <a className={styles.logoutBtn + " buttonLight"}
                                       onClick={logoutBtn}>Déconnexion</a>

                                    <a className={styles.closeBtn + " button"}
                                       onClick={closeShowUserData}>Fermer</a>
                                </div>
                                : undefined
                        }

                    </div>
                    :
                    <Link href={"/login"} className={"button " + styles.connection}>Connexion</Link>

            }

        </nav>
    )
}