"use client";

import {useEffect, useState} from "react";
import styles from "@/app/components/navbar.module.css";
import Link from "next/link";

import Image from "next/image";

import {logout} from "@/app/utils/queryUtils";
import {useRouter} from "next/navigation";
import {recoverUserData, saveUserData, updateUser} from "@/app/controller/userController";
import LordIcon from "@/app/components/lordIcon";
import Popup from "@/app/components/popup";

export default function Navbar() {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [bgClosing, setBgClosing] = useState(false);
    const [showUserData, setShowUserData] = useState(false);
    const [modifyName, setModifyName] = useState(false);
    const [modifySurname, setModifySurname] = useState(false);
    const [modifyEmail, setModifyEmail] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const handleUserUpdate = () => {
            recoverUserData().then(user => {
                if (!user) {
                    setUser(null);
                    setName('');
                    setSurname('');
                    setEmail('');
                } else {
                    setUser(user);
                    setName(user.name);
                    setSurname(user.surname);
                    setEmail(user.email);
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

    const modifyNameClick = async () => {
        if (!modifyName) {
            setModifyName(true);
        } else {
            if (name) {
                user.name = name;
                updateUser(user).then( async (res) => {
                    if (!res?.success) {
                        setTitle("Erreur");
                        setMessage("Une erreur est survenue lors de la modification de votre prénom.");
                    } else {
                        await saveUserData(user);
                    }
                });
                setModifyName(false);
            }
        }
    }

    const modifySurnameClick = async () => {
        if (!modifySurname) {
            setModifySurname(true);
        } else {
            if (surname) {
                user.surname = surname;
                updateUser(user).then( async (res) => {
                    if (!res?.success) {
                        setTitle("Erreur");
                        setMessage("Une erreur est survenue lors de la modification de votre nom.");
                    } else {
                        await saveUserData(user);
                    }
                });
                setModifySurname(false);
            }
        }
    }

    const modifyEmailClick = async () => {
        if (!modifyEmail) {
            setModifyEmail(true);
        } else {
            if (email) {
                user.email = email;
                updateUser(user).then( async (res) => {
                    if (!res?.success) {
                        setTitle("Erreur");
                        setMessage("Une erreur est survenue lors de la modification de votre email.");
                    } else {
                        await saveUserData(user);
                    }
                });
                setModifyEmail(false);
            }
        }
    }

    const logoutBtn = async () => {
        await logout();
        closeShowUserData()
        window.dispatchEvent(new Event('userUpdate'));
        router.push('/');
    }

    const closeShowUserData = () => {
        setBgClosing(true);
        setShowUserData(false);
        setTimeout(() => {
            setBgClosing(false);
        }, 400);

    }

    return (
        <nav>
            <span
                className={`${styles.navBackground} 
                    ${bgClosing ? styles.navBackgroundClosing : ""} 
                    ${showUserData ? styles.navBackgroundVisible : ""}`}/>
            {message && message !== "" && <Popup title={title} text={message} close={() => {
                setMessage(null);
                setTitle(null)
            }}/>}
            {
                user ?
                    <div className={`${styles.nav} ${showUserData ? styles.showUserData : ''}`}
                         onClick={() => {
                             if (!showUserData) setShowUserData(true)
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
                            showUserData ?
                                <div className={styles.userData}>
                                    <div>
                                        <p>Prénom</p>
                                        <input readonly={modifyName ? undefined : "true"} value={name}
                                               onChange={(e) => setName(e.target.value)}
                                               className={modifyName ? styles.modif : undefined}/>
                                        <a onClick={modifyNameClick}>
                                            <LordIcon iconName={modifyName ? "check" : "setting"}
                                                      animationType={"hover"}/>
                                        </a>
                                    </div>
                                    <div>
                                        <p>Nom</p>
                                        <input readonly={modifySurname ? undefined : "true"} value={surname}
                                               onChange={(e) => setSurname(e.target.value)}
                                               className={modifySurname ? styles.modif : undefined}/>
                                        <a onClick={modifySurnameClick}>
                                            <LordIcon iconName={modifySurname ? "check" : "setting"}
                                                      animationType={"hover"}/>

                                        </a>
                                    </div>
                                    <div>
                                        <p>Email</p>
                                        <input readonly={modifyEmail ? undefined : "true"} value={email}
                                               onChange={(e) => setEmail(e.target.value)}
                                               className={modifyEmail ? styles.modif : undefined}/>
                                        <a onClick={modifyEmailClick}>
                                            <LordIcon iconName={modifyEmail ? "check" : "setting"}
                                                      animationType={"hover"}/>

                                        </a>
                                    </div>
                                    <a className={styles.closeBtn + " button"}
                                       onClick={closeShowUserData}>Fermer</a>
                                    <a className={styles.logoutBtn + " button"}
                                       onClick={logoutBtn}>Déconnexion</a>

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