"use client";

import {useEffect, useRef, useState} from "react";
import styles from "@/app/components/navbar.module.css";
import Link from "next/link";
import User from "@/app/model/user";
import {Player} from "@lordicon/react";
import ICON from "../../../public/icons/loader-white.json";
import Image from "next/image";
import modifyIcon from "../../../public/icons/account.json";
import validateIcon from "../../../public/icons/check.json";
import loadingIcon from "../../../public/icons/loader-white.json";
import {logout} from "@/app/utils/queryUtils";
import {useRouter} from "next/navigation";

export default function Navbar() {
    const modifyIcon = require('/public/icons/setting.json');
    const validateIcon = require('/public/icons/check.json');
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [showUserData, setShowUserData] = useState(false);
    const [modifyName, setModifyName] = useState(false);
    const [modifySurname, setModifySurname] = useState(false);
    const [modifyEmail, setModifyEmail] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');

    const nameRef = useRef(null);
    const surNameRef = useRef(null);
    const emailRef = useRef(null);

    useEffect(() => {
        User.recoverData().then(user => {
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
                await user.saveData();
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
                await user.saveData();
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
                await user.saveData();
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
                                        <a onClick={modifyNameClick} onMouseEnter={() => nameRef.current.playFromBeginning()}>
                                            <Player
                                                icon={modifyName ? validateIcon : modifyIcon}
                                                ref={nameRef}
                                            />
                                        </a>
                                    </div>
                                    <div>
                                        <p>nom :</p>
                                        <input readonly={modifySurname ? undefined : "true"} value={surname}
                                               onChange={(e) => setSurname(e.target.value)}
                                               className={modifySurname ? styles.modif : undefined}/>
                                        <a onClick={modifySurnameClick} onMouseEnter={() => surNameRef.current.playFromBeginning()}>
                                            <Player
                                                ref={surNameRef}
                                                icon={modifySurname ? validateIcon : modifyIcon}

                                            />
                                        </a>
                                    </div>
                                    <div>
                                        <p>email :</p>
                                        <input readonly={modifyEmail ? undefined : "true"} value={email}
                                               onChange={(e) => setEmail(e.target.value)}
                                               className={modifyEmail ? styles.modif : undefined}/>
                                        <a onClick={modifyEmailClick} onMouseEnter={() => emailRef.current.playFromBeginning()}>
                                            <Player
                                                ref={emailRef}
                                                icon={modifyEmail ? validateIcon : modifyIcon}
                                            />
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
                    <div className={styles.nav}>
                        <Link href={"/login"}>Connexion</Link>
                    </div>

            }

        </nav>
    )
}