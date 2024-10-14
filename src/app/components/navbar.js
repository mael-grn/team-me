"use client";

import {useEffect, useState} from "react";
import styles from "@/app/components/navbar.module.css";
import Link from "next/link";

import Image from "next/image";

import {logout} from "@/app/utils/queryUtils";
import {useRouter} from "next/navigation";
import {recoverUserData, saveUserData, updateUser} from "@/app/controller/userController";
import LordIcon from "@/app/components/lordIcon";

export default function Navbar() {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [showUserData, setShowUserData] = useState(false);
    const [modifyName, setModifyName] = useState(false);
    const [modifySurname, setModifySurname] = useState(false);
    const [modifyEmail, setModifyEmail] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');


    useEffect(() => {
        recoverUserData().then(user => {
            if (!user) return;
            setUser(user);
            setName(user.name);
            setSurname(user.surname);
            setEmail(user.email);
        });

    }, []);

    const modifyNameClick = async () => {
        if (!modifyName) {
            setModifyName(true);
        } else {
            if (name) {
                user.name = name;
                await saveUserData(user);
                await updateUser(user);
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
                await saveUserData(user);
                await updateUser(user);
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
                await saveUserData(user);
                await updateUser(user);
                setModifyEmail(false);
            }
        }
    }

    const logoutBtn = async () => {
        await logout();
        router.push('/');
    }

    return (
        <nav>
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
                                        <p>Prénom :</p>
                                        <input readonly={modifyName ? undefined : "true"} value={name}
                                               onChange={(e) => setName(e.target.value)}
                                               className={modifyName ? styles.modif : undefined}/>
                                        <a onClick={modifyNameClick}>
                                            <LordIcon iconName={modifyName ? "check" : "setting"}
                                                      animationType={"hover"}/>
                                        </a>
                                    </div>
                                    <div>
                                        <p>nom :</p>
                                        <input readonly={modifySurname ? undefined : "true"} value={surname}
                                               onChange={(e) => setSurname(e.target.value)}
                                               className={modifySurname ? styles.modif : undefined}/>
                                        <a onClick={modifySurnameClick}>
                                            <LordIcon iconName={modifySurname ? "check" : "setting"}
                                                      animationType={"hover"}/>

                                        </a>
                                    </div>
                                    <div>
                                        <p>email :</p>
                                        <input readonly={modifyEmail ? undefined : "true"} value={email}
                                               onChange={(e) => setEmail(e.target.value)}
                                               className={modifyEmail ? styles.modif : undefined}/>
                                        <a onClick={modifyEmailClick}>
                                            <LordIcon iconName={modifyEmail ? "check" : "setting"}
                                                      animationType={"hover"}/>

                                        </a>
                                    </div>
                                    <a className={styles.closeBtn}
                                       onClick={() => setShowUserData(false)}>Fermer</a>
                                    <a className={styles.logoutBtn}
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